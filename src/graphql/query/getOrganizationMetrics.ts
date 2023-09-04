import {gql} from '@apollo/client';

export const GET_ORGANIZATION_METRICS = gql`
  query organizationMetrics($organizationId: Int!) {
    organizationMetrics(organizationId: $organizationId) {
      totalEarnings
      totalDonations
      totalProjects
      totalVolunteers
      totalDonors
    }
  }
`;
