import {gql} from '@apollo/client';

export const GET_OUR_PROJECTS = gql`
  query projects($organizationId: Int!, $page: Int!, $itemsPerPage: Int!, $filter: String) {
    organizationProjects(
      organizationId: $organizationId
      page: $page
      itemsPerPage: $itemsPerPage
      filter: $filter
    ) {
      projects {
        id
        name
        field
        startDate
        endDate
        monetaryGoal
      }
      total
    }
  }
`;
