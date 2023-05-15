import {gql} from '@apollo/client';

export const GET_PROJECT = gql`
  query project($id: Int!) {
    project(id: $id) {
      id
      organizationId
      name
      description
      field
      startDate
      endDate
      coverPhoto
      organization {
        name
      }
    }
  }
`;
