import React, {useEffect, useState} from 'react';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Home from "./components/Home/Home";
import ArticleEditor from "./components/ArticleEditor/ArticleEditor";
import Auth from "./components/Auth/Auth";
import {useAppDispatch, useAppSelector} from "./hooks/storeHooks";
import {isAuthUser, userData} from "./redux/slices/authSlice";
//import {fetchUserProfileData, isAuthUser, userData} from "./redux/slices/authSlice";

const App = () =>  {

    const [isLoaded, setIsLoaded] = useState(false);

    const dispatch = useAppDispatch();
    const data = useAppSelector(userData);
    const isAuth = useAppSelector(isAuthUser);

    useEffect(() => {
        //dispatch(fetchUserProfileData());
    },[dispatch]);

    useEffect(() => {
        setIsLoaded(true);
    }, [isAuth]);

    return (
    <>
        {!isLoaded && <div>Loading...</div>}
        {isLoaded &&
            <Router>
                <Routes>
                    <Route path="/" element={<Home isAuth={isAuth}/>}></Route>
                    <Route path="/posts" element={<Home isAuth={isAuth}/>}></Route>
                    <Route path="/auth" element={<Auth/>}></Route>
                    <Route path="/add/:id" element={<ArticleEditor/>}></Route>
                    <Route path="/add" element={<ArticleEditor/>}></Route>
                </Routes>
            </Router>
        }
    </>
  );
}

export default App;
