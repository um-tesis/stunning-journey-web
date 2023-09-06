import useAsync from '@/lib/hooks/useAsync';
import {capitalizeTheFirstLetterOfEachWord} from '@/lib/utils/ui-helper';
import {Box, Grid, TextareaAutosize, TextField, Typography, useMediaQuery} from '@mui/material';
import {useTheme} from '@mui/material/styles';
import {useEffect} from 'react';
import {useForm} from 'react-hook-form';
import {toast} from 'react-hot-toast';
import PrimaryButton from '../primary-button';
import {useMutation} from '@apollo/client';

import styles from './styles.module.scss';
import {GET_IN_TOUCH} from '@/graphql/mutation/getInTouch';

type Props = {};

type GetInTouchForm = {
  name: string;
  email: string;
  phone: string;
  company: string;
  message: string;
};

export default function GetInTouchModal({}: Props) {
  const [postContactForm, {}] = useMutation(GET_IN_TOUCH);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));

  const emptyForm: GetInTouchForm = {
    name: '',
    email: '',
    phone: '',
    company: '',
    message: '',
  };

  const form = useForm<GetInTouchForm>({
    defaultValues: emptyForm,
  });

  const sendGetInTouch = useAsync(async () => {
    const formValues = form.getValues();
    form.setValue('name', capitalizeTheFirstLetterOfEachWord(formValues.name));
    await postContactForm({
      variables: {
        input: {
          name: formValues.name,
          email: formValues.email,
          phone: formValues.phone,
          company: formValues.company,
          message: formValues.message,
        },
      },
    });
  }, false);

  const {handleSubmit, watch} = form;

  // Effect to handle sendGetInTouch request status
  useEffect(() => {
    if (sendGetInTouch.status === 'success') {
      form.reset(emptyForm);
      toast.success('Gracias por su mensaje!');
    }
    if (sendGetInTouch.status === 'error') {
      toast.error(sendGetInTouch.error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sendGetInTouch.status]);

  function handleChange(event: any) {
    const {value, name} = event.target;

    form.setValue(name, value);
    form.clearErrors([name]);
  }

  return (
    <Box
      className={styles.getInTouchModal}
      p={isSmallScreen ? 3 : 8}
      sx={{
        width: isSmallScreen ? '100%' : '850px',
        borderRadius: isSmallScreen ? 0 : 10,
        position: isSmallScreen ? 'relative' : 'absolute',
        // top: isSmallScreen ? 0 : 10,
        transform: isSmallScreen ? 'none' : 'translateY(-50%)',
        top: '50%',
        right: isSmallScreen ? 0 : 50,
      }}
    >
      <Typography className={styles.title}>Póngase en contacto hoy mismo</Typography>
      <Typography className={styles.subtitle}>
        Nos encantaría tener noticias suyas! Póngase en contacto con nosotros para saber cómo puede apoyar
        nuestra causa y ayudar a tener un impacto positivo.
      </Typography>
      <form onSubmit={handleSubmit(sendGetInTouch.execute)} className={styles.formContainer}>
        <Grid container spacing={3} rowSpacing={5}>
          <Grid item xs={12} sm={6}>
            <TextField
              id='name'
              name='name'
              label='Nombre'
              variant='outlined'
              fullWidth
              value={watch().name}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id='email'
              name='email'
              label='Correo electrónico'
              variant='outlined'
              fullWidth
              value={watch().email}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id='phone'
              name='phone'
              label='Teléfono'
              variant='outlined'
              fullWidth
              value={watch().phone}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id='company'
              name='company'
              label='Empresa'
              variant='outlined'
              fullWidth
              value={watch().company}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id='message'
              name='message'
              label='Mensaje'
              className={styles.messageTextArea}
              variant='outlined'
              placeholder='Déjanos un mensaje...'
              value={watch().message}
              onChange={handleChange}
              multiline
              rows={3}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <PrimaryButton type='submit'>Enviar mensaje</PrimaryButton>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
}
