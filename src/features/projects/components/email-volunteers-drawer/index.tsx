import {useForm} from 'react-hook-form';
import {useEffect} from 'react';
import {VolunteersEmail} from '@/features/projects/types';
import FormInput from '@/features/shared/components/form-input';
import 'react-calendar/dist/Calendar.css';
import useAsync from '@/lib/hooks/useAsync';
import {useMutation} from '@apollo/client';
import {toast} from 'react-hot-toast';
import FormDrawer from '@/features/shared/components/form-drawer';
import {EMAIL_VOLUNTEERS} from '@/graphql/mutation/emailVolunteers';
import {SUCCESSFUL_VOLUNTEERS_BROADCAST} from '@/lib/utils/api-messages-helper';
import TextBox from '@/features/shared/components/text-box';
import styles from './styles.module.scss';

type Props = {
  onClose: () => void;
  projectId: number;
};

export default function EmailVolunteersDrawer({onClose, projectId}: Props) {
  const [emailVolunteers, {}] = useMutation(EMAIL_VOLUNTEERS);

  const emptyVolunteersEmail: VolunteersEmail = {
    projectId,
    subject: '',
    body: '',
  };
  const form = useForm<VolunteersEmail>({
    defaultValues: emptyVolunteersEmail,
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

  const emailVolunteersRequest = useAsync(async () => {
    const formValues = form.getValues();
    await emailVolunteers({
      variables: {
        input: {
          projectId: +formValues.projectId,
          subject: formValues.subject,
          body: formValues.body,
        },
      },
    });
  }, false);

  const onSubmitEmail = async () => {
    await emailVolunteersRequest.execute();
  };

  // Effect to handle login request request status
  useEffect(() => {
    if (emailVolunteersRequest.status === 'success') {
      form.reset(emptyVolunteersEmail);
      onClose();
      toast.success(SUCCESSFUL_VOLUNTEERS_BROADCAST);
    }
    if (emailVolunteersRequest.status === 'error') {
      toast.error(emailVolunteersRequest.error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [emailVolunteersRequest.status]);

  const isAddDisabled = () => {
    const formValues = form.getValues();
    return formValues.subject === '' || formValues.body === '';
  };

  return (
    <FormDrawer
      isOpen={true}
      onCloseDrawer={onClose}
      canSubmit={!isAddDisabled()}
      onSubmit={onSubmitEmail}
      title='Enviar email'
      submitButtonText='Email'
    >
      <br />
      <br />
      <FormInput
        name='subject'
        label='Asunto'
        handleChange={handleChange}
        value={watch().subject}
        error={errors.subject}
      />

      <br />
      <br />

      <TextBox
        name='body'
        onChange={handleChange}
        value={watch().body}
        placeholder='Ingrese su mensaje...'
        auxClassNames={styles.bodyBox}
      />
    </FormDrawer>
  );
}
