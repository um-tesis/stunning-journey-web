import React, {useEffect} from 'react';
import styles from './styles.module.scss';
import {Paper} from '@mui/material';

type Props = {};

const InstagramFeedWidget = ({}: Props) => {
  useEffect(() => {
    const script = document.createElement('script');

    script.src = 'https://static.elfsight.com/platform/platform.js';
    script.setAttribute('data-use-service-core', '');
    script.defer = true;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <Paper className={styles.outerContainer} sx={{borderRadius: '3em'}} component='div'>
      <div className={styles.container}>
        <div id='elfsight-container' className='elfsight-app-189b2f33-cd71-4f56-881f-a62922746b19' />
        <div className={styles.box}></div>
      </div>
    </Paper>
  );
};

export default InstagramFeedWidget;
