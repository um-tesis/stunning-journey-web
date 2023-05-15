import {gql} from '@apollo/client';

export const ASSIGN_VOLUNTEER_TO_PROJECT = gql`
  mutation ($projectId: Int!, $userId: Int!) {
    assignUserToProject(projectId: $projectId, userId: $userId) {
      projectId
      userId
    }
  }
`;
