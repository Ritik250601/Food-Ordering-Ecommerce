import React from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBCardText,
  MDBContainer,
  MDBCardTitle,
  MDBCardImage
} from "mdb-react-ui-kit";
import classes from "./PaymentPage.module.css";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import cashOnDeliveryIcon from '../../Assets/cashOnDeliveryIcon.jpg'
import gpayIcon from '../../Assets/gpay.jpg'

const PaymentMethod = (state) => {
  //useState() for managing method state
  const [paymentMethod, setPaymentMethod] = useState("noMethod");

  //token
  const token = localStorage.getItem("token");

  //useLocation() hook for acessing data papsswd from previous usenavigate() component
  const location = useLocation();

  //fetching userAddressDetails
  const userAddressDetails = location.state;

  //load script method
  //loadScript function
  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  // input change handler
  const onChangeHandler = (event) => {
    setPaymentMethod(event.target.value);
  };

  const fetchOrdersApi = (
    city = userAddressDetails.city,
    street = userAddressDetails.street,
    landmark = userAddressDetails.landmark,
    pincode = userAddressDetails.pincode,
    cartItemsArr = userAddressDetails.checkoutItems
  ) => {
    fetch("https://spring-boot-food-ordering-app.herokuapp.com/private/orders", {
    // fetch("http://localhost:8080/private/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        city: city,
        street: street,
        landMark: landmark,
        pincode: pincode,
        checkoutItems: cartItemsArr,
        status:"confirm"
      }),
    })
      .then((response) => {
        //here shortcircuting is being done i.e if(response.ok === true) then setSuccessMessage(true)
        // response.ok && setSuccessMessage(true);
        return response.json();
      })

      .then((data) => {
        let orderId = data.orderId;
        // navigate("/payment-method", { state: orderId });
        fetchRazorPayApi(orderId);
        //  fetching the create_order api for sending the orderId  details
      })
      .catch((error) => console.log(error));
  };

  //razor pay api calling function
  const fetchRazorPayApi = (orderId) => {
    console.log(paymentMethod);
    if (paymentMethod === "method2") {
      // fetch("http://localhost:8080/create_order",{
      fetch("https://spring-boot-food-ordering-app.herokuapp.com/create_order",{
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            id: orderId,
          }),
        }
      )
        .then((response) => {
          //here shortcircuting is being done i.e if(response.ok === true) then setSuccessMessage(true)
          console.log(response);
          return response.json();
        })

        .then((data) => {
          if (data.status === "created") {
            let options = {
              key: "rzp_test_RNhfW5h0zqfqkF",
              amount: data.amount,
              currrency: "INR",
              name: "Food Ordering App Payments",
              description: "food order price",
              image:
                "https://react-spring-boot-app.web.app/static/media/logo.243965904bca5e2cfbbe.jpeg",
              order_id: data.id,
              handler: function (response) {
                console.log(response.razorpay_payment_id);
                console.log(response.razorpay_order_id);
                console.log(response.razorpay_signature);
                console.log("success..................!!");
                alert("your payment is done");
              },
            };

            const paymentObject = new window.Razorpay(options);
            paymentObject.open();
          }

          console.log(data);
        })
        .catch((error) => console.log(error));
    }
  };


  const submitHandler = () => {
    fetchOrdersApi();
  };

  // useEffect() hook for calling razorpay payment window
  useEffect(() => {
    loadScript("https://checkout.razorpay.com/v1/checkout.js");
  });

  return (
    <MDBContainer style={{ marginTop: "8rem" }}>
      <MDBCard style={{ width: "50rem" }}>
        <MDBCardTitle>Select Payment Method</MDBCardTitle>
        <MDBCardBody>
          <MDBCardText onChange={onChangeHandler}>
            <input
              type="radio"
              name="paymentmethod"
              id="paymentMethod1"
              value="method1"
            />{" "}
                       

            pay on deleivery
            <MDBCardImage src={`${cashOnDeliveryIcon}`} style={{maxWidth:"10rem", marginLeft:'20px'}}/>
         
            <br></br>
            <br></br>
            <input
              type="radio"
              name="paymentmethod"
              id="paymentMethod2"
              value="method2"
            />
            Google pay, UPI, Phone Pay etc...
            <MDBCardImage src={`${gpayIcon}`} style={{maxWidth:"10rem",marginLeft:'20px'}}/>

          </MDBCardText>
        </MDBCardBody>
      </MDBCard>

      <MDBCard style={{ width: "25rem", marginTop: "2rem" }}>
        <MDBCardBody>you can review this order before it's final</MDBCardBody>
        <button className={classes.button} onClick={submitHandler}>
          Continue
        </button>
      </MDBCard>
    </MDBContainer>
  );
};

export default PaymentMethod;
