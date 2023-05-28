/* eslint-disable @next/next/no-img-element */
import React from 'react';
import styles from './styles.module.scss'; // adjust the path to match your file structure
import {Grid, ImageList, ImageListItem} from '@mui/material';
import Image from 'next/image';

const ImagesMasonry = () => {
  const images = [
    '/ayudar.png',
    '/collaboration.jpeg',
    '/help.jpeg',
    '/tacu1.jpeg',
    '/tacu2.jpeg',
    '/manos.jpeg',
  ];

  const breakpointColumnsObj = {
    default: 3,
    1100: 2,
    700: 1,
    500: 1,
  };

  return (
    <ImageList variant='masonry' cols={3} gap={16}>
      {images.length > 0 &&
        images.map((image, i) => (
          <ImageListItem key={i}>
            <img src={image} srcSet={`${image} 2x`} alt={`Masonry item ${i}`} loading='lazy' />
          </ImageListItem>
        ))}
    </ImageList>
  );
};

export default ImagesMasonry;
