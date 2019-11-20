import React, { Component } from "react";
import { Button, Row, Col, Container, Card } from "react-bootstrap";
import SaveBtn from './SaveBtn'

class SearchResults extends Component {
  render() {
    var searchResults = this.props.searchResults;
    //console.log(searchResults)
    return (
      <Container>
        <Row>
          {searchResults.map((book, index) => (
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
                      <div className="overflow-hidden">
                        <p>{book.volumeInfo.description}</p>
                      </div>
                      <Button
                        variant="info"
                        href={book.volumeInfo.previewLink}
                        target="blank"
                      >
                        View
                      </Button>
                      <SaveBtn data_book = {book}/>
                      {/* <DeleteBtn data_book = {book}/> */}
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

export default SearchResults;
