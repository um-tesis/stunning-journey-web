import {classNamesFilter} from '@/lib/utils/ui-helper';
import {TextareaAutosize, TextField, Typography} from '@mui/material';
import PrimaryButton from '../primary-button';

import styles from './styles.module.scss';

type Props = {};

export default function GetInTouchModal({}: Props) {
  return (
    <div className={styles.getInTouchModal}>
      <Typography className={styles.title}>Get in touch today</Typography>
      <Typography className={styles.subtitle}>
        Lorem ipsum dolor sit amet consectetur adipiscing elit tortor eu dolorol egestas morbi sem vulputate
        etiam facilisis pellentesque ut quis.
      </Typography>
      <div className={styles.formContainer}>
        <div>
          <TextField id='standard-basic' label='Standard' variant='standard' />
          <TextField id='standard-basic' label='Standard' variant='standard' />
        </div>
        <div>
          <TextField id='standard-basic' label='Standard' variant='standard' />
          <TextField id='standard-basic' label='Standard' variant='standard' />
        </div>
        <div>
          <TextareaAutosize placeholder='Write here...' />
        </div>
      </div>
      <PrimaryButton onClick={() => {}} auxClassNames={styles.submitButton}>
        Send Message
      </PrimaryButton>
    </div>
  );
}
