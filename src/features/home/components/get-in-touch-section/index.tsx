import GetInTouchModal from '@/features/shared/components/get-in-touch-modal';
import {Box} from '@mui/system';
import Image from 'next/image';
import {Container, Grid, useMediaQuery} from '@mui/material';
import {useTheme} from '@mui/material/styles';

type Props = {};

export default function GetInTouchSection({}: Props) {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box position='relative' my={5} sx={{backgroundColor: '#9795b5'}}>
      <Box position='relative' height={900} width='70%' sx={{display: isSmallScreen ? 'none' : 'block'}}>
        <Image src='/v1.webp' fill style={{objectFit: 'cover'}} alt='image' />
      </Box>
      <GetInTouchModal />
    </Box>
  );
}
