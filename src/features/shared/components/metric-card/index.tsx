import {alpha, styled} from '@mui/material/styles';
import {Box, Card, Typography} from '@mui/material';
import React from 'react';

const StyledIcon = styled('div')(({theme}) => ({
  margin: 'auto',
  display: 'flex',
  borderRadius: '50%',
  alignItems: 'center',
  width: theme.spacing(8),
  height: theme.spacing(8),
  justifyContent: 'center',
  marginBottom: theme.spacing(3),
}));

type Props = {
  color?: string;
  icon?: React.ReactNode;
  title: string;
  total: number;
  sx?: object;
};

export default function MetricCard({title, total, icon, color = 'primary', sx, ...other}: Props) {
  return (
    <Card
      sx={{
        py: 5,
        boxShadow: 0,
        textAlign: 'center',
        borderRadius: 6,
        ...sx,
      }}
      {...other}
    >
      <StyledIcon
        sx={{
          backgroundImage: (theme: any) =>
            `linear-gradient(135deg, ${alpha(theme.palette[color].dark, 0)} 0%, ${alpha(
              theme.palette[color].dark,
              0.24
            )} 100%)`,
        }}
      >
        <Box sx={{width: 30, height: 25, ...sx}} {...other}>
          {icon}
        </Box>
      </StyledIcon>

      <Typography variant='h3'>{total}</Typography>

      <Typography variant='subtitle2' sx={{opacity: 0.72}}>
        {title}
      </Typography>
    </Card>
  );
}
