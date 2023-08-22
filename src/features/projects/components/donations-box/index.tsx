import styles from './styles.module.scss';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import PrimaryButton from '@/features/shared/components/primary-button';

type Props = {};

export default function DonationsBox({}: Props) {
  return (
    <div className={styles.boxContainer}>
      <div className={styles.oneTimeDonation}>
        <Typography className={styles.donationTitle}>Donación Puntual</Typography>
        <Typography className={styles.donationIcon}>
          <AttachMoneyIcon />
        </Typography>
        <Typography className={styles.donationDescription}>
          Haga la diferencia hoy mismo! Contribuya con una donación única para apoyar nuestra causa y ayúdenos
          a crear un cambio positivo.
        </Typography>
        <PrimaryButton auxClassNames={styles.donationButton}>Donar</PrimaryButton>
      </div>
      <Divider orientation='vertical' variant='middle' flexItem />
      <div className={styles.recurrentDonation}>
        <Typography className={styles.donationTitle}>Donación Recurrente</Typography>
        <Typography className={styles.donationIcon}>
          <AttachMoneyIcon /> / mo.
        </Typography>
        <Typography className={styles.donationDescription}>
          Sea un catalizador del cambio! Únase a nuestra comunidad de donantes mensuales y consiga un impacto
          duradero con sus contribuciones periódicas.
        </Typography>
        <PrimaryButton auxClassNames={styles.donationButton}>Donar</PrimaryButton>
      </div>
    </div>
  );
}
