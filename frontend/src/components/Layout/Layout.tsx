import React, {FC, ReactNode, useEffect, useState} from 'react';
import logo from '../../assets/img/logo.svg';
import styles from "./Layout.module.scss";
import {Link, Route, Routes} from "react-router-dom";
import Header from "./Header";

interface Props {
    children?: ReactNode;
}

const Layout:FC<Props> = ({children}) => {

    return (
        <>
            <div className={styles.container}>
                <Header/>
                <main className={styles.main}>
                    {children}
                </main>
            </div>

        </>
    );
}

export default Layout;
