/* eslint-disable @next/next/no-img-element */
import {convertDateFromIso} from '@/lib/utils/ui-helper';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import EditIcon from '@mui/icons-material/Edit';
import Grid from '@mui/material/Grid';
import styles from './styles.module.scss';
import VideoPlayer from '@/features/shared/components/video-player';
import {Button, IconButton} from '@mui/material';
import ImageSlider from '@/features/shared/components/image-slider';
import {PAY_BILLING} from '@/graphql/mutation/payBilling';
import {useMutation} from '@apollo/client';

type Props = {
  project: any;
  handleOpenUpdateProjectDrawer: () => void;
};

export default function ProjectInformationCard({project, handleOpenUpdateProjectDrawer}: Props) {
  const {field, startDate, location, organization, video, photoGallery, amountToPay} = project;
  const [payBilling, {}] = useMutation(PAY_BILLING);

  const pay = async () => {
    await payBilling({
      variables: {
        projectId: parseInt(project.id),
      },
    });
  };

  return (
    <Card className={styles.projectData}>
      <CardContent>
        <Grid container spacing={5} alignItems='center' paddingBottom={4}>
          <Grid item>
            <Typography variant='h5' component='h2' color='gray' fontWeight={700}>
              Información del Proyecto
            </Typography>
          </Grid>
          <Grid item>
            <IconButton onClick={handleOpenUpdateProjectDrawer}>
              <EditIcon className={styles.editIcon} />
            </IconButton>
          </Grid>
        </Grid>
        <Grid container justifyContent='space-between' alignItems='center' spacing={2}>
          <Grid item xs={12} md={6}>
            <div className={styles.field}>
              <Typography className={styles.label} variant='body1' component='span'>
                Campo
              </Typography>
              <Typography className={styles.value} variant='body1' component='span'>
                {field}
              </Typography>
            </div>
            <div className={styles.field}>
              <Typography className={styles.label} variant='body1' component='span'>
                Organización
              </Typography>
              <Typography className={styles.value} variant='body1' component='span'>
                {organization.name}
              </Typography>
            </div>
          </Grid>
          <Grid item xs={12} md={6}>
            <div className={styles.field}>
              <Typography className={styles.label} variant='body1' component='span'>
                Fecha de Inicio
              </Typography>
              <Typography className={styles.value} variant='body1' component='span'>
                {startDate ? convertDateFromIso(startDate) : '-'}
              </Typography>
            </div>
            <div className={styles.field}>
              <Typography className={styles.label} variant='body1' component='span'>
                Ubicación
              </Typography>
              <Typography className={styles.value} variant='body1' component='span'>
                {location || '-'}
              </Typography>
            </div>
          </Grid>
        </Grid>
        <Grid container spacing={2} alignItems='center' py={5}>
          <Grid item xs={12}>
            <div className={styles.field}>
              <Typography className={styles.label} variant='body1' component='span'>
                Monto a pagar
              </Typography>
              <Typography className={styles.value} variant='body1' component='span' mr={2}>
                $ {amountToPay / 100 || 0}
              </Typography>
              <Button variant='contained' color='primary' size='small' disabled={!amountToPay} onClick={pay}>
                Pagar
              </Button>
            </div>
          </Grid>
        </Grid>

        <div className={styles.mediaContainer}>
          <div className={styles.video}>
            <Typography className={styles.label} variant='body1' component='span'>
              Video
            </Typography>
            <br />
            {video ? (
              <VideoPlayer videoId={video} auxClassNames={styles.videoPlayer} />
            ) : (
              <Typography className={styles.value} variant='body1' component='span'>
                No hay video de Youtube agregado aún
              </Typography>
            )}
          </div>
          <div className={styles.photoGallery}>
            <Typography className={styles.label} variant='body1' component='span'>
              Galería de Fotos
            </Typography>
            <br />
            {photoGallery?.length ? (
              <ImageSlider
                images={photoGallery}
                containerClassName={styles.carouselContainer}
                carouselImageClassName={styles.carouselImage}
              />
            ) : (
              <Typography className={styles.value} variant='body1' component='span'>
                No hay fotos del proyecto agregadas aún
              </Typography>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
