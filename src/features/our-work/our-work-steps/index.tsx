import {Box, Typography} from '@mui/material';
import styles from './styles.module.scss';

export type OurWorkStepsProps = {
  title: string;
  description: string;
  Icon: React.ReactNode;
};

export default function OurWorkSteps({title, description, Icon}: OurWorkStepsProps) {
  return (
    <Box display='flex' alignItems='center' flexDirection='column' gap={3} className={styles.steps}>
      <Box>{Icon}</Box>
      <Typography variant='h6' textAlign='center'>
        {title}
      </Typography>
      <Typography variant='body2'>{description}</Typography>
    </Box>
  );
}
