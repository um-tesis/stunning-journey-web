import {useForm} from 'react-hook-form';
import {useEffect, useState} from 'react';
import {ProjectOut} from '@/features/projects/types';
import styles from './styles.module.scss';
import ImageInput from '@/features/shared/components/image-input';
import useAsync from '@/lib/hooks/useAsync';
import {useMutation} from '@apollo/client';
import {CREATE_PROJECT} from '@/graphql/mutation/createProject';
import {toast} from 'react-hot-toast';
import {PROJECT_CREATED} from '@/lib/utils/api-messages-helper';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormDrawer from '@/features/shared/components/form-drawer';
import {Grid, TextField, Checkbox} from '@mui/material';
import {DatePicker} from '@mui/x-date-pickers';

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
    startDate: undefined,
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
    console.log(event);
    let {value, name} = event.target;

    if (name === 'acceptsVolunteers') {
      value = event.target.checked;
      form.setValue(name, value);
    }

    form.clearErrors([name]);
    form.setValue(name, value);
  };

  const onDateChange = (date: any) => {
    form.setValue('startDate', date);
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
      <Grid container spacing={3} paddingY={5}>
        <Grid item xs={12}>
          <TextField
            name='name'
            label='Name*'
            variant='outlined'
            onChange={handleChange}
            value={watch().name}
            error={!!errors?.name}
            helperText={errors?.name?.message}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            name='field'
            label='Category*'
            variant='outlined'
            onChange={handleChange}
            value={watch().field}
            error={!!errors?.field}
            helperText={errors?.field?.message}
            fullWidth
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            name='description'
            label='Description*'
            variant='outlined'
            onChange={handleChange}
            value={watch().description}
            error={!!errors?.description}
            helperText={errors?.description?.message}
            fullWidth
            multiline
            minRows={3}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            name='location'
            label='Location'
            variant='outlined'
            onChange={handleChange}
            value={watch().location}
            error={!!errors?.location}
            helperText={errors?.location?.message}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  name='acceptsVolunteers'
                  checked={watch().acceptsVolunteers}
                  onChange={handleChange}
                />
              }
              className={styles.checkbox}
              label='Does this project accepts volunteers?'
            />
          </FormGroup>
        </Grid>
        <Grid item xs={12}>
          <DatePicker
            label='Start date'
            sx={{width: '100%'}}
            slotProps={{popper: {disablePortal: true}, textField: {helperText: errors?.startDate?.message}}}
            value={watch().startDate}
            onChange={onDateChange}
          />
        </Grid>
        <Grid item xs={12}>
          <ImageInput imageUrl={watch().coverPhoto} onChange={handleCoverPhotoChange} label='Cover Photo' />
        </Grid>
        <Grid item xs={12}>
          <TextField
            name='video'
            label='Youtube Video'
            variant='outlined'
            onChange={handleChange}
            value={watch().video}
            error={!!errors?.video}
            helperText={errors?.video?.message}
            fullWidth
          />
        </Grid>
      </Grid>
    </FormDrawer>
  );
}
