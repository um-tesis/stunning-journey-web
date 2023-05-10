import {classNamesFilter} from '@/lib/utils/ui-helper';
import React from 'react';
import YouTube from 'react-youtube';
import styles from './styles.module.scss';

type Props = {
  videoId: string;
  auxClassNames?: string;
};

const VideoPlayer = ({videoId, auxClassNames}: Props) => {
  const src = videoId.split('v=')[1];

  const opts = {
    height: '360',
    width: '640',
    playerVars: {
      autoplay: 1,
      key: process.env.NEXT_PUBLIC_YOUTUBE_API_KEY,
      origin,
    },
  };

  return (
    <YouTube videoId={src} opts={opts} iframeClassName={classNamesFilter(auxClassNames ?? auxClassNames)} />
  );
};

export default VideoPlayer;
