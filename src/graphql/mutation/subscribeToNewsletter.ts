import {gql} from '@apollo/client';

export const SUBSCRIBE_TO_NEWSLETTER = gql`
  mutation ($email: String!) {
    subscribeToNewsletter(email: $email)
  }
`;
