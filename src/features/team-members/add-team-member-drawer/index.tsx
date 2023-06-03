import {useForm} from 'react-hook-form';
import {useEffect} from 'react';
import FormInput from '@/features/shared/components/form-input';
import 'react-calendar/dist/Calendar.css';
import useAsync from '@/lib/hooks/useAsync';
import {useMutation} from '@apollo/client';
import {toast} from 'react-hot-toast';
import FormDrawer from '@/features/shared/components/form-drawer';
import {SUCCESSFUL_TEAM_MEMBER_ADDITION} from '@/lib/utils/api-messages-helper';
import {SYSTEM_ROLES} from '@/lib/utils/constants';
import {CREATE_USER} from '@/graphql/mutation/createUser';
import {UserDataIn} from '@/features/shared/types';

type Props = {
  onClose: () => void;
  organizationId: number;
};

export default function AddTeamMemberDrawer({onClose, organizationId}: Props) {
  const [addTeamMember, {}] = useMutation(CREATE_USER);

  const emptyTeamMember: UserDataIn = {
    organizationId,
    name: '',
    email: '',
    phone: '',
    role: SYSTEM_ROLES.ORGADMIN,
    password: 'password',
  };
  const form = useForm<UserDataIn>({
    defaultValues: emptyTeamMember,
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

  const addTeamMemberRequest = useAsync(async () => {
    const formValues = form.getValues();
    await addTeamMember({
      variables: {
        input: {
          name: formValues.name,
          email: formValues.email,
          phone: formValues.phone,
          role: formValues.role,
          password: formValues.password,
          organizationId: formValues.organizationId,
        },
      },
    });
  }, false);

  const onSubmitTeamMember = async () => {
    await addTeamMemberRequest.execute();
  };

  // Effect to handle login request request status
  useEffect(() => {
    if (addTeamMemberRequest.status === 'success') {
      form.reset(emptyTeamMember);
      onClose();
      toast.success(SUCCESSFUL_TEAM_MEMBER_ADDITION);
    }
    if (addTeamMemberRequest.status === 'error') {
      toast.error(addTeamMemberRequest.error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addTeamMemberRequest.status]);

  const isAddDisabled = () => {
    const formValues = form.getValues();
    return formValues.name === '' || formValues.email === '';
  };

  return (
    <FormDrawer
      isOpen={true}
      onCloseDrawer={onClose}
      canSubmit={!isAddDisabled()}
      onSubmit={onSubmitTeamMember}
      title='Agregar Miembro'
      submitButtonText='Agregar'
      description='Añada un nuevo miembro administrador al equipo de trabajo de su organización. La persona recibira un email con las instrucciones para acceder a la plataforma y realizar su cambio de contraseña.'
    >
      <FormInput
        name='name'
        label='Nombre'
        handleChange={handleChange}
        value={watch().name}
        error={errors.name}
      />

      <FormInput
        name='email'
        label='Correo Electrónico'
        handleChange={handleChange}
        value={watch().email}
        error={errors.email}
      />

      <FormInput
        name='phone'
        label='Teléfono'
        handleChange={handleChange}
        value={watch().phone}
        error={errors.phone}
        optional
      />
    </FormDrawer>
  );
}
