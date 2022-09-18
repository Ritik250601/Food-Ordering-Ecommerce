import React, { useState, useContext} from 'react';
import AuthContext from '../../../Store/auth-context';
import Logo from '../../../Assets/logo.jpeg'
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarToggler,
  MDBIcon,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBBtn,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
  MDBDropdownLink,
  MDBCollapse,

} from 'mdb-react-ui-kit';
import {
  Link
} from "react-router-dom";
import HeaderCartButton from './HeaderCartButton';


 function Navbar() {
  const authCtx = useContext(AuthContext);

  const [showBasic, setShowBasic] = useState(false);

  const style = {backgroundColor: "#4d1601",
    border: "1px solid #aa2727",
  }

const logoutHandler = () =>{
  localStorage.removeItem("token");
  window.location.reload(false);



}

  

  return (

    <MDBNavbar expand='lg'  dark style={{ backgroundColor: "rgb(170, 39, 39)"}}>
      <MDBContainer fluid>
        <MDBNavbarBrand >
        <img
              src={Logo}
              height='50'
              width='50'
              alt=''
              loading='lazy'
              style={{borderRadius:"10px"}}
            />
        </MDBNavbarBrand>

        <MDBNavbarToggler
          aria-controls='navbarSupportedContent'
          aria-expanded='false'
          aria-label='Toggle navigation'
          onClick={() => setShowBasic(!showBasic)}
        >
          <MDBIcon icon='bars' fas />
        </MDBNavbarToggler>

        <MDBCollapse navbar show={showBasic}>
          <MDBNavbarNav className='mr-auto mb-2 mb-lg-0'>
            <MDBNavbarItem>
              
                <Link to='/' className='nav-link'>
              
                HOME
          
                </Link>
      
            </MDBNavbarItem>

            <MDBNavbarItem>
              <MDBDropdown>
                <MDBDropdownToggle tag='a' className='nav-link'>
                  Special Events
                </MDBDropdownToggle>
                <MDBDropdownMenu>
                  <MDBDropdownItem>
                    <MDBDropdownLink>Action</MDBDropdownLink>
                  </MDBDropdownItem>
                  <MDBDropdownItem>
                    <Link to = '/birthday-bompers' className='dropdown-item'>
                    Birthday Bompers
                    </Link>
                  </MDBDropdownItem>
                  <MDBDropdownItem>
                    <MDBDropdownLink>Something else here</MDBDropdownLink>
                  </MDBDropdownItem>
                </MDBDropdownMenu>
              </MDBDropdown>
            </MDBNavbarItem>

            <MDBNavbarItem>
              <MDBNavbarLink active aria-current='page' >
                HOW IT WORKS
              </MDBNavbarLink>
            </MDBNavbarItem>

            <MDBNavbarItem>
            <span className='nav-link' onClick={logoutHandler}>
              
              Logout
        
              </span>        
            </MDBNavbarItem>


          { authCtx.isLoggedIn ?   (<MDBNavbarItem className='ms-auto'>
           <Link to='/cart'> <HeaderCartButton /></Link>
          </MDBNavbarItem>) : <div className='ms-auto'><Link to="/login" ><MDBBtn style={style} >Login</MDBBtn></Link> <Link to="/signup" className='ms-auto'><MDBBtn style={style} >Sign Up</MDBBtn></Link></div>}
        </MDBNavbarNav>

         
        </MDBCollapse>
      

      </MDBContainer>
    </MDBNavbar>
  




  );
}

export default Navbar;