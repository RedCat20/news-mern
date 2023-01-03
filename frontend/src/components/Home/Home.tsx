import React, {FC, useEffect, useState} from 'react';
import {Navigate, useSearchParams} from "react-router-dom";
import {useGetPostsQuery} from "../../redux/api/postsApi";

import Search from "../Search/Search";
import ArticlesList from "../ArticlesList/ArticlesList";
import Layout from "../Layout/Layout";
import {IArticle} from "../../interfaces/article.interfaces";

import styles from './Home.module.scss';
import Filter from "../Filters/Filters";
import axiosInstanse from "../../helpers/axios.helper";
import {AxiosResponse} from "axios";
import Configs from "./Configs/Configs";

const LIMIT = 3;

interface Props {
    isAuth: boolean;
}

const Home:FC<Props> = ({isAuth}) => {
    // const postsData = useGetPostsQuery('');
    // const [searchParams, setSearchParams] = useSearchParams();

    const [data, setData] = useState<IArticle[]>([]);
    const [totalCount, setTotalCount] = useState<number>(0);
    const [isLoading, setIsLoading] = useState(true);

    const [filterOptions, setFilterOptions] = useState<string>('');
    const [searchStr, setSearchStr] = useState('');
    const [sort, setSort] = useState<'desc' | 'asc' | string>('desc')

    const [pages, setPages] = useState<number>(1);
    const [currentPage, setCurrentPage] = useState(0);

    const getData = async () => {
        try {
            const result: AxiosResponse = await axiosInstanse.get(
                `http://localhost:4000/posts` +
                `?page=${currentPage + 1}` +
                `&limit=${LIMIT}` +
                `&sort=pubDate,${sort}` +
                 // `&filter=all` +
                `&filter=${filterOptions || ''}` +
                `&search=${searchStr}`,
                {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem('token')
                    }
                });

            const info = result.data;

            setData(info.posts);

            setTotalCount(info.total);

            setPages((Math.ceil((info.total) / LIMIT)) || 1);

        } catch(err) {
            console.log('Can not get data', err);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        setIsLoading(true);
        // setSearch(searchParams.get('search') ?? '');
        getData().then(() => setCurrentPage(0));
    },[sort, searchStr, filterOptions]);

    useEffect(() => {
        setIsLoading(true);
        // setSearch(searchParams.get('search') ?? '');
        getData();
    },[currentPage]);

    useEffect(() => {
        setCurrentPage(0);
    }, [searchStr]);

    const onChangeCheckbox = (filters: string[] | string | any) => {
        if (!filters?.length) {
            filters = ['all'].toString();
        } else {
            filters = filters.toString()
        }

        setFilterOptions(filters);
    }

    return (
        <Layout>
            <h1> Posts list </h1>

            <Search setSearchStrCallback={setSearchStr}/>

            <div className={styles.total}>There {totalCount} posts in the base</div>

            <Configs setSort={setSort} filters={filterOptions}/>

            {!data?.length && isLoading && <>
              <h3>Loading...</h3>
            </>}

            <div className={styles.content}>
                {data && <ArticlesList data={data}/>}

                <Filter onChangeCheckboxCallback={onChangeCheckbox}/>
            </div>

            <div className={styles.pagination}>
              {new Array(pages).fill(undefined).map((item, idx) => {
                  return <div className={`${styles.page} ${currentPage === idx ? styles.active : ''}`}
                              key={idx}
                              onClick={ (e) => setCurrentPage(idx) }>
                      {idx + 1}
                  </div>
              })}
            </div>
        </Layout>
    );
};

export default Home;