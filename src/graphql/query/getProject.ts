import {gql} from '@apollo/client';

export const GET_PROJECT = gql`
  query project($slug: String!) {
    projectBySlug(slug: $slug) {
      id
      slug
      organizationId
      name
      description
      field
      startDate
      coverPhoto
      moneyEarned
      location
      video
      acceptsVolunteers
      monthlyEarnedMoney
      activeSubscriptionsNumber
      donatorsNumber
      volunteersNumber
      hoursVolunteered
      organization {
        name
      }
    }
  }
`;
