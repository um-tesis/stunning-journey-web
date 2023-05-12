import {useForm} from 'react-hook-form';
import {useEffect, useState} from 'react';
import {Project} from '@/features/projects/types';
import styles from './styles.module.scss';
import FormInput from '@/features/shared/components/form-input';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import {convertJsDateToIso} from '@/lib/utils/ui-helper';
import ImageInput from '@/features/shared/components/image-input';
import useAsync from '@/lib/hooks/useAsync';
import {useMutation} from '@apollo/client';
import {toast} from 'react-hot-toast';
import {PROJECT_CREATED} from '@/lib/utils/api-messages-helper';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import {UPDATE_PROJECT} from '@/graphql/mutation/updateProject';
import FormDrawer from '@/features/shared/components/form-drawer';

type Props = {
  onClose: () => void;
  project: any;
};

export default function UpdateProjectDrawer({onClose, project}: Props) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [_, setDateRange] = useState([new Date(), new Date()]);
  const [updateProject, {}] = useMutation(UPDATE_PROJECT);

  // we do not use destructuring here because we project has some fields that are not in Project but come from the query
  const emptyProject: Project = {
    id: project.id,
    name: project.name,
    description: project.description,
    field: project.field,
    location: project.location,
    startDate: project.startDate,
    endDate: project.endDate,
    organizationId: project.organizationId,
    acceptsVolunteers: project.acceptsVolunteers,
    coverPhoto: project.coverPhoto,
    photoGallery: project.photoGallery,
    video: project.video,
  };
  const form = useForm<Project>({
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

  const updateProjectRequest = useAsync(async () => {
    const formValues = form.getValues();
    await updateProject({
      variables: {
        input: {
          id: formValues.id,
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
    await updateProjectRequest.execute();
  };

  // Effect to handle login request request status
  useEffect(() => {
    if (updateProjectRequest.status === 'success') {
      form.reset(emptyProject);
      toast.success(PROJECT_CREATED);
      onClose();
    }
    if (updateProjectRequest.status === 'error') {
      toast.error(updateProjectRequest.error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateProjectRequest.status]);

  const isUpdateDisabled = () => {
    const formValues = form.getValues();
    return formValues.name === '' || formValues.description === '' || formValues.field === '';
  };

  return (
    <FormDrawer
      isOpen={true}
      onCloseDrawer={onClose}
      canSubmit={!isUpdateDisabled()}
      onSubmit={onSubmitProject}
      title='Update Project'
      submitButtonText='Update'
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
