import styles from './styles.module.scss';
import Typography from '@mui/material/Typography';
import DonationsBox from '../donations-box';
import ImagesMasonry from '@/features/shared/components/images-masonry';
import InstagramFeedWidget from '@/features/shared/components/instagram-feed-widget';
import PrimaryButton from '@/features/shared/components/primary-button';
import {Box, Grid, Tooltip, useMediaQuery} from '@mui/material';
import {useTheme} from '@mui/material/styles';
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
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));

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
        position='relative'
        py={isSmallScreen ? 5 : 10}
        px={isSmallScreen ? 2 : 10}
        spacing={3}
        className={styles.projectHeader}
        justifyContent='center'
        sx={{backgroundImage: `url(${coverPhoto ? coverPhoto : '/collaboration.jpeg'})`}}
      >
        <Box
          position='absolute'
          top={0}
          left={0}
          right={0}
          bottom={0}
          bgcolor='rgba(0, 0, 0, 0.37)'
          display='flex'
          flexDirection='column'
          alignItems='center'
          justifyContent='center'
        />
        <Grid item xs={12} zIndex={1}>
          <Typography variant='h2' textAlign='center' color='white' gutterBottom>
            {name}
          </Typography>
        </Grid>
        <Grid item xs={false} sm={1} md={2} />
        <Grid item xs={12} sm={10} md={8} zIndex={1}>
          <Typography variant='subtitle2' textAlign='center'>
            {description}
          </Typography>
        </Grid>
        <Grid item xs={false} sm={1} md={2} />
        <Grid item zIndex={1} my={6}>
          <DonationsBox projectSlug={project.slug} />
        </Grid>
        <Grid item zIndex={1}>
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
      </Grid>
      <Grid container>
        {video ? (
          <>
            <Grid item xs={12} md={6} p={2} marginY={'auto'}>
              <VideoPlayer
                videoId={video}
                height={isSmallScreen ? '300' : '630'}
                width='100%'
                auxClassNames={styles.videoPlayer}
              />
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
