import React, { useState } from 'react';
import { MDBCollapse, MDBBtn, MDBRow, MDBCol } from 'mdb-react-ui-kit';

function Collapse() {
  const [showFirstElement, setShowFirstElement] = useState(false);
  const [showSecondElement, setShowSecondElement] = useState(false);
  const [showThirdElement, setShowThirdElement] = useState(false);

  const toggleFirstElement = () => setShowFirstElement(!showFirstElement);
  const toggleSecondElement = () => setShowSecondElement(!showSecondElement);
  const toggleThirdElement = () => setShowThirdElement(!showThirdElement);

  
  return (
      <>
    <MDBBtn onClick={toggleFirstElement}> Toggle first element</MDBBtn>
    <MDBBtn onClick={toggleSecondElement}>Toggle second element</MDBBtn>
    <MDBBtn onClick={toggleThirdElement}> Toggle third elements</MDBBtn>

    <MDBRow center>
      <MDBCol>
        <MDBCollapse show={showFirstElement} className='mt-3'>
          Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. Nihil
          anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident.
        </MDBCollapse>
      </MDBCol>
      <MDBCol>
        <MDBCollapse show={showSecondElement} className='mt-3'>
          Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. Nihil
          anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident.
        </MDBCollapse>
      </MDBCol>
      <MDBCol>
        <MDBCollapse show={showThirdElement} className='mt-3'>
          Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. Nihil
          anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident.
        </MDBCollapse>
      </MDBCol>
    </MDBRow>

    </>
  );
}


export default Collapse;