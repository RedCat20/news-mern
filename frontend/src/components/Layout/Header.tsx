import React, {FC, useEffect, useState} from 'react';
import styles from "./Header.module.scss";
import {Link, Navigate} from "react-router-dom";
import logo from "../../assets/img/logo.svg";
import useWindowSize from "../../hooks/useResizeHook";
import {fetchUserProfileData, isAuthUser, logoutUser} from "../../redux/slices/authSlice";
import {useAppDispatch, useAppSelector} from "../../hooks/storeHooks";

const Header:FC = () => {
    const dispatch = useAppDispatch();

    const size = useWindowSize();

    const isAuth = useAppSelector(isAuthUser);

    const [isAuthAdmin, setIsAuth] = useState(false);

    useEffect(() => {
        if (localStorage.getItem('token')) {
            setIsAuth(true);
            dispatch(fetchUserProfileData());
        }
    },[isAuth]);

    const logOutHandler = () => {
        dispatch(logoutUser());
        localStorage.removeItem('token')
    }

    return (
        <header className={styles.header}>
            <Link to="/" className={styles.link}>Posts</Link>
            <div className={styles.title}>
                {size.width > 767 && <img className={styles.logo} src={logo} alt="Logo"/>}
                {size.width > 575 &&  <span>News</span>}
            </div>
            <div className={styles.links}>
                {!isAuthAdmin && <Link to="/auth" className={styles.link}>Auth</Link>}
                {isAuthAdmin &&
                  <>
                    <Link to="/add" className={styles.link}>Add post</Link>
                    <Link to="/auth" className={`${styles.link} ${styles.userLink}`} onClick={logOutHandler}>
                      Log out
                    </Link>
                  </>}
            </div>
        </header>
    );
};

export default Header;