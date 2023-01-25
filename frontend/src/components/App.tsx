import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/storeHooks";
import { fetchUserProfileData, isAuthUser } from "../redux/slices/authSlice";
import Home from "./Home/Home";
import ArticleEditor from "./ArticleEditor/ArticleEditor";
import Auth from "./Auth/Auth";


const App = () =>  {

    const dispatch = useAppDispatch();
    const isAuth = useAppSelector(isAuthUser);

    useEffect(() => {
        dispatch(fetchUserProfileData());
    },[dispatch]);

    return (
        <>
            <Router>
                <Routes>
                    <Route path="/" element={isAuth ? <Home isAuth={isAuth}/> : <Auth/>} />
                    <Route path="/posts" element={<Home isAuth={isAuth}/>}></Route>
                    <Route path="/auth" element={<Auth/>}></Route>
                    <Route path="/add/:id" element={<ArticleEditor/>}></Route>
                    <Route path="/add" element={<ArticleEditor/>}></Route>
                </Routes>
            </Router>
        </>
  );
}

export default App;
