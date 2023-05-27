import {CardContent, Grid, Typography} from '@mui/material';
import styles from './styles.module.scss';
import {useRouter} from 'next/router';
import Card from '@mui/material/Card';

const cards = [
  {
    title: 'Donators',
    linkTo: '/donators',
    image: '/tacu2.jpeg',
  },

  {
    title: 'Our Projects',
    linkTo: '/our-projects',
    image: '/collaboration.jpeg',
  },
  {
    title: 'Donations',
    linkTo: '/donators',
    image: '/help.jpeg',
  },
];

export default function OrganizationManagementCards() {
  const router = useRouter();

  return (
    <div className={styles.managementContainer}>
      <Typography variant='h4' className={styles.title}>
        Organization Management
      </Typography>
      <Typography variant='body1' className={styles.subtitle}>
        This management page is specially designed to provide you with quick access to the principal aspects
        of our nonprofit operations. Here, you can access all the critical links and tools to efficiently
        manage your organization.
      </Typography>

      <Grid container spacing={3}>
        {cards.map((card, i) => (
          <Grid item xs={12} sm={6} md={4} key={i}>
            <Card
              className={styles.root}
              sx={{
                background: `url("${card.image}") center / cover no-repeat`,
              }}
            >
              <CardContent className={styles.content}>
                <Typography
                  variant='h5'
                  component='h2'
                  onClick={() => router.push(card.linkTo)}
                  className={styles.text}
                >
                  {card.title}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
