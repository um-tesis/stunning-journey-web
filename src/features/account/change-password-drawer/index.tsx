import {useForm} from 'react-hook-form';
import {useEffect} from 'react';
import FormInput from '@/features/shared/components/form-input';
import 'react-calendar/dist/Calendar.css';
import FormDrawer from '@/features/shared/components/form-drawer';
import {ChangePasswordInput} from '../types';
import useAsync from '@/lib/hooks/useAsync';
import {CHANGE_PASSWORD} from '@/graphql/mutation/changePassword';
import {useMutation} from '@apollo/client';
import {SUCCESSFUL_PASSWORD_CHANGE} from '@/lib/utils/api-messages-helper';
import {toast} from 'react-hot-toast';
import {Grid, TextField} from '@mui/material';

type Props = {
  onClose: () => void;
};

export default function ChangePasswordDrawer({onClose}: Props) {
  const [changeUserPassword, {}] = useMutation(CHANGE_PASSWORD);

  const emptyChangePassword: ChangePasswordInput = {
    oldPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  };

  const form = useForm<ChangePasswordInput>({
    defaultValues: emptyChangePassword,
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

  const changePasswordRequest = useAsync(async () => {
    const formValues = form.getValues();
    await changeUserPassword({
      variables: {
        data: {
          oldPassword: formValues.oldPassword,
          newPassword: formValues.newPassword,
        },
      },
    });
  }, false);

  const onSubmitForm = async () => {
    const formValues = form.getValues();
    if (formValues.newPassword !== formValues.confirmNewPassword) {
      form.setError('confirmNewPassword', {
        type: 'manual',
        message: 'La nueva contraseña y la confirmación de la nueva contraseña deben ser iguales.',
      });
      return;
    }

    await changePasswordRequest.execute();
  };

  // Effect to handle the change user password request status
  useEffect(() => {
    if (changePasswordRequest.status === 'success') {
      form.reset(emptyChangePassword);
      onClose();
      toast.success(SUCCESSFUL_PASSWORD_CHANGE);
    }
    if (changePasswordRequest.status === 'error') {
      toast.error(changePasswordRequest.error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [changePasswordRequest.status]);

  const isAddDisabled = () => {
    const formValues = form.getValues();
    const {oldPassword, newPassword, confirmNewPassword} = formValues;
    if (!oldPassword || !newPassword || !confirmNewPassword) return true;
    return false;
  };

  return (
    <FormDrawer
      isOpen={true}
      onCloseDrawer={onClose}
      canSubmit={!isAddDisabled()}
      onSubmit={onSubmitForm}
      title='Cambiar Contraseña'
      submitButtonText='Actualizar'
      description='Las contraseñas deben tener al menos 8 caracteres.'
    >
      <Grid container spacing={3} paddingY={5}>
        <Grid item xs={12}>
          <TextField
            name='oldPassword'
            label='Contraseña Actual*'
            variant='outlined'
            onChange={handleChange}
            value={watch().oldPassword}
            error={!!errors?.oldPassword}
            helperText={errors?.oldPassword?.message}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            name='newPassword'
            label='Nueva Contraseña*'
            variant='outlined'
            onChange={handleChange}
            value={watch().newPassword}
            error={!!errors?.newPassword}
            helperText={errors?.newPassword?.message}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            name='confirmNewPassword'
            label='Confirmar Nueva Contraseña*'
            variant='outlined'
            onChange={handleChange}
            value={watch().confirmNewPassword}
            error={!!errors?.confirmNewPassword}
            helperText={errors?.confirmNewPassword?.message}
            fullWidth
          />
        </Grid>
      </Grid>
    </FormDrawer>
  );
}
