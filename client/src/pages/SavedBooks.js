import React, { useState, useEffect } from 'react';
import {
  Container,
  Card,
  Button,
  Row,
  Col
} from 'react-bootstrap';
//importing the useMutation() hook from the @apollo/client package
import {useQuery, useMutation} from '@apollo/client';
import { GET_ME, DELETE_BOOK } from '../utils/API';
import Auth from '../utils/auth';
import { removeBookId } from '../utils/localStorage';

//here we are creating the SavedBooks component
const SavedBooks = () => {
  const { loading, data } = useQuery(GET_ME);
  const userData = data?.me || {};
  const [deleteBook, { error }] = useMutation(DELETE_BOOK);
  if(!Auth.loggedIn()){
    return (
    <h2>You must be logged in to view this page.
      <a href='/login'>Login</a> or <a href='/signup'>Signup</a>
    </h2>
  );
}
//here we are creating the handleDeleteBook function
const handleDeleteBook = async (bookId) => {
  const token = Auth.loggedIn() ? Auth.getToken() : null;
  if (!token) {
    return false;
  }
  try {
    await deleteBook({
      variables: { bookId: bookId },
      update(cache, { data: { deleteBook } }) {
        cache.evict({ id: cache.identify(deleteBook) });
      }
    });
    removeBookId(bookId);
  } catch (err) {
    console.error(err);
  }
};
//if the query is loading, we display the text 'LOADING...'
if (loading) {
  return <h2>LOADING...</h2>;
}
//here we are returning the JSX to render the SavedBooks component

  return (
    <>
      <div fluid className="text-light bg-dark p-5">
        <Container>
          <h1>Viewing saved books!</h1>
        </Container>
      </div>
      <Container>
        <h2 className='pt-5'>
          {userData.savedBooks.length
            ? `Viewing ${userData.savedBooks.length} saved ${userData.savedBooks.length === 1 ? 'book' : 'books'}:`
            : 'You have no saved books!'}
        </h2>
        <Row>
          {userData.savedBooks.map((book) => {
            return (
              <Col md="4">
                <Card key={book.bookId} border='dark'>
                  {book.image ? <Card.Img src={book.image} alt={`The cover for ${book.title}`} variant='top' /> : null}
                  <Card.Body>
                    <Card.Title>{book.title}</Card.Title>
                    <p className='small'>Authors: {book.authors}</p>
                    <Card.Text>{book.description}</Card.Text>
                    <Button className='btn-block btn-danger' onClick={() => handleDeleteBook(book.bookId)}>
                      Delete this Book!
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    </>
  );
};

export default SavedBooks;
