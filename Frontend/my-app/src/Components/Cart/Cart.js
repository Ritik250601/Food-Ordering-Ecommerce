import React, { useContext, useEffect, useState } from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
  MDBRipple,
  MDBContainer,
  MDBCardHeader,
  MDBCardLink,
} from "mdb-react-ui-kit";
import CartContext from "../../Store/Cart-context";
import classes from "./Cart.module.css";
import CartIcon from "./CartIcon";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../../Store/auth-context";

function Cart(props) {

  // useNavigate() hook
  let navigate = useNavigate();

  //  cart and auth context
  const cartCtx = useContext(CartContext);
  const authContext = useContext(AuthContext)
  const [items, setItems] = useState(cartCtx.items);
  const cartItemInfo = cartCtx.cartItemInfo




  useEffect(() => {
  // check either a user is logged in or not
  if(!authContext.isLoggedIn){

    console.log("user is ananoymous")
    navigate('/home', {state:{setMessage:true, msg:"First You Have to login to see items in cart"}})
   }

    setItems(cartCtx.items);
  }, [cartCtx.items, authContext.isLoggedIn, navigate]);

  //idetifing cart is empty or not
  let cartIsEmpty = true;
  if (items.length > 0) {
    cartIsEmpty = false;
  }
  const checkoutHandler = (event) => {
    event.preventDefault();
    navigate("/user-address");
  };
 
  function cartItemRemoveHandler(event) {
    event.preventDefault();
    // window.location.reload();
    const id = event.target.value;
    cartCtx.removeItem(id);
    setItems(cartCtx.items);
  }


  //css variables
 

  const cartItems = items.map((item) => (
    <MDBCard
      key={item.item.id}
      className="align-self-start"
      style={{ maxWidth: "60rem", maxHeight:"30rem" }}
    >
      <MDBRipple
        rippleColor="light"
        rippleTag="div"
        className="bg-image hover-overlay"
      >
        <MDBCardImage
          src={`https://spring-boot-food-ordering-app.herokuapp.com/admin/images/${item.item.image}`}
          // src={`http://localhost:8080/admin/images/${item.item.image}`}


          fluid
          alt="..."
          style={{maxWidth:'20rem'}}
        />

        <div
          className="mask"
          style={{ backgroundColor: "rgba(251, 251, 251, 0.15)" }}
        ></div>
      </MDBRipple>
      <MDBCardBody>
        <MDBCardTitle>{item.item.name} </MDBCardTitle>
        <MDBCardText>{item.item.shortDescription}</MDBCardText>
        <MDBCardText>Price :{item.item.discountedPrice}$</MDBCardText>
        <MDBCardText>Quantity :{item.quantity}</MDBCardText>
        <button
          className={classes.button}
          onClick={cartItemRemoveHandler}
          value={item.item.id}
        >
          Remove
        </button>
      </MDBCardBody>
    </MDBCard>
  ));

  return (
    <MDBContainer style={{ maxWidth: "60rem", marginTop: "80px"}}>
      <div
      //  style = {mediaStyle}
       className={classes.cart_subtotal}
   

       
      >
        <div className="container" style={{ Width: "40rem !important"}} >
          <MDBCardTitle
            className="mb-5 align-self-center"
            style={{ color: "black" }}
          >
            {cartIsEmpty ? (
              <span className={classes.icon}> 
                Your Cart is Empty
                <CartIcon/>
              </span>
            ) : (
              <span>Your Cart</span>
            )}
          </MDBCardTitle>
          {cartItems}
           
        </div>
        {!cartIsEmpty && (
          <div>
          <MDBCard style={{ maxWidth: "40rem", maxHeight: "30vh" }}>
            <MDBCardHeader>Cart Total</MDBCardHeader>
            <MDBCardBody>
              <MDBCardTitle>
                Subtotal ({cartItemInfo.quantity})items :
                {cartItemInfo.total_price} ₹
              </MDBCardTitle>
              <MDBCardText>
                Your order is eligible for FREE Delivery. Select this option at
                checkout. Details
              </MDBCardText>
              <button className={classes.button} onClick={checkoutHandler}>
                Proceed to Buy
              </button>
            </MDBCardBody>
          </MDBCard>
          <MDBCard className="my-5">
            <MDBCardBody>
              <MDBCardTitle>Track Your Order Details</MDBCardTitle>
              <MDBCardLink  onClick={() => {navigate("/order-details")}}>track</MDBCardLink>
            </MDBCardBody>
            </MDBCard> 
          </div>
        )}
        {cartIsEmpty && (
          <Link to="/">
            {" "}
            <button className={classes.button}>Add</button>
          </Link>
        )}
      </div>
    </MDBContainer>
  );
}

export default Cart;
