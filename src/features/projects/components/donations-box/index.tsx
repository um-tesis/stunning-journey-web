import {classNamesFilter} from '@/lib/utils/ui-helper';
import styles from './styles.module.scss';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import PrimaryButton from '@/features/shared/components/primary-button';
import {
  Box,
  FormControl,
  Grid,
  Input,
  InputAdornment,
  InputBase,
  InputLabel,
  OutlinedInput,
  Paper,
  TextField,
  TextFieldProps,
} from '@mui/material';
import theme from '@/assets/styles/theme';

type Props = {};

export default function DonationsBox({}: Props) {
  return (
    <Grid container paddingX={10} spacing={3}>
      <Grid item xs={12} lg={6} component={Paper} elevation={6} sx={{borderRadius: '3em'}}>
        <Grid container padding={5} spacing={3} justifyContent='center' alignItems='center'>
          <Grid item xs={12} className={styles.donationTitle}>
            <Typography variant='h5'>One Time Donation</Typography>
          </Grid>
          <Grid item xs={4} />
          <Grid item xs={4}>
            <DonationsTextField helperText=' ' />
          </Grid>
          <Grid item xs={4} />

          <Grid item xs={12}>
            <Typography variant='body2' className={styles.donationDescription}>
              Make a difference today! Contribute a one-time donation to support our cause and help us create
              positive change.
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <PrimaryButton auxClassNames={styles.donationButton}>Donate</PrimaryButton>
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={12} lg={6}>
        <Paper elevation={6} sx={{borderRadius: '3em'}}>
          <Grid container padding={5} spacing={3} justifyContent='center' alignItems='center'>
            <Grid item xs={12} className={styles.donationTitle}>
              <Typography variant='h5'>Recurrent Monthly Donation</Typography>
            </Grid>
            <Grid item xs={4} />
            <Grid item xs={4}>
              <DonationsTextField helperText='/ mo' />
            </Grid>
            <Grid item xs={4} />

            <Grid item xs={12}>
              <Typography variant='body2' className={styles.donationDescription}>
                Be a catalyst for change! Join our community of monthly donors and make a lasting impact with
                your regular contributions.
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <PrimaryButton auxClassNames={styles.donationButton}>Donate</PrimaryButton>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
}

const DonationsTextField: React.FC<TextFieldProps> = (props) => (
  <TextField
    variant='standard'
    sx={{
      input: {
        color: theme.palette.primary.main,
        textAlign: 'center',
        fontSize: '2em',
      },
    }}
    InputProps={{
      startAdornment: (
        <InputAdornment position='start' sx={{color: (theme) => theme.palette.primary.main}}>
          <AttachMoneyIcon />
        </InputAdornment>
      ),
    }}
    {...props}
  />
);
