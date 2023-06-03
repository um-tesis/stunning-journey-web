import {gql} from '@apollo/client';

export const GET_ORGANIZATION_DONORS = gql`
  query donors($organizationId: Int!, $page: Int!, $itemsPerPage: Int!, $filter: String) {
    donorsByOrganization(
      organizationId: $organizationId
      page: $page
      itemsPerPage: $itemsPerPage
      filter: $filter
    ) {
      donors {
        email
        identification
        identificationType
        cardStart
        paymentMethod
        createdAt
      }
      total
    }
  }
`;
