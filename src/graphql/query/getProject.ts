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
      photoGallery
      moneyEarned
      location
      video
      acceptsVolunteers
      mpPublicKey
      monthlyEarnedMoney
      fixedEarningsWithSubscriptions
      activeSubscriptionsNumber
      donatorsNumber
      volunteersNumber
      hoursVolunteered
      amountToPay
      organization {
        name
      }
    }
  }
`;
