import { gql } from '@apollo/client';

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

export const ADD_USER = gql`
    mutation addUser($username: String!, $email: String!, $password: String!) {
        addUser(username: $username, email: $email, password: $password) {
            token
            user {
                _id
            }
        }
    }
`

// export const SAVE_BOOK = gql`
//     mutation saveBook($authors: String!, $description: String!, $title:String!, bookId: ID!, image: String!, $link: String!) {
//         saveBook(authors: $author, description: $description, bookId: $bookId, image: $image, link: $link) {
//             _id
//         }
//     }
// `