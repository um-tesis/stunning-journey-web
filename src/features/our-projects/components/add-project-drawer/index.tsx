import {useForm} from 'react-hook-form';
import {useEffect} from 'react';
import {ProjectOut} from '@/features/projects/types';
import styles from './styles.module.scss';
import ImageInput from '@/features/shared/components/image-input';
import useAsync from '@/lib/hooks/useAsync';
import {useMutation} from '@apollo/client';
import {CREATE_PROJECT} from '@/graphql/mutation/createProject';
import {toast} from 'react-hot-toast';
import {PROJECT_CREATED} from '@/lib/utils/api-messages-helper';
import FormDrawer from '@/features/shared/components/form-drawer';
import {
  Grid,
  TextField,
  Checkbox,
  FormGroup,
  FormControlLabel,
  Divider,
  Alert,
  AlertTitle,
} from '@mui/material';
import {DatePicker} from '@mui/x-date-pickers';
import MultipleImageInput from '@/features/shared/components/multiple-image-input';

type Props = {
  onClose: () => void;
  organizationId: number;
};

export default function AddProjectDrawer({onClose, organizationId}: Props) {
  const [createProject, {}] = useMutation(CREATE_PROJECT);

  const emptyProject: ProjectOut = {
    name: '',
    description: '',
    field: '',
    location: '',
    organizationId,
    acceptsVolunteers: false,
    mpAccessToken: '',
    mpPublicKey: '',
    mpApplicationId: '',
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
          organizationId: formValues.organizationId,
          mpAccessToken: formValues.mpAccessToken,
          mpPublicKey: formValues.mpPublicKey,
          mpApplicationId: formValues.mpApplicationId,
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
      console.log('=====');
      console.log(createProjectRequest.error);
      console.log('=====');
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
      title='Nuevo Proyecto'
      submitButtonText='Agregar'
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
          <Divider />
          <Alert severity='info' sx={{mt: 1}}>
            <AlertTitle>Pasarela de pagos</AlertTitle>
            Para poder recibir donaciones, es necesario que cuentes con una cuenta de Mercado Pago.
            <br />
            <br />
            <strong>¿Cómo crear una cuenta de Mercado Pago?</strong>
            <br />
            <br />
            <a
              href='https://www.mercadopago.com.uy/hub/registration/landing'
              target='_blank'
              rel='noopener noreferrer'
            >
              <strong>1. Registrate en Mercado Pago</strong>
            </a>
            <br />
            <br />
            <a
              href='https://www.mercadopago.com.uy/developers/panel/app'
              target='_blank'
              rel='noopener noreferrer'
            >
              <strong>2. Crea una aplicación</strong>
            </a>
            <br />
            <br />
            <strong>3. Obtené tus credenciales de producción</strong>
            <br />
            <br />
            <strong>
              Nota: Las credenciales deben empezar con <code>APP_USR-</code>
            </strong>
          </Alert>
        </Grid>
        <Grid item xs={12}>
          <TextField
            name='mpPublicKey'
            label='Public Key de Mercado Pago*'
            variant='outlined'
            onChange={handleChange}
            value={watch().mpPublicKey}
            error={!!errors?.mpPublicKey}
            helperText={errors?.mpPublicKey?.message}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            name='mpAccessToken'
            label='Access Token de Mercado Pago*'
            variant='outlined'
            onChange={handleChange}
            value={watch().mpAccessToken}
            error={!!errors?.mpAccessToken}
            helperText={errors?.mpAccessToken?.message || '¡Descuida! Esta información es privada.'}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            name='mpApplicationId'
            label='ID de Aplicación de Mercado Pago*'
            variant='outlined'
            onChange={handleChange}
            value={watch().mpApplicationId}
            error={!!errors?.mpApplicationId}
            helperText={errors?.mpApplicationId?.message}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <Divider />
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
