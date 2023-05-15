import {useForm} from 'react-hook-form';
import {useEffect, useState} from 'react';
import {ProjectOut} from '@/features/projects/types';
import styles from './styles.module.scss';
import FormInput from '@/features/shared/components/form-input';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import {convertJsDateToIso} from '@/lib/utils/ui-helper';
import ImageInput from '@/features/shared/components/image-input';
import useAsync from '@/lib/hooks/useAsync';
import {useMutation} from '@apollo/client';
import {CREATE_PROJECT} from '@/graphql/mutation/createProject';
import {toast} from 'react-hot-toast';
import {PROJECT_CREATED} from '@/lib/utils/api-messages-helper';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormDrawer from '@/features/shared/components/form-drawer';
import {convertDateFromIso} from '@/lib/utils/ui-helper';

type Props = {
  onClose: () => void;
  organizationId: number;
};

export default function AddProjectDrawer({onClose, organizationId}: Props) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [_, setDateRange] = useState([new Date(), new Date()]);
  const [createProject, {}] = useMutation(CREATE_PROJECT);

  const emptyProject: ProjectOut = {
    name: '',
    description: '',
    field: '',
    location: '',
    startDate: '',
    endDate: '',
    organizationId,
    acceptsVolunteers: false,
    coverPhoto: '',
    photoGallery: [],
    video: '',
  };
  const form = useForm<ProjectOut>({
    defaultValues: emptyProject,
  });
  const {
    formState: {errors},
    watch,
  } = form;
  const handleChange = (event: any) => {
    let {value, name} = event.target;

    if (name === 'acceptsVolunteers') {
      value = event.target.checked;
      form.setValue(name, value);
    }

    form.clearErrors([name]);
    form.setValue(name, value);
  };

  const onSelectDateRange = (date: any) => {
    setDateRange(date);
    setSelectedDate(date[0]);
    form.setValue('startDate', convertJsDateToIso(date[0]) || '');
    form.setValue('endDate', convertJsDateToIso(date[1]) || '');
  };

  const handleCoverPhotoChange = (imageUrl: string) => {
    form.setValue('coverPhoto', imageUrl);
  };

  useEffect(() => {
    form.reset();
  }, [form]);

  const createProjectRequest = useAsync(async () => {
    const formValues = form.getValues();
    await createProject({
      variables: {
        input: {
          name: formValues.name,
          description: formValues.description,
          field: formValues.field,
          location: formValues.location,
          startDate: formValues.startDate,
          endDate: formValues.endDate,
          organizationId: formValues.organizationId,
          acceptsVolunteers: formValues.acceptsVolunteers,
          coverPhoto: formValues.coverPhoto,
          photoGallery: formValues.photoGallery,
          video: formValues.video,
        },
      },
    });
  }, false);

  const onSubmitProject = async () => {
    await createProjectRequest.execute();
  };

  // Effect to handle login request request status
  useEffect(() => {
    if (createProjectRequest.status === 'success') {
      form.reset(emptyProject);
      toast.success(PROJECT_CREATED);
      onClose();
    }
    if (createProjectRequest.status === 'error') {
      toast.error(createProjectRequest.error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [createProjectRequest.status]);

  const isAddDisabled = () => {
    const formValues = form.getValues();
    return formValues.name === '' || formValues.description === '' || formValues.field === '';
  };

  return (
    <FormDrawer
      isOpen={true}
      onCloseDrawer={onClose}
      canSubmit={!isAddDisabled()}
      onSubmit={onSubmitProject}
      title='New Project'
      submitButtonText='Add'
    >
      <FormInput
        name='name'
        label='Name'
        handleChange={handleChange}
        value={watch().name}
        error={errors.name}
      />
      <FormInput
        name='field'
        label='Field'
        handleChange={handleChange}
        value={watch().field}
        error={errors.field}
      />
      <FormInput
        name='description'
        label='Description'
        handleChange={handleChange}
        value={watch().description}
        error={errors.description}
      />
      <FormInput
        name='location'
        label='Location'
        handleChange={handleChange}
        value={watch().location}
        error={errors.location}
        optional
      />
      <br />
      <FormGroup>
        <FormControlLabel
          control={
            <Checkbox name='acceptsVolunteers' checked={watch().acceptsVolunteers} onChange={handleChange} />
          }
          className={styles.checkbox}
          label='Does this project accepts volunteers?'
        />
      </FormGroup>
      <br />
      <div className={styles.calendarDescription}>Chose the start and end date of the project (optional)</div>
      <div className={styles.calendarDescription}>
        Start Date : {watch().startDate ? convertDateFromIso(watch().startDate!) : '-'}
      </div>
      <div className={styles.calendarDescription}>
        End Date : {watch().endDate ? convertDateFromIso(watch().endDate!) : '-'}
      </div>
      <br />
      <Calendar selectRange={true} onChange={onSelectDateRange} value={selectedDate} />
      <br />
      <br />
      <ImageInput
        imageUrl={watch().coverPhoto}
        onChange={handleCoverPhotoChange}
        label='Cover Photo (Optional)'
      />
      <br />
      <br />
      <FormInput
        name='video'
        label='Youtube Video'
        handleChange={handleChange}
        value={watch().video}
        error={errors.video}
        optional
      />
    </FormDrawer>
  );
}
