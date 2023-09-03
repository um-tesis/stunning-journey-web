import {Box, CardActionArea, CardContent, Grid, Typography} from '@mui/material';
import styles from './styles.module.scss';
import {useRouter} from 'next/router';
import Card from '@mui/material/Card';

const cards = [
  {
    title: 'Donantes',
    linkTo: '/donors',
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
    <Box className={styles.managementContainer}>
      <Typography variant='h4' className={styles.title}>
        Gestión de su organización
      </Typography>
      <Typography variant='body1' className={styles.subtitle}>
        Esta página está especialmente diseñada para ofrecerle un acceso rápido a los principales aspectos de
        nuestras operaciones sin fines de lucro. Aquí podrá acceder a todos los enlaces y herramientas
        esenciales para gestionar eficazmente su organización asi como a métricas de la misma
      </Typography>

      <Grid container spacing={3}>
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
    </Box>
  );
}
