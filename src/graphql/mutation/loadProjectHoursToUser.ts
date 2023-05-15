import {gql} from '@apollo/client';

export const LOAD_PROJECT_HOURS_TO_USER = gql`
  mutation ($projectId: Int!, $userId: Int!, $hours: Int!) {
    loadProjectHours(projectId: $projectId, userId: $userId, hours: $hours) {
      projectId
      userId
      hours
    }
  }
`;
