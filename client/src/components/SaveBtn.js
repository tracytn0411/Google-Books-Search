import React, { Component } from 'react';
import {Button} from 'react-bootstrap';
import axios from 'axios';

class SaveBtn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSaved: false,
      saveID: ''
    };
    this.handleSave = this.handleSave.bind(this);
    this.handleUnsave = this.handleUnsave.bind(this);
  }

  handleSave() {
    this.setState({
      isSaved: true
    });
    var newBook = this.props.data_book.volumeInfo;
    axios
      .post(`/api/books`, {
        title: newBook.title,
        authors: newBook.authors,
        description: newBook.description,
        image: newBook.imageLinks.thumbnail,
        book_link: newBook.infoLink,
        preview_link: newBook.previewLink,
        book_id: this.props.data_book.id
      })
      .then(res => {
        var saveID = res.data._id
        console.log(saveID)
        this.setState({
          saveID: saveID //get the mongo id of newly saved book and pass to unsave btn
        })
      })
      .catch(err => console.log(`Frontend save ERROR: ${err}`));
  }

  handleUnsave() {
    this.setState({
      isSaved: false
    });
    var delBookId = this.state.saveID; //passed from savebtn above
    console.log(`unsave book id is ${delBookId}`);
    axios
      .delete(`/api/books/${delBookId}`)
      .then(res => {
        console.log(res);
      })
      .catch(err => console.log(`Frontend unsave ERROR: ${err}`));
  }

  render() {
    const isSaved = this.state.isSaved;

    return (
      <div>
        {isSaved ? (
          <Button variant="outline-success" onClick={this.handleUnsave}>
            Saved!
          </Button>
        ) : (
          <Button variant="outline-secondary" onClick={this.handleSave}>
            Save
          </Button>
        )}
      </div>
      
    );
  }
}

export default SaveBtn;