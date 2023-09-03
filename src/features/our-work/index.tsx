import {Box, Grid, Typography} from '@mui/material';
import OurWorkSteps from './our-work-steps';
import {steps} from './steps-helper';
import styles from './styles.module.scss';

export default function OurWork() {
  return (
    <div className={styles.ourWork}>
      <Box display='flex' alignItems='center' flexDirection='column'>
        <Typography variant='overline' fontWeight='bold'>
          Acerca de nuestro proceso
        </Typography>
        <Typography variant='h4' fontWeight='bold' className={styles.title}>
          Empezar es tan fácil como 1, 2, 3
        </Typography>
        <Typography variant='subtitle2'>
          Únete a la revolución de las donaciones con Libera: Tres sencillos pasos para hacer la diferencia
          hoy mismo
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
