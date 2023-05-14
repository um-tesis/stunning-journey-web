import styles from './styles.module.scss';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

type Props = {
  project: any;
};

export default function ProjectOverview({project}: Props) {
  const {name, description} = project;

  return (
    <div className={styles.projectContainer}>
      <Card className={styles.projectHeader}>
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
      <br />
      <br />
    </div>
  );
}
