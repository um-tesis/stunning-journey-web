import {Box, Container, Grid, Typography} from '@mui/material';
import OurWorkSteps from './our-work-steps';
import {steps} from './steps-helper';
import styles from './styles.module.scss';

export default function OurWork() {
  return (
    <>
      <Grid container mt={10}>
        <Grid item xs={12}>
          <Box display='flex' alignItems='center' flexDirection='column'>
            <Typography variant='overline' className={styles.overline}>
              Nuestro proceso
            </Typography>
            <Typography variant='h4' className={styles.title} gutterBottom>
              Empezar es tan fácil como 1, 2, 3
            </Typography>
            <Typography variant='subtitle2' className={styles.subtitle}>
              Únete a la revolución de las donaciones con Libera: Tres sencillos pasos para hacer la
              diferencia hoy mismo
            </Typography>
          </Box>
        </Grid>
      </Grid>
      <Container maxWidth='xl' sx={{mb: 5}}>
        <Grid container columnSpacing={10}>
          {steps.map((step, index) => (
            <Grid item key={index} xs={12} md={4}>
              <OurWorkSteps title={step.title} description={step.description} Icon={<step.icon />} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
}
