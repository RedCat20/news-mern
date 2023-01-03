import {FC, MouseEvent, useState} from 'react';
import {useParams, useSearchParams} from 'react-router-dom';

import styles from "./Search.module.scss";
import ButtonPrimary from "../FormItems/ButtonPrimary/ButtonPrimary";
import TextInput from "../FormItems/TextInput/TextInput";

interface Props {
    setSearchStrCallback: (value: string) => void;
}

const Search:FC<Props> = ({setSearchStrCallback}) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [searchStr, setSearchStr] = useState('');

    const onChange = (query: string) => {
        setSearchStr(query);
        //setSearchParams({search: query});
    }

    const onClick = (e: MouseEvent<HTMLButtonElement>) => {
        setSearchStrCallback(searchStr);
    }

    return (
        <div className={styles.container}>
            <TextInput placeholder="Enter some string..." onChange={onChange}/>
            <ButtonPrimary onClickHandler={onClick}>Search</ButtonPrimary>
        </div>
    );
};

export default Search;