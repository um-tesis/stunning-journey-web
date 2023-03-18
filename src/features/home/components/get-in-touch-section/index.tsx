import GetInTouchModal from '@/features/shared/components/get-in-touch-modal';
import {Box} from '@mui/system';
import Image from 'next/image';
import styles from './styles.module.scss';

type Props = {};

export default function GetInTouchSection({}: Props) {
  return (
    <Box width={'100%'} sx={{backgroundColor: '#fff'}} className={styles.sectionContent}>
      <Image src='/tacu2.jpeg' width={1100} height={745} alt='image' />
      <GetInTouchModal />
    </Box>
  );
}
