import React, {FC, useCallback, useEffect, useMemo, useState} from 'react';
import {useSearchParams} from "react-router-dom";
import {useGetPostsQuery} from "../../redux/api/postsApi";

import Search from "../Search/Search";
import ArticlesList from "../ArticlesList/ArticlesList";
import Layout from "../Layout/Layout";
import {IArticle} from "../../interfaces/article.interfaces";

import styles from './Home.module.scss';
import Filters from "../Filters/Filters";
import Configs from "./Configs/Configs";
import {useUrlSearchParams} from "../../hooks/useUrlSearchParams";

const LIMIT = 3;

interface Props {
    isAuth: boolean;
}

const Home:FC<Props> = ({isAuth}) => {

    const [params, getParam] = useUrlSearchParams();

    const [searchParams, setSearchParams] = useSearchParams();

    const [data, setData] = useState<IArticle[]>([]);
    const [totalCount, setTotalCount] = useState<number>(0);
    const [isLoading, setIsLoading] = useState(true);

    const [filterQueryStr, setFilterQueryStr] = useState<string>('');

    const [searchStr, setSearchStr] = useState('');
    const [sort, setSort] = useState<'desc' | 'asc' | string>('desc')

    const [pages, setPages] = useState<number>(1);
    const [currentPage, setCurrentPage] = useState(0);

    // @ts-ignore
    const postsData = useGetPostsQuery({currentPage, LIMIT, sort, filterQueryStr, searchStr});

    const setSortHandler = (value: string) => {
        let filter = searchParams.get('filter') ?? '';
        let search = searchParams.get('search') ?? '';
        setSearchParams({filter: filter, search: search, sort: value});
        setSort(value);
    }

    const seAllNews = useCallback(() => {
        const info = postsData.data;
        if (!info) return;
        console.log('info', info)
        setData(info.posts);
        setTotalCount(info.total);
        setPages((Math.ceil((info.total) / LIMIT)) || 1);
        setIsLoading(true);
    },[postsData, searchParams]);

    useEffect(() => {
        if (params)
            setCurrentPage(0);
    }, [params])

    useEffect(() => {
        if (postsData?.status === 'fulfilled' && params) {
            seAllNews();
        }
    },[postsData, searchParams]);

   useEffect(() => {
       setCurrentPage(0);

       setSearchStr(searchParams.get('search') ?? '');

       //const filters = searchParams.get('filter')?.split('&').join(', ');

       const filters = searchParams.get('filter')?.split(',').join(',');

       console.log('This', filters)
       setFilterQueryStr(filters || '');

   }, [searchParams])

    return (
        <Layout>
            <h1> Posts list </h1>

            <Search />

            <div className={styles.total}>There {totalCount} posts in the base</div>

            <div className={styles.configPosts}>

                <div className={styles.itemWrapper}>
                    <span>1) Search in <b>titles</b></span>
                </div>

                <div className={styles.itemWrapper}>

                    <Configs setSort={setSortHandler}/>

                </div>

                <div className={styles.itemWrapper}>
                    <span>3) Chosen filters: <b>{filterQueryStr?.length ? filterQueryStr : 'all'}</b></span>
                </div>

            </div>

            {!data && isLoading && <>
              <h3>Loading...</h3>
            </>}
            {data && isLoading && <>
              <h3 style={{fontWeight: 'normal'}}>No posts with these options</h3>
            </>}

            <div className={styles.content}>
                {data && <ArticlesList data={data}/>}

                {/*<Filters onChangeCheckboxCallback={onChangeCheckbox}/>*/}
                <Filters filterQueryStr={filterQueryStr} />
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