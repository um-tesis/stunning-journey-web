import React, {useEffect, useState} from 'react';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import styles from './styles.module.scss';
import PrimaryButton from '@/features/shared/components/primary-button';
import {ArrowBack} from '@mui/icons-material';
import {useMutation} from '@apollo/client';
import {LOGIN} from '@/graphql/mutation/login';
import useAsync from '@/lib/hooks/useAsync';
import {useForm} from 'react-hook-form';
import {toast} from 'react-hot-toast';
import {logIn} from '../../service';
import {useRouter} from 'next/router';
import {GENERAL_SERVER_ERROR, SUCCESSFUL_LOGIN} from '@/lib/utils/api-messages-helper';
import {Box, IconButton, TextField, Typography} from '@mui/material';

type AuthForm = {
  email: string;
  password: string;
};

export default function SignInSide() {
  const [formResult, setFormResult] = useState({email: '', password: ''});
  const [loginForm, {}] = useMutation(LOGIN);
  const router = useRouter();

  const emptyForm: AuthForm = {
    email: '',
    password: '',
  };

  const form = useForm<AuthForm>({
    defaultValues: emptyForm,
  });

  const loginRequest = useAsync(async () => {
    const formValues = form.getValues();
    await loginForm({
      variables: {
        data: {
          email: formValues.email,
          password: formValues.password,
        },
      },
    });
  }, false);

  const {
    formState: {errors},
    watch,
  } = form;

  const handleCredentialsSubmit = async () => {
    const {email, password} = formResult;
    try {
      await logIn(email, password);
      router.replace('/home');
    } catch (e: any) {
      toast(e?.response?.data?.error || GENERAL_SERVER_ERROR);
    }
  };

  // Effect to handle login request request status
  useEffect(() => {
    if (loginRequest.status === 'success') {
      form.reset(emptyForm);
      toast.success(SUCCESSFUL_LOGIN);
    }
    if (loginRequest.status === 'error') {
      toast.error(loginRequest.error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loginRequest.status]);

  function handleChange(event: any) {
    const {value, name} = event.target;

    form.setValue(name, value);
    form.clearErrors([name]);
    setFormResult({...formResult, [name]: value});
  }

  const goToHome = () => {
    router.push('/');
  };

  return (
    <Grid container display='flex' alignItems='center' sx={{height: '100vh', minHeight: '100vh'}}>
      <Grid item md={7}>
        <Box component='div' className={styles.sideImageGrid} />
      </Grid>
      <Grid item xs={12} md={5} ml={{sm: 0, md: -10}} component={Paper} elevation={6} padding={7}>
        <Grid container spacing={7} justifyContent='space-between'>
          <Grid item alignSelf='center'>
            <IconButton>
              <ArrowBack fontSize='large' onClick={goToHome} />
            </IconButton>
          </Grid>
          <Grid item alignSelf='center'>
            <Avatar sx={{width: 96, height: 96}} src='/Logo-libera.png' />
          </Grid>
          <Grid xs={12} item alignSelf='center'>
            <Typography variant='h4' color='#575484'>
              Welcome to Libera
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <form onSubmit={handleCredentialsSubmit}>
              <Grid container spacing={5}>
                <Grid item xs={12}>
                  <TextField
                    name='email'
                    label='Email'
                    type='email'
                    value={watch().email}
                    onChange={handleChange}
                    error={!!errors.email}
                    helperText={errors.email?.message}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    name='password'
                    label='Password'
                    type='password'
                    value={watch().password}
                    onChange={handleChange}
                    error={!!errors.password}
                    helperText={errors.password?.message}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <PrimaryButton onClick={handleCredentialsSubmit}>Sign in</PrimaryButton>
                </Grid>
              </Grid>
            </form>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
