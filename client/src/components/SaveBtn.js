import React, { Component } from 'react';
import {Button} from 'react-bootstrap';
import axios from 'axios';

class SaveBtn extends Component {
  constructor(props){
    super(props)
    this.state = {
      book: this.props.data_book,
      isSaved: false,
      //text: 'Save'
    }
    this.handleSave = this.handleSave.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
  }

  handleSave(book){
    //e.preventDefaut()
    var newBook = this.state.book.volumeInfo


    if (!this.state.isSaved){
      axios.post(`/api/books`, {
        title: newBook.title,
        authors: newBook.authors,
        description: newBook.description,
        image: newBook.imageLinks.thumbnails,
        book_link: newBook.infoLink,
        preview_link: newBook.previewLink,
        book_id: this.state.book.id
      })
      .then (res => {
        console.log(res)
        this.setState({
          isSaved: true
        })
      })
    }
  }

  handleDelete(e){
    //e.preventDefaut()

  }
  render() {
    //const {book} = this.state
    //const {text} = this.state
    const isSaved = this.state.isSaved

    return (
      isSaved ? <Button variant='outline-info' onClick={this.handleDelete}>Saved!</Button> : <Button variant='secondary' onClick={this.handleSave}>Save</Button>
      // <Button variant='secondary' onClick='this.handleSave'>{text}</Button>
    )
  }
}

export default SaveBtn;