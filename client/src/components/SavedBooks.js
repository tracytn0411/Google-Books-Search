import React, { Component } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import DeleteBtn from '../components/DeleteBtn'


class SavedBooks extends Component {
  constructor(props){
    super(props)
    //this.handleDeleteClicked = this.handleDeleteClicked.bind(this)
    this.deleteBook = this.deleteBook.bind(this)
  }

  deleteBook(bookID) {
    //pass the book id (to be deleted) from deleteBtn to Saved page (parent)
    this.props.deleteBook(bookID) 
  }

  render() {
    const savedBooks = this.props.savedBooks;
    return (
      <Container fluid>
        <Row className="m-1">
          <Col>
            <h3>Saved Books</h3>
          </Col>
        </Row>

        <Row>
          {savedBooks.map(book => (
            <Col md={6} lg={4} key={book.book_id}>
              <Card>
                <Card.Header>
                  <h5>{book.title}</h5>
                  <p>
                    by <em>{book.authors}</em>
                  </p>
                </Card.Header>
                <Card.Body>
                  <Row>
                    <Col md={4}>
                      <Card.Img src={book.image} />
                    </Col>
                    <Col md={8}>
                      <div className="overflow-hidden">
                        <p>{book.description}</p>
                      </div>
                      {/* <SaveBtn data_book = {book}/> */}
                      <Button
                        variant="info"
                        href={book.previewLink}
                        target="blank"
                      >
                        View
                      </Button>
                      <DeleteBtn bookID={book._id} value={book.book_id} data_book={book} deleteBook={this.deleteBook}/>
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

export default SavedBooks;
