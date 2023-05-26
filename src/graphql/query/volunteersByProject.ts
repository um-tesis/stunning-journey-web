import {gql} from '@apollo/client';

export const GET_PROJECT_VOLUNTEERS = gql`
  query volunteersByProjectId($projectId: Int!) {
    volunteersByProjectId(projectId: $projectId) {
      volunteers {
        user {
          id
          name
          email
          phone
        }
        hours
      }
      total
    }
  }
`;
