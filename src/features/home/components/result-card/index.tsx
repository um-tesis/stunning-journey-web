import {Typography} from '@mui/material';
import styles from './styles.module.scss';

type Props = {
  resultNumber: number;
  resultDescription: string;
  Icon: React.ReactNode;
};

export default function ResultCard({resultNumber, resultDescription, Icon}: Props) {
  return (
    <div className={styles.result}>
      {Icon}
      <Typography variant='h4' className={styles.resultDescription}>
        {resultDescription}
      </Typography>
      <Typography variant='h4' className={styles.resultNumber}>
        {resultNumber}
      </Typography>
    </div>
  );
}
