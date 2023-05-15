import {classNamesFilter} from '@/lib/utils/ui-helper';
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
        <Typography className={styles.donationTitle}>One Time Donation</Typography>
        <Typography className={styles.donationIcon}>
          <AttachMoneyIcon />
        </Typography>
        <Typography className={styles.donationDescription}>
          Make a difference today! Contribute a one-time donation to support our cause and help us create
          positive change.
        </Typography>
        <PrimaryButton auxClassNames={styles.donationButton}>Donate</PrimaryButton>
      </div>
      <Divider orientation='vertical' variant='middle' flexItem />
      <div className={styles.recurrentDonation}>
        <Typography className={styles.donationTitle}>Recurrent Monthly Donation</Typography>
        <Typography className={styles.donationIcon}>
          <AttachMoneyIcon /> / mo.
        </Typography>
        <Typography className={styles.donationDescription}>
          Be a catalyst for change! Join our community of monthly donors and make a lasting impact with your
          regular contributions.
        </Typography>
        <PrimaryButton auxClassNames={styles.donationButton}>Donate</PrimaryButton>
      </div>
    </div>
  );
}
