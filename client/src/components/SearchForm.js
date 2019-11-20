import React, { Component } from 'react';
import {Form, Button, FormControl, Row, Col, Container, Card} from 'react-bootstrap';
import axios from 'axios';
//import SaveBtn from './SaveBtn';

class SearchForm extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this)
  }

  handleInputChange(e) {
    var value = e.target.value; //live change as typing
    //console.log(value)
    this.props.onInputChange(value)//pass props to search page
  }

  handleSubmit(event) {
    event.preventDefault();
    var searchBook = this.props.searchInput;
    console.log(`search word is ${searchBook}`);

    axios
      .post("/api/search", {
        title: searchBook
      })
      .then(res => {
        console.log(res.data)
        this.props.onSearchResults(res.data)//pass search data to search page
      })
      .catch(err => console.log(`Front search error: ${err}`));
  }


  render() {
    const searchInput = this.props.searchInput
    return (
      <Container>
        <Form inline onSubmit={this.handleSubmit}>

          <FormControl 
            type='text' placeholder='Enter a book...'
            value={searchInput}
            onChange={this.handleInputChange}
          />
          <Button type='submit'>Search</Button>
        </Form>
      </Container>
    )
  }
}

export default SearchForm;