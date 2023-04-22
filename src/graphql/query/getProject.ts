import {gql} from '@apollo/client';

export const GET_PROJECT = gql`
  query project($id: Int!) {
    project(id: $id) {
      organizationId
      name
      field
      startDate
      endDate
    }
  }
`;
