import styles from './styles.module.scss';
import Typography from '@mui/material/Typography';
import DonationsBox from '../donations-box';
import ImagesMasonry from '@/features/shared/components/images-masonry';
import useImageDimensions from './useImageDimensions';
import InstagramFeedWidget from '@/features/shared/components/instagram-feed-widget';
import PrimaryButton from '@/features/shared/components/primary-button';
import {Grid} from '@mui/material';

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
          <PrimaryButton auxClassNames={styles.volunteeringButton} inverted>
            Ofrézcase como Voluntario!
          </PrimaryButton>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item className={styles.overlap}>
          <DonationsBox projectSlug={project.slug} />
        </Grid>
        <Grid item xs={12}>
          <ImagesMasonry />
        </Grid>
        <Grid item xs={1} />
        <Grid item xs={10}>
          <InstagramFeedWidget />
        </Grid>
      </Grid>
    </>
  );
}
