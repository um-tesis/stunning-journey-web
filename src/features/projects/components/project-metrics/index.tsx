import MetricCard from '@/features/shared/components/metric-card';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import PeopleIcon from '@mui/icons-material/People';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import QueryBuilderIcon from '@mui/icons-material/QueryBuilder';
import CardMembershipIcon from '@mui/icons-material/CardMembership';
import React from 'react';
import {Grid, Typography} from '@mui/material';

type Props = {
  project: any;
};

export default function ProjectMetrics({project}: Props) {
  const {
    moneyEarned,
    hoursVolunteered,
    activeSubscriptionsNumber,
    donatorsNumber,
    volunteersNumber,
    monthlyEarnedMoney,
  } = project;

  return (
    <>
      <Typography variant='h4' align='left' pb={2} px={10} color={'white'}>
        Sobre {project.name}
      </Typography>
      <Grid container spacing={3} px={10}>
        <Grid item xs={12} sm={4} px={3}>
          <MetricCard title='Recaudación Total' total={moneyEarned} icon={<AttachMoneyIcon />} />
        </Grid>
        <Grid item xs={12} sm={4} px={3}>
          <MetricCard title='Recaudación Mensual' total={monthlyEarnedMoney} icon={<CalendarMonthIcon />} />
        </Grid>
        <Grid item xs={12} sm={4} px={3}>
          <MetricCard
            title='Número de Voluntarios'
            total={volunteersNumber}
            icon={<VolunteerActivismIcon />}
          />
        </Grid>
      </Grid>

      <Grid container spacing={3} py={4} px={10}>
        <Grid item xs={12} sm={4} px={3}>
          <MetricCard title='Número de Donadores Totales' total={donatorsNumber} icon={<PeopleIcon />} />
        </Grid>
        <Grid item xs={12} sm={4} px={3}>
          <MetricCard
            title='Número de Suscripciones Activas'
            total={activeSubscriptionsNumber}
            icon={<CardMembershipIcon />}
          />
        </Grid>
        <Grid item xs={12} sm={4} px={3}>
          <MetricCard
            title='Horas totales de voluntariado'
            total={hoursVolunteered}
            icon={<QueryBuilderIcon />}
          />
        </Grid>
      </Grid>
    </>
  );
}
