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
import {Grid, TextField} from '@mui/material';

type Props = {
  onClose: () => void;
  projectId: number;
  organizationId: number;
  isOrgAdmin?: boolean;
};

export default function AddVolunteerDrawer({onClose, projectId, organizationId, isOrgAdmin}: Props) {
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
        data: {
          name: formValues.name,
          email: formValues.email,
          phone: formValues.phone,
          role: formValues.role,
          password: formValues.password,
          organizationId: formValues.organizationId,
        },
      },
    });

    await assignVolunteerToProject({
      variables: {
        projectId: +projectId,
        userId: +res.data.createUser.id,
      },
    });
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
      toast.error('El email ya tiene un usuario asignado en el sistema');
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
      title={isOrgAdmin ? 'Agregar Voluntario' : 'Nuevo Voluntario'}
      submitButtonText={isOrgAdmin ? 'Agregar' : 'Ofrecerse'}
      description={
        isOrgAdmin
          ? 'Añada un nuevo voluntario al proyecto. Asegúrese de proporcionar información precisa sobre el voluntario para garantizar una asignación y comunicación adecuadas dentro del proyecto.'
          : 'Desde ya, ¡muchas gracias por tu colaboración!'
      }
    >
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            name='name'
            label='Nombre'
            fullWidth
            onChange={handleChange}
            value={watch().name}
            error={!!errors.name}
            helperText={errors.name?.message}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            name='email'
            label='Correo Electrónico'
            fullWidth
            onChange={handleChange}
            value={watch().email}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            name='phone'
            label='Teléfono'
            fullWidth
            onChange={handleChange}
            value={watch().phone}
            error={!!errors.phone}
            helperText={errors.phone?.message}
          />
        </Grid>
      </Grid>
    </FormDrawer>
  );
}
