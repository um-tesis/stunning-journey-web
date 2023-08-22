import {gql} from '@apollo/client';

export const GET_ORGANIZATION_SUBSCRIPTIONS = gql`
  query subscriptions($organizationId: Int!, $page: Int, $itemsPerPage: Int, $filter: String) {
    subscriptionsByOrganization(
      organizationId: $organizationId
      page: $page
      itemsPerPage: $itemsPerPage
      filter: $filter
    ) {
      subscriptions {
        frequencyInterval
        amount
        createdAt
        billingDayOfMonth
        status
        mpSubscriptionId
        createdAt
        donor {
          email
        }
        project {
          name
        }
      }
      total
    }
  }
`;
