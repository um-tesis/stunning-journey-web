import {gql} from '@apollo/client';

export const GET_PROJECT = gql`
  query project($slug: String!) {
    projectBySlug(slug: $slug) {
      slug
      organizationId
      name
      description
      field
      startDate
      coverPhoto
      acceptsVolunteers
      mpPublicKey
      organization {
        name
      }
    }
  }
`;
