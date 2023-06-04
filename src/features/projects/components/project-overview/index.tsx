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

type Props = {
  project: any;
};

export default function ProjectOverview({project}: Props) {
  const {name, description, coverPhoto} = project;

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
          <PrimaryButton auxClassNames={styles.volunteeringButton} inverted>
            Ofrézcase como Voluntario!
          </PrimaryButton>
        </CardContent>
      </Card>
      <DonationsBox />
      <InstagramFeedWidget />
      <Gallery images={PHOTOS} enableImageSelection={false} />
      <ImagesMasonry />
    </div>
  );
}
