import theme from '@/assets/styles/theme';
import {ArrowBack, NewReleases, Verified} from '@mui/icons-material';
import {Button, Card, CardContent, CardHeader, Grid, IconButton, Typography} from '@mui/material';
import Link from 'next/link';
import React from 'react';

type Props = {
  paymentId: string;
  status: 'approved' | 'pending' | 'rejected' | null;
  projectName: string;
};

const ThankYou = ({paymentId, status, projectName}: Props) => {
  return (
    <Grid container justifyContent='center' alignItems='center' padding={5} spacing={8}>
      <Grid item xs>
        <Link href='/'>
          <Button startIcon={<ArrowBack />}>Volver al Inicio</Button>
        </Link>
      </Grid>
      <Grid item xs={12} sx={{textAlign: 'center'}}>
        {status === 'approved' ? (
          <Verified sx={{fontSize: '15em', color: theme.palette.success.main}} />
        ) : (
          <NewReleases sx={{fontSize: '15em', color: theme.palette.warning.main}} />
        )}
      </Grid>
      <Grid item xs={12}>
        <Typography gutterBottom variant='h4' textAlign='center'>
          ¡Gracias por tu donación!
        </Typography>
        {status !== 'approved' && (
          <Typography variant='subtitle2' gutterBottom textAlign='center' color='primary'>
            Tu pago está pendiente de aprobación.
          </Typography>
        )}
        <Typography variant='h3' textAlign='center' fontWeight='bold' color='primary'>
          {projectName}
        </Typography>
      </Grid>
      <Grid item justifySelf='center'>
        <Card>
          <CardContent>
            <Typography sx={{fontSize: 14}} color='text.secondary' gutterBottom>
              Detalles de la donación
            </Typography>
            <Typography sx={{fontSize: 16}}>Estado: {status}</Typography>
            <Typography sx={{fontSize: 16}}>Payment ID: {paymentId}</Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default ThankYou;
