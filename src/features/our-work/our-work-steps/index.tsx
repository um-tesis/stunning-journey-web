import {Box, Grid, Typography} from '@mui/material';
import styles from './styles.module.scss';

export type OurWorkStepsProps = {
  title: string;
  description: string;
  Icon: React.ReactNode;
};

export default function OurWorkSteps({title, description, Icon}: OurWorkStepsProps) {
  return (
    <Grid container justifyContent='center' alignItems='stretch'>
      <Grid item>
        <Box p={8} className={styles.stepIcon}>
          {Icon}
        </Box>
      </Grid>
      <Grid item xs={12} minHeight={90}>
        <Typography variant='h6' className={styles.stepTitle} gutterBottom>
          {title}
        </Typography>
      </Grid>
      <Grid item>
        <Typography variant='body2' className={styles.stepSubtitle}>
          {description}
        </Typography>
      </Grid>
    </Grid>
  );
}
