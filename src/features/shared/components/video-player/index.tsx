import {classNamesFilter} from '@/lib/utils/ui-helper';
import React from 'react';
import YouTube from 'react-youtube';
import {Box} from '@mui/material';

type Props = {
  videoId: string;
  height?: string;
  width?: string;
  auxClassNames?: string;
};

const VideoPlayer = ({videoId, height = '630', width, auxClassNames}: Props) => {
  const src = videoId.split('v=')[1];

  const opts = {
    height,
    width,
    playerVars: {
      key: process.env.NEXT_PUBLIC_YOUTUBE_API_KEY,
      origin,
    },
  };

  return (
    <Box height='100%'>
      <YouTube videoId={src} opts={opts} iframeClassName={classNamesFilter(auxClassNames ?? auxClassNames)} />
    </Box>
  );
};

export default VideoPlayer;
