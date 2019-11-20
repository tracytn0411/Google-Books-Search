import React, { Component } from 'react';
import {Button} from 'react-bootstrap';

class DeleteBtn extends Component {
  constructor(props) {
    super(props)
    this.deleteBook = this.deleteBook.bind(this)
  }

  deleteBook(e) {
    var bookID = e.target.id
    console.log(`Delete book that has id: ${bookID}`)
    this.props.deleteBook(bookID) //pass the book id to savedBooks (parent)
  }

  render() {
    const bookID = this.props.bookID
    console.log(bookID)
    return(
      <Button variant='outline-success' id={bookID} onClick={this.deleteBook}>Saved!</Button>
    )
  }
}

export default DeleteBtn;