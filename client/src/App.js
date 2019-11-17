import React, {Component} from 'react';
import {BrowserRouter, Route, Link, Switch} from 'react-router-dom';
import './App.css';
import {
  Navbar, Nav
} from 'react-bootstrap';

import Header from './components/Header'
import Search from './pages/Search'

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      isOpen: false
    }
  }
 
  toggleCollapse = () => {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }

  render() {
    return (
      <BrowserRouter>
        <Navbar bg="light" expand="lg">
          <Navbar.Brand href="/">Google Books</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Item className='px-2'>
                <Link to="/" className='btn btn-light'>Search</Link>
              </Nav.Item>
              {/* <Nav.Item>
                <Link to="/saved" className='btn btn-light'>Saved Books</Link>
              </Nav.Item> */}
    
              
            </Nav>
              {/* <a href="https://github.com/tracytn0411/google-books-search" role="button">
                <FaGithub />
              </a> */}
           
          </Navbar.Collapse>
        </Navbar>

        <Header />

        <Switch>
          <Route exact path="/" component={Search} />
          {/* <Route path="/saved" component={SavedBooks} /> */}
        </Switch>
      </BrowserRouter>
    )
  }
}

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
      
//     </div>
//   );
// }

export default App;
