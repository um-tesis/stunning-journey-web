import {Box, CardActionArea, CardContent, Container, Grid, Typography} from '@mui/material';
import styles from './styles.module.scss';
import {useRouter} from 'next/router';
import Card from '@mui/material/Card';

const cards = [
  {
    title: 'Miembros',
    linkTo: '/team-members',
    image: '/don1.jpeg',
  },

  {
    title: 'Mis Proyectos',
    linkTo: '/our-projects',
    image: '/v3.jpeg',
  },
  {
    title: 'Donaciones',
    linkTo: '/donations',
    image: '/don3.jpeg',
  },
];

export default function OrganizationManagementCards() {
  const router = useRouter();

  return (
    <Container maxWidth='xl' className={styles.managementContainer}>
      <Box mt={10} mb={5} display='flex' alignItems='center' flexDirection='column'>
        <Typography variant='h4' className={styles.title} gutterBottom>
          Gestión de su organización
        </Typography>
        <Box maxWidth='60%'>
          <Typography variant='body1' className={styles.subtitle}>
            Esta página ofrece acceso directo a lo esencial de nuestra operación sin fines de lucro,
            incluyendo herramientas y métricas para gestionar tu organización.
          </Typography>
        </Box>
      </Box>
      <Grid container spacing={3} mb={10}>
        {cards.map((card, i) => (
          <Grid item xs={12} sm={6} md={4} key={i}>
            <Card
              onClick={() => router.push(card.linkTo)}
              className={styles.root}
              sx={{
                background: `url("${card.image}") center / cover no-repeat`,
              }}
            >
              <CardActionArea>
                <CardContent className={styles.content}>
                  <Typography variant='h5' component='h2' className={styles.text} color='white'>
                    {card.title}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
