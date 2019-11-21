import React, { Component } from "react";
import { Row, Col, Container, Card } from "react-bootstrap";
import SaveBtn from "./SaveBtn";

class SearchResults extends Component {
  render() {
    var searchResults = this.props.searchResults;
    //console.log(searchResults)
    return (
      <Container fluid className="searchResults">
        <Row className="m-1">
          {searchResults.map((book, index) => (
            <Col md={6} lg={4} key={index} className="mt-3">
              <Card>
                <Card.Header>
                  <Card.Title className="bookTitle">
                    {book.volumeInfo.title}
                  </Card.Title>
                  <p className="mb-1">
                    by{" "}
                    <em className="bookAuthors">
                      {book.volumeInfo.authors
                        .map((author, i) => (
                          <span key={i}>{author}</span>
                        ))
                        // Join authors in array with a comma
                        .reduce((prev, curr) => [prev, ', ', curr])}
                    </em>
                  </p>
                </Card.Header>
                <Card.Body>
                  <Row>
                    <Col md={4} className="p-0">
                      <Card.Img src={book.volumeInfo.imageLinks.thumbnail} />
                    </Col>
                    <Col md={8}>
                      <div className="bookDescription">
                        <Card.Text>{book.volumeInfo.description}</Card.Text>
                      </div>
                      <Card.Link
                        href={book.volumeInfo.infoLink}
                        target="_blank"
                      >
                        Read more...
                      </Card.Link>

                      <Card.Footer className="text-right">
                        <SaveBtn className="mt-4" data_book={book} />
                      </Card.Footer>
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
