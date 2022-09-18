import React, { useState } from 'react'
import AuthPage from './Pages/AuthPage';
import HomePage from './Pages/HomePage'
import ItemOverviewPage from './Pages/ItemOverviewPage';
import CartPage from './Pages/CartPage';
import CheckoutPage from './Pages/UserAddressDetailsPage';
import { useEffect } from 'react';

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import PaymentMethodPage from './Pages/PaymentMethodPage';
import OrderDetails from './Components/Cart/OrderDetails/OrderDetails';
import OrderDetailsPage from './Pages/OrderDetailsPage';


const App = (props) => {

const [chekJwtExpiration, setCheckJwtExpiration] = useState(false);


const token = localStorage.getItem("token");


    // fetch('http://localhost:8080/public/check-jwt-expiration/',{
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //     Authorization: `Bearer ${token}`,
    //   },
    //   body:JSON.stringify({
    //     token:token
    //   })
    // }).then(Response => Response.json())
    // .then(data => console.log("this is ",data))
    // .catch(error => console.log(error))
  

   


useEffect(() => {

  if(token){


  
  
  // fetch("http://localhost:8080/public/check-jwt-expiration", {
  fetch("https://spring-boot-food-ordering-app.herokuapp.com/public/check-jwt-expiration", {

    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      token:token
    }),
  })
    .then(response => 
      response.json()
    
    
  )
    .then((data) => {
         setCheckJwtExpiration(data);
    })
    .catch((error) => {
      console.log(error)
    });

  }

if(chekJwtExpiration){
  localStorage.removeItem("token")
  localStorage.setItem("isJwtExpire", "true");
}



 
}, [token, chekJwtExpiration])


   
  return (
    <Router>
      <Routes>
      <Route path="/" element={<HomePage/>} />
      <Route path="/home" element={<HomePage/>} />
      <Route path="/login" element={<AuthPage page="Login"/>} />
      <Route path='/signup' element={<AuthPage page="SignUp"/>} />
      <Route path='/item-overview' element={<ItemOverviewPage />} />
      <Route path='/cart' element={<CartPage/>} />
      <Route path='/user-address' element = {<CheckoutPage/>}/>
      <Route path='/payment-method' element = {!chekJwtExpiration && <PaymentMethodPage/>}     />
      <Route path="/order-details" element={<OrderDetailsPage/>} />
      </Routes>
    </Router>
  )
}

export default App
