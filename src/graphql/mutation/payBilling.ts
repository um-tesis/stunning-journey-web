import {gql} from '@apollo/client';

export const PAY_BILLING = gql`
  mutation ($projectId: Int!) {
    payBilling(projectId: $projectId) {
      id
    }
  }
`;
