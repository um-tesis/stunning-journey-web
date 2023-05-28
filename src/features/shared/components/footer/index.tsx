import Container from '@mui/material/Container';
import styles from './styles.module.scss';
import {TextField, Typography, Divider} from '@mui/material';
import PrimaryButton from '../primary-button';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import YouTubeIcon from '@mui/icons-material/YouTube';
import {useState, useEffect} from 'react';
import {useMutation} from '@apollo/client';
import {SUBSCRIBE_TO_NEWSLETTER} from '@/graphql/mutation/subscribeToNewsletter';
import useAsync from '@/lib/hooks/useAsync';
import {toast} from 'react-hot-toast';
import {SUCCESSFUL_NEWSLETTER_SUBSCRIPTION} from '@/lib/utils/api-messages-helper';

function Footer() {
  const [email, setEmail] = useState('');
  const [subscribeToNewsletter, {}] = useMutation(SUBSCRIBE_TO_NEWSLETTER);

  const subscribeRequest = useAsync(async () => {
    await subscribeToNewsletter({
      variables: {
        email,
      },
    });
  }, false);

  // Effect to handle subscribe request request status
  useEffect(() => {
    if (subscribeRequest.status === 'success') {
      toast.success(SUCCESSFUL_NEWSLETTER_SUBSCRIPTION);
      setEmail('');
    }
    if (subscribeRequest.status === 'error') {
      toast.error(subscribeRequest.error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subscribeRequest.status]);

  return (
    <Container maxWidth='lg' className={styles.footer}>
      <Typography variant='h5' className={styles.title}>
        Receive the latest updates!
      </Typography>
      <Typography variant='subtitle2' className={styles.subtitle}>
        Lorem ipsum dolor sit amet consectetur adipiscing elit phasellus amet dui quam vitae quis leo.
      </Typography>
      <div className={styles.subscription}>
        <TextField
          id='email'
          name='email'
          label='Email'
          variant='standard'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <PrimaryButton
          onClick={() => {
            subscribeRequest.execute();
          }}
        >
          Subscribe
        </PrimaryButton>
      </div>
      <div className={styles.socials}>
        <FacebookIcon color='primary' />
        <TwitterIcon color='primary' />
        <InstagramIcon color='primary' />
        <LinkedInIcon color='primary' />
        <YouTubeIcon color='primary' />
      </div>
      <Divider flexItem />
      <Typography variant='body1' className={styles.copyright}>
        Copyright © 2023 | All Rights Reserved
      </Typography>
    </Container>
  );
}
export default Footer;
