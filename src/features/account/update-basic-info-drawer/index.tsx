import {useForm} from 'react-hook-form';
import {useEffect} from 'react';
import FormDrawer from '@/features/shared/components/form-drawer';
import {UserBasicInfo} from '../types';
import {UserData} from '@/features/shared/types';
import {useMutation} from '@apollo/client';
import {UPDATE_USER_BASIC_INFO} from '@/graphql/mutation/updateUserBasicInfo';
import useAsync from '@/lib/hooks/useAsync';
import {toast} from 'react-hot-toast';
import {SUCCESSFUL_USER_UPDATE} from '@/lib/utils/api-messages-helper';
import {useRouter} from 'next/router';
import {Grid, TextField} from '@mui/material';

type Props = {
  onClose: () => void;
  user: UserData;
  setUser: (user: UserData) => void;
};

export default function UpdateBasicInfoDrawer({onClose, user, setUser}: Props) {
  const router = useRouter();
  const [updateUserInfo, {}] = useMutation(UPDATE_USER_BASIC_INFO);

  const emptyBasicInfo: UserBasicInfo = {
    id: user.id,
    name: user.name,
    email: user.email,
    phone: user.phone,
  };

  const form = useForm<UserBasicInfo>({
    defaultValues: emptyBasicInfo,
  });

  const {
    formState: {errors},
    watch,
  } = form;

  const handleChange = (event: any) => {
    let {value, name} = event.target;

    form.clearErrors([name]);
    form.setValue(name, value);
  };

  useEffect(() => {
    form.reset();
  }, [form]);

  const updateUserRequest = useAsync(async () => {
    const formValues = form.getValues();
    const updatedUserRes = await updateUserInfo({
      variables: {
        updateUserInput: {
          id: +formValues.id,
          name: formValues.name,
          email: formValues.email,
          phone: formValues.phone,
        },
      },
    });

    const updatedUser = updatedUserRes.data.updateUser;

    setUser(updatedUser);

    await fetch('/api/updateSession', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({user: updatedUser}),
    });
  }, false);

  const onSubmitForm = async () => {
    await updateUserRequest.execute();
  };

  // Effect to handle the update user request status
  useEffect(() => {
    if (updateUserRequest.status === 'success') {
      form.reset(emptyBasicInfo);
      onClose();
      toast.success(SUCCESSFUL_USER_UPDATE);
    }
    if (updateUserRequest.status === 'error') {
      toast.error(updateUserRequest.error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateUserRequest.status]);

  const isAddDisabled = () => {
    const formValues = form.getValues();
    const {name, email, phone} = formValues;
    if (!name || !email) return true;
    if (name === user.name && email === user.email && phone === user.phone) return true;
    return false;
  };

  return (
    <FormDrawer
      isOpen={true}
      onCloseDrawer={onClose}
      canSubmit={!isAddDisabled()}
      onSubmit={onSubmitForm}
      title='Información Básica'
      submitButtonText='Actualizar'
      description='Actualiza la información de su cuenta.'
    >
      <Grid container spacing={3} paddingY={5}>
        <Grid item xs={12}>
          <TextField
            name='name'
            label='Nombre'
            variant='outlined'
            fullWidth
            onChange={handleChange}
            value={watch().name}
            error={!!errors.name}
            helperText={errors?.name?.message}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            name='email'
            label='Correo Electrónico'
            variant='outlined'
            fullWidth
            onChange={handleChange}
            value={watch().email}
            error={!!errors.email}
            helperText={errors?.email?.message}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            name='phone'
            label='Teléfono'
            variant='outlined'
            type='number'
            fullWidth
            onChange={handleChange}
            value={watch().phone}
            error={!!errors.phone}
            helperText={errors?.phone?.message}
          />
        </Grid>
      </Grid>
    </FormDrawer>
  );
}
