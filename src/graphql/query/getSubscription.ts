import {gql} from '@apollo/client';

export const GET_SUBSCRIPTION = gql`
  query SubscriptionByMpId($mpSubscriptionId: String!) {
    subscriptionByMpId(mpSubscriptionId: $mpSubscriptionId) {
      status
      project {
        slug
      }
    }
  }
`;
