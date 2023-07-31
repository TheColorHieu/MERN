//here we are importing the gql tagged template function from the @apollo/client package.
import gql from '@appollo/client';

export const GET_ME = gql`
{
    me {
        _id
        username
        bookCount
        email
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