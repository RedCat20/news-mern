import {MouseEvent, ChangeEvent, FC, useCallback, useEffect, useRef, useState} from 'react';
import {useSearchParams} from 'react-router-dom';
import styles from './Filters.module.scss';
import {basePath} from "../../paths";
import ButtonPrimary from "../FormItems/ButtonPrimary/ButtonPrimary";

interface IFilterItem {
    title: string;
    isChecked: boolean;
}

interface Props {
    filterQueryStr: string;
   // onChangeCheckboxCallback: (filters: string[]) => void;
}

const Filters:FC<Props> = ({filterQueryStr}) => {

    const [searchParams, setSearchParams] = useSearchParams();

    const [categories, setCategories] = useState<string[]>([]);

    const [filterOptionsWithCheckboxes, setFilterOptionsWithCheckboxes] = useState<IFilterItem[]>([]);

    const [selectedFilterOptions, setSelectedFilterOptions] = useState<string[]>([]);

    const getCategories = useCallback(async () => {
        let res = await fetch(`${basePath}/categories`);
        let data = await res.json();
        setCategories(data);
    },[]);

    useEffect(() => {
        let newItems: IFilterItem[] = [];

        if (selectedFilterOptions?.length === 0) {
            newItems = categories.map((item: string) => ({ title: item, isChecked: false }) );
            setFilterOptionsWithCheckboxes( newItems );
        } else if (selectedFilterOptions?.length > 0) {
            newItems = categories.map((item: string) => {
                return { title: item, isChecked: (selectedFilterOptions.indexOf(item) > -1) };
            });
            setFilterOptionsWithCheckboxes( newItems );
        }
    }, [categories, selectedFilterOptions]);

    useEffect(() => {
        getCategories().then(r => r);
    },[]);

    const onChangeFilterHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        let array = [...selectedFilterOptions];

        if (e.target.checked) {
            if (!array.includes(value.toString())) {
                array.push(e.target.value.toString());
            }
        }
        else if (!e.target.checked) {
            const index = array.indexOf(value.toString());
            if (index > -1) {
                array.splice(index, 1);
            }
        }

        setSelectedFilterOptions(array);
    }

    const setFiltersHandler = (e: MouseEvent<HTMLButtonElement>) => {
        let params = selectedFilterOptions.join(', ');
        let search = searchParams.get('search') ?? '';
        setSearchParams({search: search, filter: params })
    }

    const resetFiltersHandler = (e: MouseEvent<HTMLButtonElement>) => {
        setSelectedFilterOptions([]);
        let search = searchParams.get('search') ?? '';
        setSearchParams({search: search, filter: '' })
    }

    return (
        <div className={styles.filterWrapper}>

            <h3>Filters</h3>

            <hr/>

            <ButtonPrimary
                width={220}
                onClickHandler={setFiltersHandler}
            >
                Set filters
            </ButtonPrimary>

            <br/> <br/>

            <ButtonPrimary
                width={220}
                onClickHandler={resetFiltersHandler}
            >
                Reset filters
            </ButtonPrimary>

            <h5>Popular categories</h5>

            {filterOptionsWithCheckboxes?.map((item, idx) => {
                return (
                    <label className={styles.filter} key={idx}>
                        <input type="checkbox" checked={item.isChecked} value={item.title} onChange={onChangeFilterHandler}/>
                        <span>{item.title}</span>
                    </label>
                )
            })}

        </div>
    );
};

export default Filters;