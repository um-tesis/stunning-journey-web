import {gql} from '@apollo/client';

export const GET_PROJECT_DONATIONS = gql`
  query donations($projectId: Int!, $page: Int, $itemsPerPage: Int, $filter: String) {
    donationsByProject(projectId: $projectId, page: $page, itemsPerPage: $itemsPerPage, filter: $filter) {
      donations {
        amount
        donor {
          email
          firstName
          identification
        }
        project {
          name
        }
        createdAt
      }
      total
    }
  }
`;
