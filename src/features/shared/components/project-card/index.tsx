import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import {CardActionArea, CardActions} from '@mui/material';
import PrimaryButton from '../primary-button';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import {useRouter} from 'next/router';
import styles from './styles.module.scss';

type ProjectCardProps = {
  projectId: number;
  name: string;
  description: string;
  coverPhoto?: string;
};

export default function ProjectCard({projectId, name, description, coverPhoto}: ProjectCardProps) {
  const router = useRouter();

  const redirectToProject = () => {
    router.push(`projects/${projectId}`);
  };

  return (
    <Card className={styles.card}>
      <CardActionArea>
        <CardMedia
          component='img'
          height='140'
          image={coverPhoto ? coverPhoto : '/collaboration.jpeg'}
          alt='photo'
          sx={{borderRadius: '10px'}}
        />
        <CardContent className={styles.content}>
          <Typography gutterBottom variant='h6' component='div' className={styles.name}>
            {name}
          </Typography>
          <Typography
            variant='body2'
            color='text.secondary'
            className={styles.description}
            title={description}
          >
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions className={styles.actions}>
        <PrimaryButton size='small' color='primary' onClick={redirectToProject}>
          Learn More{' '}
          <ArrowForwardIcon
            fontSize={'small'}
            sx={{
              marginBottom: '-8px',
            }}
          />
        </PrimaryButton>
      </CardActions>
    </Card>
  );
}
