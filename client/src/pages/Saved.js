import React, { Component } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
//import SaveBtn from '../components/SaveBtn'
import DeleteBtn from '../components/DeleteBtn'

class Saved extends Component {
  constructor(props) {
    super(props);
    this.state = {
      savedBooks: []
    }
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

  render() {
    const books = this.state.savedBooks
    return (
      <Container fluid>
        <Row className='m-1'>
          <Col>
            <h3>Saved Books</h3>
          </Col>
        </Row>

        <Row>
          {books.map((book) => 
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
                      <div className='overflow-hidden'><p>{book.description}</p></div>
                      {/* <SaveBtn data_book = {book}/> */}
                      <Button variant='info' href={book.previewLink} target='blank'>View</Button>
                      <DeleteBtn data_book = {book}/>
                    </Col>
                  </Row>
                </Card.Body>
            </Card>
          </Col>
          )}
        </Row>
      </Container>
    )
  }
}

export default Saved;