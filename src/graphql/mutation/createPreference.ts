import {gql} from '@apollo/client';

export const CREATE_PREFERENCE = gql`
  mutation ($input: CreatePreferenceInput!) {
    createPreference(createPreferenceInput: $input) {
      id
      initPoint
      externalReference
    }
  }
`;
