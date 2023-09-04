import {gql} from '@apollo/client';

export const GET_PROJECT_SUBSCRIPTIONS = gql`
  query subscriptions($projectId: Int!, $page: Int, $itemsPerPage: Int, $filter: String) {
    subscriptionsByProject(projectId: $projectId, page: $page, itemsPerPage: $itemsPerPage, filter: $filter) {
      subscriptions {
        frequencyInterval
        amount
        createdAt
        payerEmail
        status
        mpSubscriptionId
        createdAt
        project {
          name
        }
      }
      total
    }
  }
`;
