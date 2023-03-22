import Container from '@mui/material/Container';
import styles from './styles.module.scss';
import {TextField} from '@mui/material';
import PrimaryButton from '../primary-button';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import YouTubeIcon from '@mui/icons-material/YouTube';

function Footer() {
  return (
    <Container maxWidth='lg' className={styles.footer}>
      <div className={styles.title}>Receive the latest updates!</div>
      <div className={styles.subtitle}>
        Lorem ipsum dolor sit amet consectetur adipiscing elit phasellus amet dui quam vitae quis leo.
      </div>
      <div className={styles.subscription}>
        <TextField id='email' name='email' label='Email' variant='standard' />
        <PrimaryButton>Subscribe</PrimaryButton>
      </div>
      <div className={styles.socials}>
        <FacebookIcon color='primary' />
        <TwitterIcon color='primary' />
        <InstagramIcon color='primary' />
        <LinkedInIcon color='primary' />
        <YouTubeIcon color='primary' />
      </div>
      <hr />
      <div className={styles.copyright}>Copyright © 2023 | All Rights Reserved</div>
    </Container>
  );
}
export default Footer;
