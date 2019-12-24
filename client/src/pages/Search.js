import React, { Component} from 'react';
import SearchForm from '../components/SearchForm'
import SearchResults from '../components/SearchResults'
import axios from 'axios';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchInfo: '',
      searchInput: '',
      searchResults: []
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSearchResults = this.handleSearchResults.bind(this);
  }

  componentDidMount(){
    this.getDefault()
  }

  getDefault() {
    axios.get('/api/default')
    .then(res => {
      console.log(res.data)
      this.setState({
        searchInfo: 'Current Best-Selling Books',
        searchResults: res.data
      })
    })
    .catch(err => console.log(`Frontend default books results error: ${err}`))
  }

  handleInputChange(searchInput){
    this.setState({
      searchInput: searchInput //pass input from search form and set state here
    })
  }

  handleSearchResults(data){
    this.setState({
      searchResults: data,
      searchInfo: `Search Results for "${this.state.searchInput}"`,
      searchInput: '', //clear the form input after submit
    })
  }

  render() {
    return (
      <> 
        <SearchForm searchInput={this.state.searchInput} onInputChange={this.handleInputChange} onSearchResults={this.handleSearchResults} />
        <SearchResults searchInfo={this.state.searchInfo} searchInput={this.state.searchInput} searchResults={this.state.searchResults} />
      </>
     
    )
  }

}

export default Search;