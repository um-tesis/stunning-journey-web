import {useForm} from 'react-hook-form';
import {useEffect} from 'react';
import {Project} from '@/features/projects/types';
import styles from './styles.module.scss';
import ImageInput from '@/features/shared/components/image-input';
import useAsync from '@/lib/hooks/useAsync';
import {useMutation} from '@apollo/client';
import {toast} from 'react-hot-toast';
import {PROJECT_UPDATED} from '@/lib/utils/api-messages-helper';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import {UPDATE_PROJECT} from '@/graphql/mutation/updateProject';
import FormDrawer from '@/features/shared/components/form-drawer';
import {Grid, TextField} from '@mui/material';
import {DatePicker} from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import {useRouter} from 'next/router';
import slugify from 'slugify';
import MultipleImageInput from '@/features/shared/components/multiple-image-input';

type Props = {
  onClose: () => void;
  project: any;
};

export default function UpdateProjectDrawer({onClose, project}: Props) {
  const router = useRouter();
  const [updateProject, {}] = useMutation(UPDATE_PROJECT);

  // we do not use destructuring here because project has some fields that are not in the type Project but come from the query
  const emptyProject: Project = {
    id: +project.id,
    name: project.name,
    description: project.description,
    field: project.field,
    location: project.location,
    startDate: project.startDate ? dayjs(project.startDate) : undefined,
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

  const handlePhotoGalleryChange = (imageUrls: string[]) => {
    form.setValue('photoGallery', imageUrls);
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
      if (form.getValues().name !== project.name) {
        const newSlug = slugify(form.getValues().name, {lower: true});
        router.replace(`/projects/${newSlug}`);
      }

      toast.success(PROJECT_UPDATED);
      onClose();
      form.reset(emptyProject);
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
            label='Nombre del Proyecto*'
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
            label='Categoría*'
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
              label='¿Este proyecto acepta voluntarios?'
            />
          </FormGroup>
        </Grid>
        <Grid item xs={12}>
          <DatePicker
            label='Fecha de Inicio'
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
          <MultipleImageInput
            imageUrls={watch().photoGallery}
            onChange={handlePhotoGalleryChange}
            label='Galería de Fotos'
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            name='video'
            label='Video de YouTube'
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
