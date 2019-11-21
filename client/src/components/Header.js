//import React, { useState } from "react";
import React from "react";

import {Jumbotron, Image} from 'react-bootstrap';
//import {Toast} from "react-bootstrap";
import {Container} from 'react-bootstrap';
import Google_Books from '../images/Google_Books.svg'

// const ExampleToast = ({ children }) => {
//   const [show, toggleShow] = useState(true);

//   return (
//     <Toast show={show} onClose={() => toggleShow(!show)}>
//       <Toast.Header>
//         <strong className="mr-auto">React-Bootstrap</strong>
//       </Toast.Header>
//       <Toast.Body>{children}</Toast.Body>
//     </Toast>
//   );
// };

const Header = () => (
  <Jumbotron fluid>
    <Container className='Header-jumbotron'>
      <p className="lead">Search for and Save Books of Interest on</p>
      <Image fluid className='p-2 ml-4 w-25' src={Google_Books} alt='google-books-logo' />
      {/* <p className='lead'>Get the lastest news from
      
      <img className='p-2' src={smashing} alt='magazine-logo'></img>
      </p> */}
      {/* <ExampleToast className="toast">
        We now have Toasts
      <span role="img" aria-label="tada">
          🎉
      </span>
      </ExampleToast> */}
    </Container>
  </Jumbotron>
);

export default Header;

