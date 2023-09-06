import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import {CardActions, Link, useMediaQuery} from '@mui/material';
import PrimaryButton from '../primary-button';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import {useRouter} from 'next/router';
import styles from './styles.module.scss';
import {useTheme} from '@mui/material/styles';

type ProjectCardProps = {
  projectSlug: string;
  name: string;
  description: string;
  coverPhoto?: string;
};

export default function ProjectCard({projectSlug, name, description, coverPhoto}: ProjectCardProps) {
  const router = useRouter();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));

  const redirectToProject = () => {
    router.push(`projects/${projectSlug}`);
  };

  return (
    <Card className={styles.card} sx={{flexDirection: isSmallScreen ? 'column' : 'row'}}>
      <CardMedia
        width={isSmallScreen ? '100%' : '40%'}
        sx={{
          maxWidth: isSmallScreen ? '100%' : '40%',
          maxHeight: isSmallScreen ? '200px' : '100%',
        }}
        component='img'
        image={coverPhoto ? coverPhoto : '/collaboration.jpeg'}
        alt='photo'
      />
      <CardContent className={styles.content}>
        <Typography gutterBottom variant='h6' component='div'>
          <Link color='inherit' underline='hover' onClick={redirectToProject} style={{cursor: 'pointer'}}>
            {name}
          </Link>
        </Typography>
        <Typography variant='body2' color='text.secondary' className={styles.description} title={description}>
          {description}
        </Typography>
      </CardContent>
      <CardActions className={styles.actions}>
        <PrimaryButton size='small' color='primary' onClick={redirectToProject}>
          Más info{' '}
          <ArrowForwardIcon
            fontSize={'small'}
            sx={{
              marginLeft: '4px',
            }}
          />
        </PrimaryButton>
      </CardActions>
    </Card>
  );
}
