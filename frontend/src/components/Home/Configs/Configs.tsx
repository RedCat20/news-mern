import React, {ChangeEvent, FC} from 'react';
import styles from "./Configs.module.scss";

interface Props {
    setSort: (value: string) => void;
    filters?: string[] | string;
}

const Configs:FC<Props> = ({setSort, filters}) => {

    const changeSortHandler = (event: ChangeEvent<HTMLSelectElement>) => {
        setSort(event.target.value);
    }

    return (
        <div className={styles.configPosts}>

            <div className={styles.itemWrapper}>
                <span>1) Search in <b>titles</b></span>
            </div>

            <div className={styles.itemWrapper}>
                <span>2) Sort by <b>public date</b>:</span>

                <select className={styles.select} onChange={changeSortHandler}>
                    <option value={'desc'}>desc</option>
                    <option value={'asc'}>asc</option>
                </select>
            </div>

            <div className={styles.itemWrapper}>
                <span>3) Chosen filters: <b>{filters?.length ? filters : 'all'}</b></span>
            </div>

        </div>
    );
};

export default Configs;