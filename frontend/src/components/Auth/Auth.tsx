import React, {ErrorInfo, useState} from 'react';
import Layout from "../Layout/Layout";
import styles from "./Auth.module.scss";
import '../../assets/styles.scss'
import ButtonPrimary from "../FormItems/ButtonPrimary/ButtonPrimary";
import axiosInstanse, {basePath} from "../../helpers/axios.helper";
import {Navigate, useNavigate} from "react-router-dom";

// import {fetchUserData, isAuthUser} from "../../redux/slices/authSlice";

const Auth = () => {

    const navigator = useNavigate();

    const [errorText, setErrorText] = useState<string | null>(null);
    const [userData, setData] = useState<{username: string, password: string}>({
        username: '',
        password: ''
    })

    const fetchUserData = async (userData: any) => {
        // console.log('userData', userData)

        try {

            const login = userData.username;
            const password = userData.password;

            const {data} = await axiosInstanse.post(`${basePath}/auth`, {login, password});

            // console.log('auth user data: ', data);

            localStorage.setItem('token', data.token);

            navigator('/posts');
        }
        catch(err: any) {
            console.log(err);
            setErrorText(err.message);
            setData({
                username: '',
                password: ''
            });
        }
    }


    const updateData = (e: any) => {
        setData({
            ...userData,
            [e.target.name]: e.target.value
        })
    }

    const submit = (e: any) => {
        e.preventDefault()
        fetchUserData(userData);
        // console.log(userData)
    }


    //if ((localStorage.getItem('token')) && isAuth) {

    if ((localStorage.getItem('token'))) {
        return <Navigate to="/posts"/>
    }

    return (
        <Layout>

            <div className={styles.container}>
                <h1 style={{marginLeft: 'auto', marginRight: 'auto', width: 'fit-content', paddingLeft: '30px', paddingRight: '30px', textAlign: 'center', marginBottom: '60px', color: 'cornflowerblue', borderBottom: '1px solid cornflowerblue', paddingBottom: '10px'}}>Auth</h1>


            <form className={styles.form} method="post" onSubmit={submit}>

                    <div className={styles.item}>
                        <label>
                            <div className={styles.labelText}>
                                Username:
                            </div>
                            <input value={userData.username} onChange={updateData} name="username" type="text" className="input"/>
                        </label>
                    </div>

                    <div className={styles.item}>
                        <label>
                            <div className={styles.labelText}>
                                Password:
                            </div>
                            <input value={userData.password} onChange={updateData} name="password" type="password" className="input"/>
                        </label>
                    </div>

                    <ButtonPrimary>Log in</ButtonPrimary>

                    {errorText &&
                        <div className={styles.error}>
                            {errorText}
                        </div>
                    }

                </form>

            </div>

        </Layout>
    );
};

export default Auth;