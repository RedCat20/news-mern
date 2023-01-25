import {FC, useEffect, useState} from 'react';
import {useSearchParams} from 'react-router-dom';
import styles from "./Search.module.scss";
import TextInput from "../FormItems/TextInput/TextInput";
import {useDebounce} from "../../hooks/useDebounce";

interface Props { }

const Search:FC<Props> = () => {
    const [searchStr, setSearchStr] = useState('');
    const [searchParams, setSearchParams] = useSearchParams();

    const searchNews = useDebounce(async(value: any) => {
        let filter = searchParams.get('filter') ?? '';
        let sort = searchParams.get('sort') ?? '';
        setSearchParams({filter: filter, search: value, sort: sort});
    }, 400);

    const onChange = async (query: string) => {
        setSearchStr(query);
        searchNews(query);
    };

    useEffect(() => {
        setSearchStr(searchParams.get('search') ?? '');
    }, [searchParams])

    return (
        <div className={styles.container}>
            <TextInput placeholder="Enter some string..." value={searchStr} onChange={onChange}/>
        </div>
    );
};

export default Search;