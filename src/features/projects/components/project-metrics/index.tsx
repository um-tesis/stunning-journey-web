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
    fixedEarningsWithSubscriptions,
    activeSubscriptionsNumber,
    donatorsNumber,
    volunteersNumber,
    monthlyEarnedMoney,
  } = project;

  return (
    <Grid container spacing={3} px={10} py={5}>
      <Grid item xs={12} pb={-5}>
        <Typography variant='h4' color={'white'}>
          Métricas
        </Typography>
      </Grid>
      <Grid item xs={12} md={6} lg={4}>
        <MetricCard
          title='Recaudación con donaciones'
          total={`$ ${moneyEarned / 100}`}
          icon={<AttachMoneyIcon />}
        />
      </Grid>
      <Grid item xs={12} md={6} lg={4}>
        <MetricCard title='Número de donantes totales' total={donatorsNumber} icon={<PeopleIcon />} />
      </Grid>
      <Grid item xs={12} md={6} lg={4}>
        <MetricCard
          title='Recaudación este mes'
          total={`$ ${monthlyEarnedMoney / 100}`}
          icon={<CalendarMonthIcon />}
        />
      </Grid>
      <Grid item xs={12} md={6} lg={4}>
        <MetricCard
          title='Número de suscripciones activas'
          total={activeSubscriptionsNumber}
          icon={<CardMembershipIcon />}
        />
      </Grid>
      <Grid item xs={12} md={6} lg={4}>
        <MetricCard
          title='Recaudación con subscripciones / mes'
          total={`$ ${fixedEarningsWithSubscriptions / 100}`}
          icon={<QueryBuilderIcon />}
        />
      </Grid>
      <Grid item xs={12} md={6} lg={4}>
        <MetricCard title='Número de voluntarios' total={volunteersNumber} icon={<VolunteerActivismIcon />} />
      </Grid>
    </Grid>
  );
}
