import {Typography} from '@mui/material';
import Chip from '@mui/material/Chip';
import Image from 'next/image';
import styles from './styles.module.scss';
import VerifiedIcon from '@mui/icons-material/Verified';

export default function About() {
  return (
    <div className={styles.us}>
      <div className={styles.imageSection}>
        <Image src='/jjj.jpeg' width={640} height={640} alt='image' />
        <div className={styles.name}>
          <Chip label='José Pedro Algorta' variant='outlined' sx={{color: 'white'}} />
          <Chip label='Joaquín Fernandez' variant='outlined' sx={{color: 'white'}} />
          <Chip label='Juan Martín Staricco' variant='outlined' sx={{color: 'white'}} />
        </div>
      </div>

      <div className={styles.about}>
        <div className={styles.title}>
          <VerifiedIcon sx={{display: {xs: 'flex'}, mr: 1, color: 'white'}} color='primary' />
          <Typography
            variant='h5'
            noWrap
            component='a'
            href=''
            sx={{
              mr: 2,
              mt: -0.8,
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'white',
              textDecoration: 'none',
            }}
          >
            LIBERA
          </Typography>
        </div>

        <p className={styles.aboutSection}>
          At Libera, we believe in the power of generosity to change the world. Our platform is designed to
          make it easy and secure for donors to support charitable organizations that are making a real
          difference in people&apos;s lives.
        </p>
        <p className={styles.aboutSection}>
          We are a team of computer science students - Juan Martin Staricco, Joaquin Fernandez, and Jose Pedro
          Algorta - who are passionate about using technology to create positive social impact. We founded
          Libera to make it easier for people to give back to their communities and support causes they care
          about.
        </p>
        <p className={styles.aboutSection}>
          With Libera, donors can easily search for and donate to a wide range of charities and non-profits,
          knowing that their donations are going directly to support the causes they care about. Our platform
          also provides helpful tools and resources for organizations to manage their donations and connect
          with their supporters.
        </p>
        <p className={styles.aboutSection}>
          We are committed to creating a transparent and accountable platform, where donors and organizations
          can trust that their donations are making a real impact. Join us in our mission to unleash the power
          of generosity and make a difference in the world.
        </p>
      </div>
    </div>
  );
}
