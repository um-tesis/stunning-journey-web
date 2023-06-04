import {convertDateFromIso} from '@/lib/utils/ui-helper';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import EditIcon from '@mui/icons-material/Edit';
import Grid from '@mui/material/Grid';
import styles from './styles.module.scss';
import VideoPlayer from '@/features/shared/components/video-player';
import {IconButton} from '@mui/material';

type Props = {
  project: any;
  handleOpenUpdateProjectDrawer: () => void;
};

export default function ProjectInformationCard({project, handleOpenUpdateProjectDrawer}: Props) {
  const {field, startDate, endDate, location, organization} = project;

  return (
    <>
      <Card className={styles.projectData}>
        <CardContent>
          <Grid container spacing={5} alignItems='center' paddingBottom={4}>
            <Grid item>
              <Typography variant='h5' component='h2' className={styles.title}>
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
              <div className={styles.organizationName}>
                <Typography className={styles.label} variant='body1' component='span'>
                  Nombre de la Organización
                </Typography>
                <Typography className={styles.value} variant='body1' component='span'>
                  {organization.name}
                </Typography>
              </div>
            </Grid>
            <Grid item xs={12} md={6}>
              <div className={styles.startDate}>
                <Typography className={styles.label} variant='body1' component='span'>
                  Fecha de Inicio
                </Typography>
                <Typography className={styles.value} variant='body1' component='span'>
                  {startDate ? convertDateFromIso(startDate) : 'No Start Date'}
                </Typography>
              </div>
              <div className={styles.endDate}>
                <Typography className={styles.label} variant='body1' component='span'>
                  Fecha de Finalización
                </Typography>
                <Typography className={styles.value} variant='body1' component='span'>
                  {endDate ? convertDateFromIso(endDate) : 'No End Date'}
                </Typography>
              </div>
            </Grid>
          </Grid>
          <br />
          <br />
          <div className={styles.location}>
            <Typography className={styles.label} variant='body1' component='span'>
              Ubicación
            </Typography>
            <Typography className={styles.value} variant='body1' component='span'>
              {location || '-'}
            </Typography>
          </div>
          <br />
          <br />

          <div className={styles.mediaContainer}>
            <div className={styles.video}>
              <Typography className={styles.label} variant='body1' component='span'>
                Video
              </Typography>
              <br />
              <VideoPlayer
                videoId={'https://www.youtube.com/watch?v=PTfntSlhnwY'}
                auxClassNames={styles.videoPlayer}
              />
            </div>
            <div className={styles.photoGallery}>
              <Typography className={styles.label} variant='body1' component='span'>
                Galería de Fotos
              </Typography>
              <br />
              <Typography className={styles.value} variant='body1' component='span'>
                No hay fotos agregadas aún
              </Typography>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
