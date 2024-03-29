import {gql} from '@apollo/client';

export const CREATE_USER = gql`
  mutation ($data: CreateUserInput!) {
    createUser(data: $data) {
      id
    }
  }
`;
