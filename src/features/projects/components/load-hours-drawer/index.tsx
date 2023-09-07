import {useForm} from 'react-hook-form';
import {useEffect, useState} from 'react';
import {ProjectHours} from '@/features/projects/types';
import FormInput from '@/features/shared/components/form-input';
import 'react-calendar/dist/Calendar.css';
import useAsync from '@/lib/hooks/useAsync';
import {useMutation} from '@apollo/client';
import {toast} from 'react-hot-toast';
import FormDrawer from '@/features/shared/components/form-drawer';
import {SUCCESSFUL_VOLUNTEERS_BROADCAST} from '@/lib/utils/api-messages-helper';
import {LOAD_PROJECT_HOURS_TO_USER} from '@/graphql/mutation/loadProjectHoursToUser';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, {SelectChangeEvent} from '@mui/material/Select';

type Props = {
  onClose: () => void;
  projectId: number;
  volunteers: any[];
};

export default function LoadHoursDrawer({onClose, projectId, volunteers}: Props) {
  const [selectedVolunteer, setSelectedVolunteer] = useState(undefined);

  const handleVolunteerSelection = (event: SelectChangeEvent) => {
    const volunteer = event.target.value as any;
    form.setValue('userId', +volunteer.id);
    setSelectedVolunteer(volunteer);
  };

  const [loadProjectHours, {}] = useMutation(LOAD_PROJECT_HOURS_TO_USER);

  const emptyLoadHours: ProjectHours = {
    projectId,
    userId: 0,
    hours: 0,
  };
  const form = useForm<ProjectHours>({
    defaultValues: emptyLoadHours,
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

  const loadHoursRequest = useAsync(async () => {
    const formValues = form.getValues();
    await loadProjectHours({
      variables: {
        projectId: +formValues.projectId,
        userId: formValues.userId,
        hours: +formValues.hours,
      },
    });
  }, false);

  const onSubmitHours = async () => {
    await loadHoursRequest.execute();
  };

  // Effect to handle login request request status
  useEffect(() => {
    if (loadHoursRequest.status === 'success') {
      form.reset(emptyLoadHours);
      onClose();
      toast.success(SUCCESSFUL_VOLUNTEERS_BROADCAST);
    }
    if (loadHoursRequest.status === 'error') {
      toast.error(loadHoursRequest.error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadHoursRequest.status]);

  const isAddDisabled = () => {
    const formValues = form.getValues();
    return formValues.hours === 0 || formValues.userId === 0;
  };

  return (
    <FormDrawer
      isOpen={true}
      onCloseDrawer={onClose}
      canSubmit={!isAddDisabled()}
      onSubmit={onSubmitHours}
      title='Cargar Horas'
      submitButtonText='Cargar'
      description='Carga de horas a un voluntario que haya participado de alguna manera en este proyecto. Esto se sumará a las horas de voluntariado. De esta manera los voluntarios eventualmente ganarán una insignia Libera.'
    >
      <br />
      <br />
      <FormControl fullWidth sx={{zIndex: 100001}}>
        <InputLabel>Elija un voluntario</InputLabel>
        <Select value={selectedVolunteer} label='Elija un voluntario' onChange={handleVolunteerSelection}>
          {volunteers.map((volunteer, index) => (
            <MenuItem key={index} value={volunteer}>
              {volunteer.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <br />
      <br />
      <FormInput
        name='hours'
        label='Horas'
        handleChange={handleChange}
        value={watch().hours}
        error={errors.hours}
      />
    </FormDrawer>
  );
}
