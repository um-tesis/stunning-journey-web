import {Grid, Typography} from '@mui/material';
import Chip from '@mui/material/Chip';
import Image from 'next/image';
import styles from './styles.module.scss';
import VerifiedIcon from '@mui/icons-material/Verified';

export default function About() {
  return (
    <Grid container spacing={2} className={styles.us}>
      <Grid item xs={12} md={6}>
        <div className={styles.imageSection}>
          <Image src='/jjj.jpeg' width={640} height={640} alt='image' />
        </div>
      </Grid>
      <Grid item xs={12} md={6}>
        <div className={styles.about}>
          <Grid container spacing={1} direction='row' sx={{mb: 6}} alignItems='center'>
            <Grid item>
              <VerifiedIcon fontSize='large' sx={{mr: 1, color: 'white'}} color='primary' />
            </Grid>
            <Grid item>
              <Typography
                variant='h4'
                noWrap
                sx={{
                  fontWeight: 700,
                  letterSpacing: '.3rem',
                  color: 'white',
                  textDecoration: 'none',
                }}
              >
                LIBERA
              </Typography>
            </Grid>
          </Grid>

          <Typography className={styles.aboutSection}>
            At Libera, we believe in the power of generosity to change the world. Our platform is designed to
            make it easy and secure for donors to support charitable organizations that are making a real
            difference in people&apos;s lives.
          </Typography>
          <Typography className={styles.aboutSection}>
            We are a team of computer science students - Juan Martin Staricco, Joaquin Fernandez, and Jose
            Pedro Algorta - who are passionate about using technology to create positive social impact. We
            founded Libera to make it easier for people to give back to their communities and support causes
            they care about.
          </Typography>
          <Typography className={styles.aboutSection}>
            With Libera, donors can easily search for and donate to a wide range of charities and non-profits,
            knowing that their donations are going directly to support the causes they care about. Our
            platform also provides helpful tools and resources for organizations to manage their donations and
            connect with their supporters.
          </Typography>
          <Typography className={styles.aboutSection}>
            We are committed to creating a transparent and accountable platform, where donors and
            organizations can trust that their donations are making a real impact. Join us in our mission to
            unleash the power of generosity and make a difference in the world.
          </Typography>
          <Grid container spacing={3} sx={{mt: 3}}>
            <Grid item>
              <Chip label='José Pedro Algorta' variant='outlined' sx={{color: 'white'}} />
            </Grid>
            <Grid item>
              <Chip label='Joaquín Fernandez' variant='outlined' sx={{color: 'white'}} />
            </Grid>
            <Grid item>
              <Chip label='Juan Martín Staricco' variant='outlined' sx={{color: 'white'}} />
            </Grid>
          </Grid>
        </div>
      </Grid>
    </Grid>
  );
}
