import {gql} from '@apollo/client';

export const CHANGE_PASSWORD = gql`
  mutation ($data: ChangePasswordInput!) {
    changePassword(data: $data) {
      email
    }
  }
`;
