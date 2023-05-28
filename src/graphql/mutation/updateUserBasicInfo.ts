import {gql} from '@apollo/client';

export const UPDATE_USER_BASIC_INFO = gql`
  mutation ($updateUserInput: UpdateUserInput!) {
    updateUser(updateUserInput: $updateUserInput) {
      id
      name
      phone
      organizationId
      email
      role
    }
  }
`;
