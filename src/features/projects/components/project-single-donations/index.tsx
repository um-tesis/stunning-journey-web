/* eslint-disable @next/next/no-img-element */
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import styles from './styles.module.scss';
import SingleDonationTable from '@/features/donations/single-donation-table';

type Props = {
  projectId: number;
};

export default function ProjectSingleDonations({projectId}: Props) {
  return (
    <Card className={styles.cardContainer}>
      <CardContent>
        <Grid container justifyContent='space-between' alignItems='center' spacing={2}>
          <Grid item xs={12} md={12}>
            <SingleDonationTable entityId={+projectId} isProjectData />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
