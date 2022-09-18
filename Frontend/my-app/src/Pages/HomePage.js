import React, { useState } from 'react'
import Content from '../Components/Layout/Body/Content'
import Footer from '../Components/Layout/Footer/Footer'
import Navbar from '../Components/Layout/Navbar/Navbar'
import {Navigate, useLocation } from 'react-router-dom'
import swal from 'sweetalert';

const HomePage = () => {

const {state} = useLocation();
console.log(state)

if(state){
    swal({
        title: `${state.msg}`,
        text: "login required!",
        icon: "error",
        button:"OK",
        dangerMode: true
      }) 
}  



    return (
        <>
            <Navbar/>     
            <Content/>
            <Footer/>
        </>
    )
}

export default HomePage;
