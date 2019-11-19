import React, { Component } from 'react';
import {Button} from 'react-bootstrap';
import axios from 'axios';

class DeleteBtn extends Component {
  constructor(props) {
    super(props)
    this.state = {
      book: this.props.data_book
    }
    this.handleDelete = this.handleDelete.bind(this)
  }

  handleDelete() {
    var deleteID = this.state.book._id
    console.log(deleteID)
    axios.delete(`/api/books/${deleteID}`)
      .then(res => {
        this.setState({
          book: {}
        })
      })
      .catch(err => console.log(`Frontend delete ERROR: ${err}`))
  }

  render() {
    return(
      <Button variant='outline-success' onClick={this.handleDelete}>Saved!</Button>
    )
  }
}

export default DeleteBtn;