import styles from './styles.module.scss';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import DonationsBox from '../donations-box';
import ImagesMasonry from '@/features/shared/components/images-masonry';
import InstagramFeedWidget from '@/features/shared/components/instagram-feed-widget';
import PrimaryButton from '@/features/shared/components/primary-button';
import {IconButton} from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import useCopyToClipboard from '@/lib/hooks/useCopyToClipboard';
import AddVolunteerDrawer from '../add-volunteer-drawer';
import {useState} from 'react';
import ProjectMetrics from '../project-metrics';
import VideoPlayer from '@/features/shared/components/video-player';
import ImageSlider from '@/features/shared/components/image-slider';

type Props = {
  project: any;
};

export default function ProjectOverview({project}: Props) {
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
      <ProjectMetrics project={project} />
      {video && <VideoPlayer videoId={video} auxClassNames={styles.videoPlayer} />}
      {photoGallery && <ImageSlider images={photoGallery} />}
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
