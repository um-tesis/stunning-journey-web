import {gql} from '@apollo/client';

export const GET_IN_TOUCH = gql`
  mutation ($input: ContactDto!) {
    postContactForm(contactInput: $input)
  }
`;
