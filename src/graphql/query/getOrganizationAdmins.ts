import {gql} from '@apollo/client';

export const GET_ORGANIZATION_ADMINS = gql`
  query admins($page: Int, $itemsPerPage: Int, $filter: String) {
    adminsByOrganizationId(page: $page, itemsPerPage: $itemsPerPage, filter: $filter) {
      admins {
        name
        email
        phone
        createdAt
      }
      total
    }
  }
`;
