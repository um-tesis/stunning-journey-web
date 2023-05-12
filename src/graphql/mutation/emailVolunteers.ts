import {gql} from '@apollo/client';

export const EMAIL_VOLUNTEERS = gql`
  mutation ($input: EmailVolunteers!) {
    emailVolunteers(emailVolunteersInput: $input)
  }
`;
