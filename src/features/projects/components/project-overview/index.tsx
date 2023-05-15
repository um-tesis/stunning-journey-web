import styles from './styles.module.scss';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import DonationsBox from '../donations-box';
import ImagesMasonry from '@/features/shared/components/images-masonry';

type Props = {
  project: any;
};

export default function ProjectOverview({project}: Props) {
  const {name, description, coverPhoto} = project;

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
        </CardContent>
      </Card>
      <DonationsBox />
      <ImagesMasonry />
    </div>
  );
}
