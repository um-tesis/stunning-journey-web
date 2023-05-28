import {Box, Grid, Typography} from '@mui/material';
import OurWorkSteps from './our-work-steps';
import {steps} from './steps-helper';
import styles from './styles.module.scss';

export default function OurWork() {
  return (
    <div className={styles.ourWork}>
      <Box display='flex' alignItems='center' flexDirection='column'>
        <Typography variant='overline' fontWeight='bold'>
          About our process
        </Typography>
        <Typography variant='h4' fontWeight='bold'>
          Get started as easy as 1, 2, 3
        </Typography>
        <Typography variant='subtitle2'>
          Join the Giving Revolution with Libera: Three Simple Steps to Make a Difference Today
        </Typography>
      </Box>
      <Grid container columnSpacing={10} marginY={7}>
        {steps.map((step, index) => (
          <Grid item key={index} xs={12} sm={4}>
            <OurWorkSteps title={step.title} description={step.description} Icon={<step.icon />} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
