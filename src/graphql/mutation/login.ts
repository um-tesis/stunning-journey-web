import {gql} from '@apollo/client';

export const LOGIN = gql`
  mutation ($input: LoginModelIn!) {
    login(loginModelIn: $input) {
      user {
        email
      }
      token
    }
  }
`;
