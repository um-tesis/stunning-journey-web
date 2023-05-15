import {gql} from '@apollo/client';

export const CREATE_PROJECT = gql`
  mutation ($input: CreateProjectInput!) {
    createProject(createProjectInput: $input) {
      name
    }
  }
`;
