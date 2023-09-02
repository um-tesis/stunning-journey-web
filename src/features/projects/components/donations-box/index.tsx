import styles from './styles.module.scss';
import Typography from '@mui/material/Typography';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import PrimaryButton from '@/features/shared/components/primary-button';
import {CircularProgress, Grid, InputAdornment, Paper, TextField, TextFieldProps} from '@mui/material';
import theme from '@/assets/styles/theme';
import {useEffect, useMemo, useState} from 'react';
import {useMutation} from '@apollo/client';
import {CREATE_PREFERENCE} from '@/graphql/mutation/createPreference';
import {useForm} from 'react-hook-form';
import {toast} from 'react-hot-toast';
import {CREATE_PREAPPROVAL} from '@/graphql/mutation/createPreapproval';

type Props = {
  projectSlug: string;
};

export default function DonationsBox({projectSlug}: Props) {
  return (
    <Grid container paddingX={10} spacing={10} justifyContent='space-between'>
      <Grid item xs={12} lg={6}>
        <OneTimeDonation projectSlug={projectSlug} />
      </Grid>
      <Grid item xs={12} lg={6}>
        <RecurringDonation projectSlug={projectSlug} />
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

const OneTimeDonation: React.FC<Props> = ({projectSlug}) => {
  const [createPreference, {}] = useMutation(CREATE_PREFERENCE);
  const [loading, setLoading] = useState<boolean>(false);
  const donationParams = useMemo(() => ({amount: 100}), []);

  const {
    formState: {errors},
    register,
    handleSubmit,
    watch,
    setValue,
    clearErrors,
  } = useForm({
    defaultValues: donationParams,
  });

  const onSubmit = async (data: any) => {
    setLoading(true);
    const response = await createPreference({
      variables: {
        input: {
          amount: data.amount,
          projectSlug,
        },
      },
    });

    if (response.errors) {
      // @ts-ignore
      if (response.errors?.networkError)
        // @ts-ignore
        toast.error(response.errors?.networkError?.result?.errors[0].message);
      else toast.error(response.errors[0].message);
      setLoading(false);
      return;
    }

    window.location.href = response.data.createPreference.initPoint;
    setLoading(false);
  };

  const handleChange = (event: any) => {
    let {value, name} = event.target;

    clearErrors([name]);
    if (name === 'amount') value = parseInt(value || 0);
    setValue(name, value);
  };

  useEffect(() => {
    register('amount', {required: 'Este campo es requerido', min: {value: 10, message: 'El mínimo es 10'}});
  }, [register]);

  return (
    <Paper elevation={6} sx={{borderRadius: '3em'}}>
      <form>
        <Grid container padding={5} spacing={3} justifyContent='center' alignItems='center'>
          <Grid item xs={12} className={styles.donationTitle}>
            <Typography variant='h5'>Donación</Typography>
          </Grid>
          <Grid item xs={3} md={4} />
          <Grid item xs={6} md={4}>
            <DonationsTextField
              name='amount'
              type='number'
              value={watch().amount}
              onChange={handleChange}
              error={!!errors.amount}
              helperText={errors.amount?.message || ' '}
            />
          </Grid>
          <Grid item xs={3} md={4} />

          <Grid item xs={12}>
            <Typography variant='body2' className={styles.donationDescription}>
              Haga la diferencia hoy mismo! Contribuya con una donación única para apoyar nuestra causa y
              ayúdenos a crear un cambio positivo.
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <PrimaryButton auxClassNames={styles.donationButton} onClick={handleSubmit(onSubmit)}>
              {loading ? <CircularProgress size={24} /> : 'Donar'}
            </PrimaryButton>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

const RecurringDonation: React.FC<Props> = ({projectSlug}) => {
  const [createPreapproval, {}] = useMutation(CREATE_PREAPPROVAL, {errorPolicy: 'all', onError: (e) => e});
  const [loading, setLoading] = useState<boolean>(false);
  const donationParams = useMemo(() => ({amount: 100, payerEmail: ''}), []);

  const {
    formState: {errors},
    register,
    handleSubmit,
    watch,
    setValue,
    clearErrors,
  } = useForm({
    defaultValues: donationParams,
  });

  const onSubmit = async (data: any) => {
    setLoading(true);
    const response = await createPreapproval({
      variables: {
        input: {
          amount: data.amount,
          payerEmail: data.payerEmail,
          projectSlug,
        },
      },
    });

    if (response.errors) {
      // @ts-ignore
      if (response.errors?.networkError)
        // @ts-ignore
        toast.error(response.errors?.networkError?.result?.errors[0].message);
      else toast.error(response.errors[0].message);
      setLoading(false);
      return;
    }

    window.location.href = response.data.createPreapproval.initPoint;
    setLoading(false);
  };

  const handleChange = (event: any) => {
    let {value, name} = event.target;

    clearErrors([name]);

    if (name === 'amount') value = parseInt(value || 0);
    setValue(name, value);
  };

  useEffect(() => {
    register('amount', {required: 'Este campo es requerido', min: {value: 10, message: 'El mínimo es 10'}});
    register('payerEmail', {
      required: 'Este campo es requerido',
      pattern: {value: /\S+@\S+\.\S+/, message: 'Email inválido'},
    });
  }, [register]);

  return (
    <Paper elevation={6} sx={{borderRadius: '3em'}}>
      <form>
        <Grid container padding={5} spacing={3} justifyContent='center' alignItems='center'>
          <Grid item xs={12} className={styles.donationTitle}>
            <Typography variant='h5'>Suscripción</Typography>
          </Grid>
          <Grid item xs={6} md={4}>
            <DonationsTextField
              name='amount'
              type='number'
              value={watch().amount}
              onChange={handleChange}
              error={!!errors.amount}
              helperText='/ mes'
            />
          </Grid>
          <Grid item xs={12} md={8}>
            <TextField
              name='payerEmail'
              type='email'
              value={watch().payerEmail}
              onChange={handleChange}
              fullWidth
              variant='standard'
              label='Correo electrónico'
              error={!!errors.payerEmail}
              helperText={errors.payerEmail?.message || ' '}
              sx={{
                input: {
                  color: theme.palette.primary.main,
                  fontSize: '1.5em',
                },
              }}
            />
          </Grid>

          <Grid item xs={12}>
            <Typography variant='body2' className={styles.donationDescription}>
              Sea un catalizador del cambio! Únase a nuestra comunidad de donantes mensuales y consiga un
              impacto duradero con sus contribuciones periódicas.
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <PrimaryButton auxClassNames={styles.donationButton} onClick={handleSubmit(onSubmit)}>
              {loading ? <CircularProgress size={24} /> : 'Donar'}
            </PrimaryButton>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};
