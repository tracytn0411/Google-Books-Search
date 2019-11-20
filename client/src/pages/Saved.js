import React, { Component } from 'react';
import axios from 'axios';
//import SaveBtn from '../components/SaveBtn'
import SavedBooks from '../components/SavedBooks'

class Saved extends Component {
  constructor(props) {
    super(props);
    this.state = {
      savedBooks: []
    }
    this.deleteBook = this.deleteBook.bind(this)
  }

  componentDidMount(){
    this.getBooks()
  }

  getBooks() {
    axios.get(`/api/books`)
      .then (res => {
        console.log(res.data)
        this.setState({
          savedBooks: res.data
        })
      })
      .catch (err => console.log(`Frontend axios /api/books ERROR: ${err}`))
  }

  //Delete book using id passed up from delete button 
  deleteBook(id) {
    axios
      .delete(`/api/books/${id}`)
      .then(res => {
        console.log(`Book removed from saved list!`)
        console.log(res.data)
      })
      .then(this.getBooks()) //to update the saved page (remove the deleted book)
      .catch(err => console.log(`Frontend delete ERROR: ${err}`))
  }

  render(){
    return(
      <SavedBooks savedBooks={this.state.savedBooks} onDeleteClicked={this.handleDeleteClicked} deleteBook={this.deleteBook}/>
    )
  }

}

export default Saved;