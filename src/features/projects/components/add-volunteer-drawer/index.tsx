import {useForm} from 'react-hook-form';
import {useEffect} from 'react';
import FormInput from '@/features/shared/components/form-input';
import 'react-calendar/dist/Calendar.css';
import useAsync from '@/lib/hooks/useAsync';
import {useMutation} from '@apollo/client';
import {toast} from 'react-hot-toast';
import FormDrawer from '@/features/shared/components/form-drawer';
import {SUCCESSFUL_NEW_VOLUNTEER} from '@/lib/utils/api-messages-helper';
import {UserDataIn} from '../../../shared/types';
import {SYSTEM_ROLES} from '@/lib/utils/constants';
import {CREATE_USER} from '@/graphql/mutation/createUser';
import {ASSIGN_VOLUNTEER_TO_PROJECT} from '@/graphql/mutation/assignVolunteerToProject';

type Props = {
  onClose: () => void;
  projectId: number;
  organizationId: number;
};

export default function AddVolunteerDrawer({onClose, projectId, organizationId}: Props) {
  const [addVolunteer, {}] = useMutation(CREATE_USER);
  const [assignVolunteerToProject, {}] = useMutation(ASSIGN_VOLUNTEER_TO_PROJECT);

  const emptyVolunteer: UserDataIn = {
    organizationId,
    name: '',
    email: '',
    phone: '',
    role: SYSTEM_ROLES.USER,
    password: 'password',
  };
  const form = useForm<UserDataIn>({
    defaultValues: emptyVolunteer,
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

  const addVolunteerRequest = useAsync(async () => {
    const formValues = form.getValues();
    const res = await addVolunteer({
      variables: {
        input: {
          name: formValues.name,
          email: formValues.email,
          phone: formValues.phone,
          role: formValues.role,
          password: formValues.password,
        },
      },
    });

    await assignVolunteerToProject({
      variables: {
        projectId,
        userId: res.data.createUser.id,
      },
    });

    // we still need to assign the volunteer to the project
  }, false);

  const onSubmitVolunteer = async () => {
    await addVolunteerRequest.execute();
  };

  // Effect to handle login request request status
  useEffect(() => {
    if (addVolunteerRequest.status === 'success') {
      form.reset(emptyVolunteer);
      onClose();
      toast.success(SUCCESSFUL_NEW_VOLUNTEER);
    }
    if (addVolunteerRequest.status === 'error') {
      toast.error(addVolunteerRequest.error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addVolunteerRequest.status]);

  const isAddDisabled = () => {
    const formValues = form.getValues();
    return formValues.name === '' || formValues.email === '';
  };

  return (
    <FormDrawer
      isOpen={true}
      onCloseDrawer={onClose}
      canSubmit={!isAddDisabled()}
      onSubmit={onSubmitVolunteer}
      title='Add Volunteer'
      submitButtonText='Add'
      description='Add a new volunteer to the project. Make sure to provide accurate information about the volunteer to ensure proper assignment and communication within the project.'
    >
      <FormInput
        name='name'
        label='Name'
        handleChange={handleChange}
        value={watch().name}
        error={errors.name}
      />

      <FormInput
        name='email'
        label='Email'
        handleChange={handleChange}
        value={watch().email}
        error={errors.email}
      />

      <FormInput
        name='phone'
        label='Phone'
        handleChange={handleChange}
        value={watch().phone}
        error={errors.phone}
        optional
      />
    </FormDrawer>
  );
}
