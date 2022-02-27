
import './App.css';
import {LessonTable} from './pages/timetable';
import {News} from './pages/News';
import {Materials} from "./pages/Materials";
import {Notes} from "./pages/Notes";
import {Layout} from "./components/Layout";
import {ErrorPage} from "./pages/ErrorPage";
import {Auth} from "./pages/Auth";
import {RegistrationPage} from "./pages/RegistrationPage";
import {Routes, Route, Link} from "react-router-dom";
import React, {useState,useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {auth} from "./actions/login/login";
import {MainWindow} from "./pages/MainWindow";
import {ListUsers} from "./pages/ListUsers";

function App() {

    const isAuth = useSelector(state => state.user.isAuth);

    const dispatch = useDispatch();
    useEffect(()=>{
        if(localStorage.getItem('token')){
            dispatch(auth());
        }

    }, [])

    const isAdmin = useSelector(state => state.user.currentUser.role) === "admin";

  return (
    <div className="App">

        <Routes>
            <Route path={"/"} element={<Layout />}>
                <Route index element={<MainWindow/>}/>
                {isAuth && <Route path='/news' element={<News/>}/>}
                {isAuth &&      <Route path='/lessons' element={<LessonTable/>}/>}
                {isAuth &&     <Route path='/materials' element={<Materials/>}/>}
                {isAuth &&     <Route path='/notes' element={<Notes/>}/>}
                {isAdmin &&     <Route path='/listUsers' element={<ListUsers/>}/>}
                <Route path='/login' element={<Auth />}/>
                <Route path='/registration' element={<RegistrationPage />}/>
                <Route path='*' element={ErrorPage(404)}/>
            </Route>
        </Routes>
    </div>
  );
}

export default App;
