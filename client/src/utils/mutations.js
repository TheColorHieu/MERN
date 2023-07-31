//here we are importing the gql tagged template function from the @apollo/client package.
import { gql } from '@apollo/client';
//here we are defining the query called GET_ME that will execute the me query set up using Apollo Server.
//we are setting the query to request the _id, username, email, bookCount, and savedBooks fields from a user and storing it in the query constant.

//we are defining the LOGIN_USER mutation and setting it equal to the mutation request for login.
export const LOGIN_USER = gql`
mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
        token
        user {
        _id
        username
        }
    }
}
`;
//here we are defining the ADD_USER mutation and setting it equal to the mutation request for addUser.
export const ADD_USER = gql`
mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
        token
        user {
        _id
        username
        }
    }
}
`;

//here we are defining the SAVE_BOOK mutation and setting it equal to the mutation request for saveBook.
export const SAVE_BOOK = gql`
mutation saveBook($input: BookInput!) {
    saveBook(input: $input) {
        username
        email
        bookCount
        savedBooks {
        bookId
        authors
        description
        title
        image
        link
        }
    }
}
`;

//here we are defining the REMOVE_BOOK mutation and setting it equal to the mutation request for removeBook.
export const REMOVE_BOOK = gql`
mutation removeBook($bookId: String!) {
    removeBook(bookId: $bookId) {
        username
        email
        bookCount
        savedBooks {
        bookId
        authors
        description
        title
        image
        link
        }
    }
}
`;