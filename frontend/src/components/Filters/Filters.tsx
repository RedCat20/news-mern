import React, {ChangeEvent, FC, useEffect, useRef, useState} from 'react';

import styles from './Filters.module.scss';
import {basePath} from "../../paths";

interface Props {
    onChangeCheckboxCallback: (filters: string[]) => void;
}

const Filter:FC<Props> = ({onChangeCheckboxCallback}) => {

    const [filterOptions, setFilterOptions] = useState<string[]>([]);

    const selectedFilterOptions = useRef<string[]>([]);

    const getCategories = async () => {
        let res = await fetch(`${basePath}/categories`);
        let data = await res.json();
        setFilterOptions(data);
    }

    useEffect(() => {
        getCategories();
    },[]);

    const onChangeFilterHandler = (e: ChangeEvent<HTMLInputElement>) => {

        const value = e.target.value;
        const array = selectedFilterOptions.current;

        if (e.target.checked) {
            if (!array.includes(value.toString()))
                array.push(e.target.value.toString());
        }
        else if (!e.target.checked) {
            const index = array.indexOf(value.toString());
            if (index > -1) {
                array.splice(index, 1);
            }
        }

        selectedFilterOptions.current = array;

        onChangeCheckboxCallback(array);
    }

    useEffect(() => {
       // if (allRef.current)
       //    allRef.current.checked = true;
    },[]);

    return (
        <div className={styles.filterWrapper}>

            <h3>Filters</h3>

            <hr/>

            {/*<h5>General</h5>*/}
            {/*<label className={styles.filter} key={'all'}>*/}
            {/*    <input ref={allRef} type="checkbox" value={'all'} onChange={onChangeFilterHandler}/>*/}
            {/*    All categories*/}
            {/*</label>*/}

            {/*<div className={styles.info}>*/}
            {/*    All items from all categories, not only from popular categories*/}
            {/*</div>*/}

            {/*<hr/>*/}

            <h5>Popular categories</h5>

            {filterOptions?.map((item, idx) => {
                return (
                    <label className={styles.filter} key={idx}>
                        <input type="checkbox" value={item} onChange={onChangeFilterHandler}/>
                        <span>{item}</span>
                    </label>
                )
            })}

        </div>
    );
};

export default Filter;