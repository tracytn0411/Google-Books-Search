import React, { Component } from 'react';
import {Form, Button, FormControl, Row, Col, Container, Card} from 'react-bootstrap';
import axios from 'axios';
import SaveBtn from './SaveBtn';

class SearchForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchInput: "",
      searchResults: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    var value = event.target.value;
    this.setState({ searchInput: value });
  }

  handleSubmit(event) {
    event.preventDefault();
    var searchBook = this.state.searchInput;
    console.log(`search word is ${searchBook}`);

    axios
      .post("/api/search", {
        title: searchBook
      })
      .then(res => {
        console.log(res.data)
        this.setState({
          searchResults: res.data,
          searchInput: ""
        });
      })
      .catch(err => console.log(`Front search error: ${err}`));
  }

  
  render() {
    return (
      <Container fluid>
        <Row className='m-1'>
          <Col>
            <Form inline onSubmit={this.handleSubmit}>
              <FormControl
                type="text"
                placeholder="Enter a book..."
                name="book"
                value={this.state.book}
                onChange={this.handleChange}
              />
              <Button type="submit">Search</Button>
            </Form>
          </Col>
        </Row>

        {/* In a concise body, no need for block body (curly braces) and an implicit return is attached */}
        <Row className='m-1'>
          {this.state.searchResults.map((book, index) => (
            <Col md={6} lg={4} key={index}>
              <Card>
                <Card.Header>
                  <h5>{book.volumeInfo.title}</h5>
                  <p>
                    by <em>{book.volumeInfo.authors}</em>
                  </p>
                </Card.Header>
                <Card.Body>
                  <Row>
                    <Col md={4}>
                      <Card.Img src={book.volumeInfo.imageLinks.thumbnail} />
                    </Col>
                    <Col md={8}>
                      <p className="lead">{book.volumeInfo.description}</p>
                      <SaveBtn data_book = {book}/>
                      
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    );
  }
}

export default SearchForm;