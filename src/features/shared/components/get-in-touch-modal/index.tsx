import useAsync from '@/lib/hooks/useAsync';
import {capitalizeTheFirstLetterOfEachWord} from '@/lib/utils/ui-helper';
import {TextareaAutosize, TextField, Typography} from '@mui/material';
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
      toast.success('Thank you for your message!');
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
    <div className={styles.getInTouchModal}>
      <Typography className={styles.title}>Get in touch today</Typography>
      <Typography className={styles.subtitle}>
        We&apos;d love to hear from you! Get in touch to find out how you can support our cause and help make
        a positive impact.
      </Typography>
      <form onSubmit={handleSubmit(sendGetInTouch.execute)} className={styles.formContainer}>
        <div>
          <TextField
            id='name'
            name='name'
            label='Name'
            variant='standard'
            value={watch().name}
            onChange={handleChange}
          />
          <TextField
            id='email'
            name='email'
            label='Email'
            variant='standard'
            value={watch().email}
            onChange={handleChange}
          />
        </div>
        <div>
          <TextField
            id='phone'
            name='phone'
            label='Phone'
            variant='standard'
            value={watch().phone}
            onChange={handleChange}
          />
          <TextField
            id='company'
            name='company'
            label='Company'
            variant='standard'
            value={watch().company}
            onChange={handleChange}
          />
        </div>
        <div>
          <TextareaAutosize
            id='message'
            name='message'
            placeholder='Leave us a message...'
            value={watch().message}
            onChange={handleChange}
            className={styles.messageTextArea}
          />
        </div>
        <PrimaryButton type='submit' auxClassNames={styles.submitButton}>
          Send Message
        </PrimaryButton>
      </form>
    </div>
  );
}
