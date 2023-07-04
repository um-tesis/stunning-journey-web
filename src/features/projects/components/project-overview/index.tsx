import styles from './styles.module.scss';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import DonationsBox from '../donations-box';
import ImagesMasonry from '@/features/shared/components/images-masonry';
import {Gallery} from 'react-grid-gallery';
import useImageDimensions from './useImageDimensions';
import InstagramFeedWidget from '@/features/shared/components/instagram-feed-widget';
import PrimaryButton from '@/features/shared/components/primary-button';
import {IconButton} from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import useCopyToClipboard from '@/lib/hooks/useCopyToClipboard';
import AddVolunteerDrawer from '../add-volunteer-drawer';
import {useState} from 'react';
import ProjectMetrics from '../project-metrics';

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
    <div className={styles.projectContainer}>
      <Card
        className={styles.projectHeader}
        sx={{backgroundImage: `url(${coverPhoto ? coverPhoto : '/collaboration.jpeg'})`}}
      >
        <div className={styles.overlay} />
        <CardContent className={styles.content}>
          <Typography className={styles.title} variant='h6' component='h3'>
            {name}
          </Typography>
          <Typography className={styles.description} variant='body2' component='p'>
            {description}
          </Typography>
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
        </CardContent>
      </Card>
      <DonationsBox />
      <InstagramFeedWidget />
      <ProjectMetrics />

      <Gallery images={PHOTOS} enableImageSelection={false} />
      <ImagesMasonry />
      {showAddVolunteerDrawer && (
        <AddVolunteerDrawer
          organizationId={organizationId}
          onClose={handleCloseAddVolunteerDrawer}
          projectId={projectId}
        />
      )}
    </div>
  );
}
