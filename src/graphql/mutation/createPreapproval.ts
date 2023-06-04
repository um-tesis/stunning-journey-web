import {gql} from '@apollo/client';

export const CREATE_PREAPPROVAL = gql`
  mutation ($input: CreatePreapprovalInput!) {
    createPreapproval(createPreapprovalInput: $input) {
      id
      status
      reason
      externalReference
      initPoint
    }
  }
`;
