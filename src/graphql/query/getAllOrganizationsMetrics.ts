import {gql} from '@apollo/client';

export const GET_ALL_ORGANIZATIONS_METRICS = gql`
  query organizationMetrics {
    allOrganizationsMetrics {
      totalEarnings
      totalDonations
      totalProjects
      totalVolunteers
      totalDonors
    }
  }
`;
