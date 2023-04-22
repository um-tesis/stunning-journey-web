import {gql} from '@apollo/client';

export const GET_PROJECTS = gql`
  query projects($page: Int, $itemsPerPage: Int, $filter: String) {
    projects(page: $page, itemsPerPage: $itemsPerPage, filter: $filter) {
      projects {
        organizationId
        name
        field
        startDate
        endDate
      }
      total
    }
  }
`;
