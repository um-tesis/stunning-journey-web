import {Grid, Typography} from '@mui/material';
import Chip from '@mui/material/Chip';
import Image from 'next/image';
import styles from './styles.module.scss';
import VerifiedIcon from '@mui/icons-material/Verified';

export default function About() {
  return (
    <Grid container spacing={2} className={styles.us}>
      <Grid item xs={12} md={6}>
        <div className={styles.imageSection}>
          <Image src='/vatos.jpeg' width={640} height={640} alt='image' />
        </div>
      </Grid>
      <Grid item xs={12} md={6}>
        <div className={styles.about}>
          <Grid container spacing={1} direction='row' sx={{mb: 0}} alignItems='center'>
            <Grid item>
              <VerifiedIcon fontSize='large' sx={{mr: 1, color: '#5d5a88'}} color='primary' />
            </Grid>
            <Grid item>
              <Typography
                variant='h4'
                noWrap
                sx={{
                  fontWeight: 700,
                  letterSpacing: '.3rem',
                  color: '#5d5a88',
                  textDecoration: 'none',
                }}
              >
                LIBERA
              </Typography>
            </Grid>
          </Grid>

          <Typography className={styles.aboutSection}>
            En Libera creemos en el poder de la generosidad para cambiar el mundo. Nuestra plataforma está
            diseñada para que los donantes puedan apoyar de forma fácil y segura a organizaciones benéficas
            que están marcando una diferencia real en la vida de las personas.
          </Typography>
          <Typography className={styles.aboutSection}>
            Somos un equipo de estudiantes de informática - Juan Martín Staricco, Joaquín Fernández y José
            Pedro Algorta - de la Universidad de Montevideo apasionados por el uso de la tecnología para crear
            un impacto social positivo. Fundamos Libera para facilitar a la gente la tarea de devolver algo a
            sus comunidades y apoyar las causas que les importan.
          </Typography>
          <Typography className={styles.aboutSection}>
            Con Libera, los donantes pueden buscar y donar fácilmente a una amplia gama de organizaciones
            benéficas y sin ánimo de lucro, sabiendo que sus donaciones van directamente a apoyar las causas
            que les importan. Nuestra plataforma también proporciona herramientas y recursos útiles para que
            las organizaciones gestionen sus donaciones y conecten con sus simpatizantes.
          </Typography>
          <Typography className={styles.aboutSection}>
            Estamos comprometidos con la creación de una plataforma transparente y responsable, en la que
            donantes y organizaciones puedan confiar en que sus donaciones tienen un impacto real. Únete a
            nosotros en nuestra misión de liberar el poder de la generosidad y marcar la diferencia en el
            mundo.
          </Typography>
          <Grid container spacing={3}>
            <Grid item>
              <Chip label='José Pedro Algorta' variant='outlined' sx={{color: '#5d5a88'}} />
            </Grid>
            <Grid item>
              <Chip label='Juan Martín Staricco' variant='outlined' sx={{color: '#5d5a88'}} />
            </Grid>
            <Grid item>
              <Chip label='Joaquín Fernandez' variant='outlined' sx={{color: '#5d5a88'}} />
            </Grid>
          </Grid>
        </div>
      </Grid>
    </Grid>
  );
}
