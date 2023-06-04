import {useForm} from 'react-hook-form';
import {useEffect} from 'react';
import {Project} from '@/features/projects/types';
import styles from './styles.module.scss';
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
import {Grid, TextField} from '@mui/material';
import {DatePicker} from '@mui/x-date-pickers';
import dayjs from 'dayjs';

type Props = {
  onClose: () => void;
  project: any;
};

export default function UpdateProjectDrawer({onClose, project}: Props) {
  const [updateProject, {}] = useMutation(UPDATE_PROJECT);

  // we do not use destructuring here because we project has some fields that are not in Project but come from the query
  const emptyProject: Project = {
    id: Number(project.id),
    name: project.name,
    description: project.description,
    field: project.field,
    location: project.location,
    startDate: dayjs(project.startDate),
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

  const onDateChange = (date: any) => {
    form.setValue('startDate', date);
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
      title='Actualizar Proyecto'
      submitButtonText='Actualizar'
    >
      <Grid container spacing={3} paddingY={5}>
        <Grid item xs={12}>
          <TextField
            name='name'
            label='Nombre*'
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
            label='Categoria*'
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
            label='Descripción*'
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
            label='Ubicación'
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
              label='¿Acepta voluntarios este proyecto?'
            />
          </FormGroup>
        </Grid>
        <Grid item xs={12}>
          <DatePicker
            label='Fechas'
            sx={{width: '100%'}}
            slotProps={{popper: {disablePortal: true}, textField: {helperText: errors?.startDate?.message}}}
            value={watch().startDate}
            onChange={onDateChange}
          />
        </Grid>
        <Grid item xs={12}>
          <ImageInput
            imageUrl={watch().coverPhoto}
            onChange={handleCoverPhotoChange}
            label='Foto de Portada'
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            name='video'
            label='Video de Youtube'
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
