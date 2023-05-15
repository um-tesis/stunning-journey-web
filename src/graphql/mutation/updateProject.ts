import {gql} from '@apollo/client';

export const UPDATE_PROJECT = gql`
  mutation ($input: UpdateProjectInput!) {
    updateProject(updateProjectInput: $input) {
      name
    }
  }
`;
