import {Box, Typography} from '@mui/material';
import styles from './styles.module.scss';

type Props = {
  result: string;
  resultDescription: string;
  Icon: React.ReactNode;
};

export default function ResultCard({result, resultDescription, Icon}: Props) {
  return (
    <Box className={styles.result} borderRadius={5}>
      {Icon}
      <Typography variant='h4' className={styles.resultDescription} gutterBottom>
        {resultDescription}
      </Typography>
      <Typography variant='h4' className={styles.resultNumber}>
        {result}
      </Typography>
    </Box>
  );
}
