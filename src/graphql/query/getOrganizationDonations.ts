import {gql} from '@apollo/client';

export const GET_ORGANIZATION_DONATIONS = gql`
  query donations($organizationId: Int!, $page: Int!, $itemsPerPage: Int!, $filter: String) {
    donationsByOrganization(
      organizationId: $organizationId
      page: $page
      itemsPerPage: $itemsPerPage
      filter: $filter
    ) {
      donations {
        amount
        mpPreferenceId
        donor {
          email
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
