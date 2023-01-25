import React, {ChangeEvent, FC, useEffect, useLayoutEffect, useState} from 'react';
import styles from "./Configs.module.scss";
import {useSearchParams} from "react-router-dom";

const sortOptions = [
    { value: 'desc', label: 'desc' },
    { value: 'asc', label: 'asc' },
];

interface ISortOptions {
    value: string;
    label: string;
    ['string']?: any;
}

interface Props {
    setSort: (value: string) => void;
}

const Configs:FC<Props> = ({setSort}) => {
    const [searchParams, setSearchParams] = useSearchParams();

    const [sortStr, setSortStr] = useState<string>('')

    const changeSortHandler = (event: ChangeEvent<HTMLSelectElement>) => {
        setSort(event.target.value);
    }

    useEffect(() => {
        console.log('sotr:' ,searchParams.get('sort'))
        const sort = searchParams.get('sort') ?? 'desc';
        setSortStr(sort);
    },[searchParams]);

    useLayoutEffect(() => {

    },[]);

    return (
        <>
            <span>2) Sort by <b>public date</b>:</span>

            <select value={sortStr} className={styles.select} onChange={changeSortHandler}>
                <option value={'desc'}>desc</option>
                <option value={'asc'}>asc</option>
            </select>
        </>
    );
};

export default Configs;