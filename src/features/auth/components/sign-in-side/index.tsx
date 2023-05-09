import React, {useEffect, useState} from 'react';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import {createTheme, ThemeProvider} from '@mui/material/styles';
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
import FormInput from '@/features/shared/components/form-input';

type AuthForm = {
  email: string;
  password: string;
};

const theme = createTheme();

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
        input: {
          email: formValues.email,
          password: formValues.password,
        },
      },
    });
  }, false);

  const {watch} = form;

  const handleCredentialsSubmit = async () => {
    const {email, password} = formResult;
    const res = await logIn(email, password);
    if (res.status === 200) {
      router.push('/home');
    } else {
      toast(GENERAL_SERVER_ERROR);
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

  return (
    <ThemeProvider theme={theme}>
      <Grid container component='main' sx={{height: '100vh', minHeight: '100vh'}}>
        <CssBaseline />
        <Grid item xs={false} sm={4} md={7} className={styles.sideImageGrid} />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box my={8} mx={4} className={styles.form}>
            <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
              <ArrowBack fontSize={'medium'} />
            </Avatar>
            <Typography component='h1' variant='h5' className={styles.title}>
              Libera
            </Typography>
            <form className={styles.form}>
              <FormInput
                name='email'
                label='Email'
                value={watch().email}
                handleChange={handleChange}
                className={styles.input}
              />
              <FormInput
                name='password'
                label='Password'
                type='password'
                value={watch().password}
                handleChange={handleChange}
                className={styles.input}
              />
              <PrimaryButton onClick={handleCredentialsSubmit} fullWidth auxClassNames={styles.submitButton}>
                Sign in
              </PrimaryButton>
            </form>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
