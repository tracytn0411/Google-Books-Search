import React, { Component} from 'react';
//import {Container} from 'react-bootstrap';
//import axios from 'axios';

import SearchForm from '../components/SearchForm'
import SearchResults from '../components/SearchResults'

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchInput: '',
      searchResults: []
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSearchResults = this.handleSearchResults.bind(this);
  }

  handleInputChange(searchInput){
    this.setState({
      searchInput: searchInput //pass input from search form and set state here
    })
  }

  handleSearchResults(data){
    this.setState({
      searchResults: data
    })
  }

  render() {
    return (
      <> 
        <SearchForm searchInput={this.state.searchInput} onInputChange={this.handleInputChange} onSearchResults={this.handleSearchResults}/>
        <SearchResults searchInput={this.state.searchInput} searchResults={this.state.searchResults}/>
      </>
     
    )
  }

}

export default Search;