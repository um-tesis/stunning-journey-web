import {gql} from '@apollo/client';

export const GET_PROJECT_VOLUNTEERS = gql`
  query volunteersByProjectId($projectId: Int!) {
    volunteersByProjectId(projectId: $projectId) {
      total
      volunteers {
        user {
          name
          email
          phone
        }
        hours
      }
    }
  }
`;
