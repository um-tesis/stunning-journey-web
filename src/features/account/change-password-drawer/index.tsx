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
        message: 'New password and confirm new password must be the same.',
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
      title='Change Password'
      submitButtonText='Update'
      description='Passwords must be at least 8 characters long.'
    >
      <FormInput
        name='oldPassword'
        label='Old Password'
        handleChange={handleChange}
        value={watch().oldPassword}
        error={errors.oldPassword}
        type='password'
      />
      <FormInput
        name='newPassword'
        label='New Password'
        handleChange={handleChange}
        value={watch().newPassword}
        error={errors.newPassword}
        type='password'
      />
      <FormInput
        name='confirmNewPassword'
        label='Confirm New Password'
        handleChange={handleChange}
        value={watch().confirmNewPassword}
        error={errors.confirmNewPassword}
        type='password'
      />
    </FormDrawer>
  );
}
