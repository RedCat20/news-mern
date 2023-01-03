import {FC, memo, useEffect, useState} from 'react';
import Article from "../Article/Article";
import {IArticle} from "../../interfaces/article.interfaces";

import styles from './ArticlesList.module.scss';
import {useAppDispatch, useAppSelector} from "../../hooks/storeHooks";
import {fetchUserProfileData, isAuthUser} from "../../redux/slices/authSlice";

interface Props {
    data: IArticle[];
}

const ArticlesList:FC<Props> = ({data}) => {
    const [isAuthAdmin, setIsAuth] = useState(false);

    const dispatch = useAppDispatch();
    const isAuth = useAppSelector(isAuthUser)

    useEffect(() => {
        if (localStorage.getItem('token') && isAuth) {
            setIsAuth(true);
            dispatch(fetchUserProfileData());
        }
    },[isAuth]);

    return (
        <div className={styles.list}>
            {Array.isArray(data) && data.map((article: IArticle, idx: number) => <Article isAuth={isAuthAdmin} article={article} key={idx}/>)}
        </div>
    );
};

export default memo(ArticlesList);