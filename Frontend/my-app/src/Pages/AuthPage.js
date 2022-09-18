import React, { useState } from 'react'
import Navbar from '../Components/Layout/Navbar/Navbar';
import Login from '../Components/Auth/Login';
import SignUp from '../Components/Auth/SignUp';

const AuthPage = (props) => {
    const page = props.page;

    return (
        <>
        <Navbar/>
        {(page === "Login") && <Login/>}
        {(page === "SignUp") && <SignUp/>}
        </>
    )
}

export default AuthPage;
