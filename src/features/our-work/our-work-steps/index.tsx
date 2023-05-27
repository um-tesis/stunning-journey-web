import {Box, Typography} from '@mui/material';

export type OurWorkStepsProps = {
  title: string;
  description: string;
  Icon: React.ReactNode;
};

export default function OurWorkSteps({title, description, Icon}: OurWorkStepsProps) {
  return (
    <Box display='flex' alignItems='center' flexDirection='column' gap={3}>
      <Box fontSize={100}>{Icon}</Box>
      <Typography variant='h6' textAlign='center'>
        {title}
      </Typography>
      <Typography variant='body2'>{description}</Typography>
    </Box>
  );
}
