import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import {CardActionArea, CardActions} from '@mui/material';
import PrimaryButton from '../primary-button';

type ProjectCardProps = {
  name: string;
};

export default function ProjectCard({name}: ProjectCardProps) {
  return (
    <Card sx={{maxWidth: 410, border: '1px solid #D4D2E3', borderRadius: '24px', padding: 2}}>
      <CardActionArea>
        <CardMedia
          component='img'
          height='140'
          image='/collaboration.jpeg'
          alt='photo'
          sx={{borderRadius: '10px'}}
        />
        <CardContent>
          <Typography gutterBottom variant='h6' component='div'>
            {name}
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            Lorem ipsum dolor sit amet consecte tur adipiscing elit semper dalaracc lacus vel facilisis
            volutpat est velitolm.
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <PrimaryButton size='small' color='primary'>
          Learn More...
        </PrimaryButton>
      </CardActions>
    </Card>
  );
}
