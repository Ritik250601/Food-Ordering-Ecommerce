import React,{useState, useContext} from 'react';
import {
  MDBInput,
  MDBCol,
  MDBRow,
  MDBCheckbox,
  MDBBtn,
  MDBIcon,
  MDBContainer
} from 'mdb-react-ui-kit';
import AuthContext from '../../Store/auth-context';
import { Link, useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import Swal from 'sweetalert2';
import classes from './auth.module.css';




function Login(props) {
    // Style
    const myStyle = {
        marginTop:'10rem',
        maxWidth:"50rem",
        border:"0.5px solid #aa2727"
    }

// Context API
const authCtx = useContext(AuthContext);

// useState Hook 
const [emailInput, setEmailInput] = useState('');
const [passwordInput, setPsswordInput] = useState('');

const navigate = useNavigate();


//sweet alert function
//sweet alert function
const showAlert = (title, text, icon) => {
  swal({
    title: title,
    text: text,
    icon: icon,
    button:"OK",
    dangerMode: true
  });
}


  
// email and password change handler
  const emailChangeHandler = (event) => {
      setEmailInput(event.target.value);
  };

  const passwordChangeHandler = (event) => {
      setPsswordInput(event.target.value);
  }




  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 4000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })
// form submit handler
  const submitHandler = (event) => {
      event.preventDefault();
      const enteredEmail = emailInput;
      const enteredPassword = passwordInput;
      

      if(enteredEmail.trim().length === 0 && enteredPassword.trim().length === 0){
     showAlert("Login failed", "email and password is required", "error");
     return;
      } 

      else if(enteredEmail.trim().length === 0){
        showAlert("Login failed!", "email is required", "error");
        return;
      }
     
      else if(enteredEmail.trim().length === 0 ){
        showAlert("Login faile!", "password is required", "error");
        return;
      }
      
      else{
      fetch('https://spring-boot-food-ordering-app.herokuapp.com/public/token', {
      // fetch('http://localhost:8080/public/token', {

          method:'POST',
          headers:{'Content-Type':'application/json'},
          body:JSON.stringify({
              userName:enteredEmail,
              password:enteredPassword
          })
        }).then(data => data.json())
          .then(data => {
            console.log(data)
            if(data.token){
              authCtx.login(data.token)
              Toast.fire({
                icon: 'success',
                title: 'Login Successful'
              })
              navigate('/home')
            }
            else{
              showAlert("Login failed", "Invalid Credentials", "error");
            }
      
          }).catch(error => console.log(error))
      
        }
  }
  
  


  return (
      <MDBContainer className=" d-flex align-items-center justify-content-center" style={myStyle}>
      


    <form onSubmit={submitHandler}>
      <MDBInput className='mb-4' type='text' id='form2Example1' label='email' value={emailInput} onChange={emailChangeHandler}/>
      <MDBInput className='mb-4' type='password' id='form2Example2' label='Password' value={passwordInput} onChange={passwordChangeHandler}/>

      <MDBRow className='mb-4'>
        <MDBCol className='d-flex justify-content-center'>
          <MDBCheckbox id='form2Example3' label='Remember me' defaultChecked />
        </MDBCol>
        <MDBCol>
        <Link to='#!'>Forgot password?</Link>
        </MDBCol>
      </MDBRow>

      <button type='submit' className={classes.button} block >
       Sign In
      </button>

      <div className='text-center'>
        <p>
          Not a member? <button type='button' style={{color:'blue', border:'none'}} onClick={ () => {navigate('/signup')}}>Register</button>
        </p>
       
        <p >or sign up with:</p>
        {authCtx.isLoggedIn && <p>yes you logged in</p>}

        <MDBBtn floating className='mx-1' style={{background:"#aa2727"}}>
          <MDBIcon fab icon='facebook-f' />
        </MDBBtn>

        <MDBBtn floating className='mx-1' style={{background:"#aa2727"}}>
          <MDBIcon fab icon='google' />
        </MDBBtn>

        <MDBBtn floating className='mx-1' style={{background:"#aa2727"}}>
          <MDBIcon fab icon='twitter' />
        </MDBBtn>

        <MDBBtn floating className='mx-1' style={{background:"#aa2727"}}>
          <MDBIcon fab icon='github' />
        </MDBBtn>
      </div>

     
    </form>
    </MDBContainer>
  );
}



export default Login;