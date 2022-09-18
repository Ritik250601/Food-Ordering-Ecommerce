import React from 'react';
import mealsImage1 from '../../../Assets/meals.jpg'
import mealsImage2 from '../../../Assets/meals2.jpeg'
import mealsImage3 from '../../../Assets/meals3.jpg'


import {
  MDBCarousel,
  MDBCarouselInner,
  MDBCarouselItem,
  MDBCarouselElement,
  MDBCarouselCaption,
} from 'mdb-react-ui-kit';

export default function App() {
const style = {
  maxHeight:"40rem"


}


  return (
    <MDBCarousel showControls showIndicators   className='container-fluid px-0 my-0' style={{}}>
      <MDBCarouselInner>
        <MDBCarouselItem className='active '>
          <MDBCarouselElement src={mealsImage1} alt='...'  style={style }/>
          <MDBCarouselCaption style={{backgroundColor:'#aa2727', borderRadius:'8px'}}>
            <h5>Find Quick Industry Spert</h5>
            <p>Find Industry experts who are ready to help you with your job hunting.
Are you a job seeker just an expert capable of interviewing others? If yes, there is something new waiting for you here.</p>
          </MDBCarouselCaption>
        </MDBCarouselItem>
        <MDBCarouselItem>
          <MDBCarouselElement src={mealsImage2} alt='...' style={style}/>
          <MDBCarouselCaption style={{backgroundColor:'#aa2727', borderRadius:'8px'}}>
            <h5>Second slide label</h5>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </MDBCarouselCaption>
        </MDBCarouselItem>
        <MDBCarouselItem>
          <MDBCarouselElement src={mealsImage3} alt='...' style={style}/>
          <MDBCarouselCaption style={{backgroundColor:'#aa2727', borderRadius:'8px'}}>
            <h5>Third slide label</h5>
            <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
          </MDBCarouselCaption>
        </MDBCarouselItem>
      </MDBCarouselInner>
    </MDBCarousel>
  );
}









