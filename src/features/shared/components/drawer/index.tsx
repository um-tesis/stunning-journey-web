import React from 'react';
import styles from './styles.module.scss';
import {useRef, useEffect} from 'react';
import {classNamesFilter} from '@utils/ui-helper';
import {Box, useMediaQuery} from '@mui/material';
import {useTheme} from '@mui/material/styles';

type Props = {
  isOpen: boolean;
  children: React.ReactNode;
  onClose: () => void;
  className?: string;
  isLarge?: boolean;
};

const Drawer = ({isOpen, children, className, onClose, isLarge}: Props) => {
  const bodyRef = useRef(typeof window !== 'undefined' ? document.querySelector('body') : null);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));

  // Effect to disable the scroll of the page when the drawer is opened
  useEffect(() => {
    const updatePageScroll = () => {
      if (bodyRef && bodyRef.current) {
        bodyRef.current.style.overflow = isOpen ? 'hidden' : 'auto';
      }
    };
    updatePageScroll();
    // Cleanup function to re-enable scroll when the component unmounts
    return () => {
      if (bodyRef && bodyRef.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        bodyRef.current.style.overflow = 'auto';
      }
    };
  }, [isOpen]);

  const getDrawerClass = (className: string) => {
    if (className === 'pastReports') return styles.pastReportsDrawer;
    if (className === 'basicInfo') return styles.basicInfo;

    return className;
  };

  return (
    <Box aria-hidden={isOpen} className={classNamesFilter(styles.drawerContainer, isOpen && styles.open)}>
      <Box
        data-testid='drawer'
        className={classNamesFilter(styles.drawer, className && getDrawerClass(className), styles.right)}
        sx={{
          width: isSmallScreen ? '90%' : 500,
        }}
        role='dialog'
      >
        {children}
      </Box>
      <div data-testid='backdrop' className={styles.backdrop} onClick={onClose} />
    </Box>
  );
};

export default Drawer;
