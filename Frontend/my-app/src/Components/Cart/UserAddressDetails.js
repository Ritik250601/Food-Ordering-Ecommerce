import React, { useContext, useRef, useState } from "react";
import CartContext from "../../Store/Cart-context";
import { MDBContainer, MDBCardTitle } from "mdb-react-ui-kit";
import classes from "./UserAddressDetails.module.css";
import { useNavigate } from "react-router-dom";

const UserAddressDetails = () => {
  //useState() hook form managing state
 
  //for valiation form
  const [formValidation, setFormValidation] = useState({
    city: "",
    street: "",
    landmark: "",
    pincode: "",
    formErrors: { city: "", street: "", landmark: "", pincode: "" },
    cityValid: false,
    streetValid: false,
    landMarkValid: false,
    pincodeValid: false,
    formValid: false,
  });

  //useNavigate() hook for navigating to other component
  const navigate = useNavigate();

  // Cart info
  const cartCtx = useContext(CartContext);
  const checkoutItems = cartCtx.items;

  //useRef() hook for storing user input value by ref
  const inputCityRef = useRef();
  const inputStreetRef = useRef();
  const inputLandmarkRef = useRef();
  const inputPincodeRef = useRef();

  //checkout handler method
  const checkoutHandler = (event) => {
    event.preventDefault();

    event.preventDefault();
    const city = inputCityRef.current.value;
    const street = inputStreetRef.current.value;
    const landmark = inputLandmarkRef.current.value;
    console.log(landmark)
    const pincode = inputPincodeRef.current.value;

    //collecting cart items data for sending to backend
    //here we will send a order item id and their user selected quantity nothing else need to send bcz every data is present in backend
    const cartItemsArr = [];

    for (let i in checkoutItems) {
      let item = {
        id: checkoutItems[i].item.id,
        quantity: checkoutItems[i].quantity,
      };
      cartItemsArr.push(item);
    }
    // fields validation
    let error = { ...formValidation };

    //city validaiton
    if (!city.trim()) {
      error.city = "city is required";
     setFormValidation(error);
    } else {
      error.city = "";
      error.cityValid = true;
    }

    //street validation
    if(!street.trim()){
      error.street = "street is required";
    }
    else{
      error.street = "";
      error.streetValid = true;
    }


    // landmark validation
    if(!landmark.trim()){
      error.landmark = "landmark is required"
    }
    else{
      error.landmark = "";
      error.landMarkValid = true;
    }

    //pincode validation
    if(!pincode.trim()){
      error.pincode = "Pincode is required"
    }
    else{
      error.pincode = "";
      error.pincodeValid = true;
    }

   if(error.cityValid & error.pincodeValid & error.streetValid & error.landMarkValid){
    error.formValid = true;
   }


   // checking if overall form is valid then only fetch this api
   if(error.formValid){

    const userAddressDetails  = {
      city:city, 
      street:street, 
      landmark:landmark, 
      pincode:pincode, 
      checkoutItems:cartItemsArr
    }

    //navigating to method method page with user address details
    navigate("/payment-method", {state:userAddressDetails})




  //   fetch("http://localhost:8080/private/orders", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: `Bearer ${token}`,
  //     },
  //     body: JSON.stringify({
  //       city: city,
  //       street: street,
  //       landMark: landmark,
  //       pincode: pincode,
  //       checkoutItems: cartItemsArr,
  //     }),
  //   })
  //     .then((response) => {
  //       //here shortcircuting is being done i.e if(response.ok === true) then setSuccessMessage(true)
  //       response.ok && setSuccessMessage(true);
  //       console.log("this is inside first fetch then block");
  //       console.log(response);
  //       return response.json();
  //     })

  //     .then((data) => {
  //       orderId = data.orderId;
  //       navigate("/payment-method", { state: orderId });
  //       //  fetching the create_order api for sending the orderId  details
  //     })
  //     .catch((error) => console.log(error));
  }
  };

  // form validaton

  return (
    <>
      <MDBCardTitle style={{ textAlign: "center", marginTop: "2rem" }}>
        Fill the details to Order
      </MDBCardTitle>
      <MDBContainer
        className="border d-flex align-items-center justify-content-center"
        style={{ marginTop: "10rem", maxWidth: "50rem" }}
      >

        <form>
          <div className={classes.form}>
            <div className={classes.control}>

            <label htmlFor="form1Example1">Enter Your City</label>
            <input
              type="text"
              id="form1Example1"
              ref={inputCityRef}
            />
            {formValidation.city && (
              <p className={classes.error_para}>{formValidation.city}</p>
            )}

            <label htmlFor="form4Example4">Enter Your Street</label>
            <input
              type="text"
              id="form4Example4"
              ref={inputStreetRef}
            />
            {formValidation.street && (<p className={classes.error_para}>{formValidation.street}</p>)}

            <label htmlFor="form2Example2">Enter Your Land Mark</label>
            <input
              type="text"
              id="form2Example2"
              ref={inputLandmarkRef}
              />
              {formValidation.landmark && (<p className={classes.error_para}>{formValidation.landmark}</p>)}

            <label htmlFor="form3Example3">Enter Your Pincode</label>
            <input
              type="text"
              id="form3Example3"
              ref={inputPincodeRef}
              />
              {formValidation.pincode && (<p className={classes.error_para}>{formValidation.pincode}</p>)}
          </div>
              </div>
        </form>
      </MDBContainer>

      <button
        className={classes.button}
        onClick={checkoutHandler}
        type="submit"
      >
        Order Submit
      </button>
    </>
  );
};

export default UserAddressDetails;
