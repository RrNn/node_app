import { gql } from '@apollo/client';

const getAuthorsQuery = gql`
  {
    authors {
      name
      id
      age
    }
  }
`;

const getBooksQuery = gql`
  {
    books {
      name
      id
    }
  }
`;

const addBookMutation = gql`
  mutation($name: String!, $genre: String!, $authorId: ID!) {
    addBook(name: $name, genre: $genre, authorId: $authorId) {
      name
      id
    }
  }
`;

const addAuthorMutation = gql`
  mutation($name: String!, $age: Int!) {
    addAuthor(name: $name, age: $age) {
      name
      id
      age
    }
  }
`;

const deleteAuthorMutation = gql`
  mutation($id: ID!) {
    deleteAuthor(id: $id) {
      id
      age
    }
  }
`;

const getBookQuery = gql`
  query($id: ID) {
    book(id: $id) {
      name
      genre
      id
      author {
        id
        name
        age
        books {
          name
          id
        }
      }
    }
  }
`;

export {
  getAuthorsQuery,
  getBooksQuery,
  addBookMutation,
  getBookQuery,
  addAuthorMutation,
  deleteAuthorMutation,
};
