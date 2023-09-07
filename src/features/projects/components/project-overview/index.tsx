import styles from './styles.module.scss';
import Typography from '@mui/material/Typography';
import DonationsBox from '../donations-box';
import ImagesMasonry from '@/features/shared/components/images-masonry';
import InstagramFeedWidget from '@/features/shared/components/instagram-feed-widget';
import PrimaryButton from '@/features/shared/components/primary-button';
import {Box, Grid, Tooltip} from '@mui/material';
import {IconButton} from '@mui/material';
import useCopyToClipboard from '@/lib/hooks/useCopyToClipboard';
import AddVolunteerDrawer from '../add-volunteer-drawer';
import {useState} from 'react';
import ProjectMetrics from '../project-metrics';
import {Share as ShareIcon} from '@mui/icons-material';
import VideoPlayer from '@/features/shared/components/video-player';
import ImageSlider from '@/features/shared/components/image-slider';
import {useRouter} from 'next/router';

type Props = {
  project: any;
};

export default function ProjectOverview({project}: Props) {
  const router = useRouter();
  const slug = router.query.slug!;

  const [showAddVolunteerDrawer, setShowAddVolunteerDrawer] = useState(false);

  const [_, copy] = useCopyToClipboard();

  const {name, description, coverPhoto, projectId, organizationId, video, photoGallery} = project;

  const handleCopyToClipboard = () => {
    copy(window.location.href);
  };

  const handleOpenAddVolunteerDrawer = () => {
    setShowAddVolunteerDrawer(true);
  };

  const handleCloseAddVolunteerDrawer = () => {
    setShowAddVolunteerDrawer(false);
  };

  return (
    <>
      <Grid
        container
        padding={10}
        spacing={3}
        className={styles.projectHeader}
        justifyContent='center'
        sx={{backgroundImage: `url(${coverPhoto ? coverPhoto : '/collaboration.jpeg'})`}}
      >
        <Grid item xs={12}>
          <Typography variant='h2' textAlign='center' color='white'>
            {name}
          </Typography>
        </Grid>
        <Grid item xs={false} sm={1} md={2} />
        <Grid item xs={12} sm={10} md={8}>
          <Typography variant='subtitle2' textAlign='center'>
            {description}
          </Typography>
        </Grid>
        <Grid item xs={false} sm={1} md={2} />
        <Grid item>
          <Box display='flex'>
            <PrimaryButton inverted onClick={handleOpenAddVolunteerDrawer} sx={{mr: 3}}>
              Ofrézcase como Voluntario!
            </PrimaryButton>
            <Tooltip title='Compartir'>
              <IconButton
                className={styles.copyToClipboard}
                size='large'
                color='primary'
                onClick={handleCopyToClipboard}
              >
                <ShareIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </Grid>
        <Grid item mt={3}>
          <DonationsBox projectSlug={project.slug} />
        </Grid>
      </Grid>
      <Grid container>
        {video ? (
          <>
            <Grid item xs={12} md={6} p={2} marginY={'auto'}>
              <VideoPlayer videoId={video} width='100%' auxClassNames={styles.videoPlayer} />
            </Grid>
            {slug === 'oratorio-tacuru' && (
              <Grid item xs={12} md={6}>
                <InstagramFeedWidget />
              </Grid>
            )}
          </>
        ) : (
          <>
            <Grid item xs={1} />
            <Grid item xs={10}>
              <InstagramFeedWidget />
            </Grid>
            <Grid item xs={1} />
          </>
        )}
        <Grid item xs={12} py={5} sx={{backgroundColor: '#fff'}}>
          {photoGallery && <ImageSlider images={photoGallery} />}
        </Grid>
        <Grid item xs={12}>
          <ProjectMetrics project={project} />
        </Grid>
        <Grid item xs={12}>
          <ImagesMasonry />
        </Grid>
      </Grid>
      {showAddVolunteerDrawer && (
        <AddVolunteerDrawer
          organizationId={organizationId}
          onClose={handleCloseAddVolunteerDrawer}
          projectId={projectId}
        />
      )}
    </>
  );
}
