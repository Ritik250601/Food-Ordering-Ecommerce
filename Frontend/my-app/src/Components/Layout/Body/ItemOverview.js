import React,{useState,useContext, useRef} from 'react';
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBCardImage, MDBRipple, MDBContainer } from 'mdb-react-ui-kit';
import classes from './ItemOverview.module.css'
import Input from "../../UI/Input";
import { useLocation, useNavigate } from 'react-router-dom';
import CartContext from '../../../Store/Cart-context';


function ItemOverview() {
  const cartCtx = useContext(CartContext);
  let {state} = useLocation();
  const navigate = useNavigate();


  const [amountIsValid, setAmountIsValid] =useState(true);

  const amountInputRef = useRef();
  
  const submitHandler = (event) => {
    event.preventDefault();
    const enteredAmount = amountInputRef.current.value;
    const enteredAmountNumber = +enteredAmount;

    if (
      enteredAmount.trim().length === 0 ||
      enteredAmountNumber < 1
      
    ) {
      setAmountIsValid(false)
      return;
    }
    const cartItem = {item:state, quantity:enteredAmountNumber};    
    cartCtx.addItem(cartItem);
    navigate("/cart");

  };


  return (
    <MDBContainer >

    <MDBCard  style={{display:'flex',flexDirection:'row', alignContent: 'space-between', marginTop:'5rem', maxWidth:'80rem'}}>
    <MDBRipple rippleColor='light' rippleTag='div' className='bg-image hover-overlay'>
        <MDBCardImage src={`https://spring-boot-food-ordering-app.herokuapp.com/admin/images/${state.image}`} fluid alt='...' />
        {/* <MDBCardImage src={`http://localhost:8080/admin/images/${state.image}`} fluid alt='...'   style={{maxWidth:'15rem'}}/> */}

        
          <div className='mask' style={{ backgroundColor: 'rgba(251, 251, 251, 0.15)' }}></div>
      </MDBRipple>
      <MDBCardBody>
        <MDBCardTitle>{state.name}</MDBCardTitle>
        <MDBCardText>
         {state.description}
        </MDBCardText>
        <MDBCardText>
         Price: {state.discountedPrice} $
        </MDBCardText>
        <form className={classes.form} onSubmit={submitHandler}>
      <Input
      ref={amountInputRef}
      label="Quantity"
      input={{
        id:state.id,
        type: "number",
        min: "1",
        step: "1",
        defaultValue: "1",
      }}
      />
      <button className={classes.button} type='submit'>+ Add</button>
      {!amountIsValid && <p>Please enter a valid amount(above1).</p>}
    </form>
      </MDBCardBody>
    </MDBCard>

   
    </MDBContainer>
  );
}



export default ItemOverview;