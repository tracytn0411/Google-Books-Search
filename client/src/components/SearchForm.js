import React, { Component } from 'react';
import {Form, Button, FormControl, Container, FormLabel} from 'react-bootstrap';
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
    this.props.onInputChange(value)//pass search input (props) to search page
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
        this.props.onSearchResults(res.data)//pass searchResults (from server) to search page
      })
      .catch(err => console.log(`Front search error: ${err}`));
  }


  render() {
    const searchInput = this.props.searchInput
    return (
      <Container className='searchForm d-flex justify-content-center align-items-center'>
        
        <Form inline onSubmit={this.handleSubmit}>
          <FormLabel className='pr-4 h3'>
            Book Search
          </FormLabel>
          <FormControl 
            type='text' placeholder='Enter a title...'
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