import { MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBContainer, MDBCardText, MDBBtn } from 'mdb-react-ui-kit';
import React, { useState, useEffect, useContext } from 'react'
import { useNavigate } from "react-router-dom";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import classes from './OwlCarouselComponent.module.css';
import CartContext from '../../Store/Cart-context';
import { Toast } from '../Helper/SweetAlertSwal2';



const OwlCarouselComponent = () => {

//useState() hook
const [meals, setMeals] = useState([]);
const [isLoading, setIsLoading] = useState(true);

//useNavigate hook()
const navigate = useNavigate();



//cartCtx
const cartCtx = useContext(CartContext)


//my style
const styleTitle = {
  marginTop: '2rem',
  // marginBottom:'10rem',
  fontWeight: 'bold',
  fontSize:'2rem',
}



//responsive style
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2
    }
  };
const style = {
  maxHeight:"30rem",
  maxWidth:"25rem"

}


// fetching meals
useEffect(() => {
  const fetchMeals = async () => {
    const response = await fetch("https://spring-boot-food-ordering-app.herokuapp.com/public/meals/");
    // const response = await fetch("http://localhost:8080/public/meals/");


    if (!response) {
      throw new Error("something went Wrong");
    }
    const responseData = await response.json();
    const carouselMealList = responseData.slice(0, 6)
    setMeals(carouselMealList);  
    setIsLoading(false);
  };

  fetchMeals()
    .then()
    .catch((error) => {
    });
}, []);



//item click handler
const itemOverviewClickHandler = (event) => {
  const itemId = event.target.id;
  const overViewItem = meals.filter((item) => item.id === parseInt(itemId))
  navigate("/item-overview", { state:overViewItem[0]});
}



//itemOverviewClickHandler() method

const addToCartHandler = (event) => {
  const id = event.target.value;
  const itemToCart =meals.filter((item) => item.id === parseInt(id));
  const cartItem = {item:itemToCart[0], quantity:1};    
    cartCtx.addItem(cartItem);
    Toast.fire({
      icon: 'success',
      iconColor:'#aa2727',
      title: 'Item Added To Cart'
    }
    )




}


//carsouselItems
const mealList = meals.map(item => (

<MDBCard style={style} key={item.id} id={item.id} >

  <MDBCardBody>
    <MDBCardImage 
    key = {item.id}
    id={item.id}
    src={`https://spring-boot-food-ordering-app.herokuapp.com/admin/images/${item.image}`}
    // src={`http://localhost:8080/admin/images/${item.image}`}
  

    alt="..."
    position="top"
    style={{ maxWidth: "20rem", maxHeight:"20rem", }}

    />
  <MDBCardTitle>{item.name}</MDBCardTitle>


  <MDBCardText>{item.short_desc}</MDBCardText>
          <MDBCardText className="d-inline p-2">
            {/* actual Price<strike>{object.actualPrice} ₹</strike> */}
            Price: <strike>{item.actualPrice}</strike> {item.discountedPrice} ₹
          </MDBCardText>
          {/* <MDBBtn
            className="d-inline p-2"
            id={item.id}
            onClick={itemOverviewClickHandler}
            style={{ backgroundColor: "#aa2727", border: "1px solid #aa2727" }}
          >
            Quick View
          </MDBBtn> */}
           <MDBBtn
            className="d-inline p-2"
            id={item.id}
            onClick={itemOverviewClickHandler}
            style={{ backgroundColor: "#aa2727", border: "1px solid #aa2727" }}
          >
            Quick View
          </MDBBtn>

  </MDBCardBody>
  <button className={classes.button} onClick = {addToCartHandler} value={item.id}>Add +</button>
    </MDBCard>



))




  return (
    <MDBContainer>
  <span style={styleTitle}>Deals of the Day</span>

    <Carousel
  responsive={responsive}
  swipeable={false}
  draggable={true}
  showDots={true}
  infinite={true}
  autoPlaySpeed={1000}
  keyBoardControl={true}
  // customTransition="all .5"
  // transitionDuration={1000}
  // containerClass="carousel-container"
  // removeArrowOnDeviceType={["tablet", "mobile"]}
  // deviceType={this.props.deviceType}
  // dotListClass="custom-dot-list-style"
  itemClass="carousel-item-padding-40-px"
  
  >
    {!isLoading && mealList}
 
  </Carousel>
    </MDBContainer>
  )
}

export default OwlCarouselComponent