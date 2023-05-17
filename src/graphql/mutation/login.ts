import {gql} from '@apollo/client';

export const LOGIN = gql`
  mutation ($data: LoginInput!) {
    login(data: $data) {
      accessToken
      user {
        id
        name
        phone
        organizationId
        email
        role
      }
    }
  }
`;
