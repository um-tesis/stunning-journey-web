import styles from './styles.module.scss';
import Typography from '@mui/material/Typography';
import DonationsBox from '../donations-box';
import ImagesMasonry from '@/features/shared/components/images-masonry';
import useImageDimensions from './useImageDimensions';
import InstagramFeedWidget from '@/features/shared/components/instagram-feed-widget';
import PrimaryButton from '@/features/shared/components/primary-button';
import {Grid} from '@mui/material';
import {IconButton} from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import useCopyToClipboard from '@/lib/hooks/useCopyToClipboard';
import AddVolunteerDrawer from '../add-volunteer-drawer';
import {useState} from 'react';
import ProjectMetrics from '../project-metrics';
import {Gallery} from 'react-grid-gallery';

type Props = {
  project: any;
};

export default function ProjectOverview({project}: Props) {
  const [showAddVolunteerDrawer, setShowAddVolunteerDrawer] = useState(false);

  const [_, copy] = useCopyToClipboard();

  const {name, description, coverPhoto, projectId, organizationId} = project;

  const PHOTOS = [
    {
      src: '/ayudar.png',
      thumbnail: '/ayudar.png',
      width: useImageDimensions('/ayudar.png').width * 100,
      height: useImageDimensions('/ayudar.png').height * 100,
    },
    {
      src: '/collaboration.jpeg',
      thumbnail: '/collaboration.jpeg',
      width: useImageDimensions('/collaboration.jpeg').width * 5,
      height: useImageDimensions('/collaboration.jpeg').height * 5,
    },
    {
      src: '/help.jpeg',
      thumbnail: '/help.jpeg',
      width: useImageDimensions('/help.jpeg').width * 5,
      height: useImageDimensions('/help.jpeg').height * 5,
    },
    {
      src: '/tacu1.jpeg',
      thumbnail: '/tacu1.jpeg',
      width: useImageDimensions('/tacu1.jpeg').width,
      height: useImageDimensions('/tacu1.jpeg').height,
    },
    {
      src: '/tacu2.jpeg',
      thumbnail: '/tacu2.jpeg',
      width: useImageDimensions('/tacu2.jpeg').width,
      height: useImageDimensions('/tacu2.jpeg').height,
    },
    {
      src: '/manos.jpeg',
      thumbnail: '/manos.jpeg',
      width: useImageDimensions('/manos.jpeg').width,
      height: useImageDimensions('/manos.jpeg').height,
    },
  ];

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
        <Grid item xs={2} />
        <Grid item xs={8}>
          <Typography variant='subtitle2' textAlign='center'>
            {description}
          </Typography>
        </Grid>
        <Grid item xs={2} />
        <Grid item>
          <IconButton className={styles.copyToClipboard} onClick={handleCopyToClipboard}>
            <ContentCopyIcon />
          </IconButton>
          <PrimaryButton
            auxClassNames={styles.volunteeringButton}
            inverted
            onClick={handleOpenAddVolunteerDrawer}
          >
            Ofrézcase como Voluntario!
          </PrimaryButton>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item className={styles.overlap}>
          <DonationsBox projectSlug={project.slug} />
        </Grid>
        <Grid item xs={1} />
        <Grid item xs={10}>
          <InstagramFeedWidget />
        </Grid>
        <Grid item xs={12}>
          <ImagesMasonry />
        </Grid>
        <Grid item xs={12}>
          <ProjectMetrics project={project} />
        </Grid>
        <Grid item xs={12}>
          <Gallery images={PHOTOS} enableImageSelection={false} />
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
