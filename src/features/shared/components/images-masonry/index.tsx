/* eslint-disable @next/next/no-img-element */
import React from 'react';
import Masonry from 'react-masonry-css';
import styles from './styles.module.scss'; // adjust the path to match your file structure

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
    <Masonry
      breakpointCols={breakpointColumnsObj}
      className={styles.masonryGrid}
      columnClassName={styles.masonryGridColumn}
    >
      {images.length > 0 &&
        images.map((image, i) => (
          <div key={i}>
            <img src={image} alt={`Masonry item ${i}`} />
          </div>
        ))}
    </Masonry>
  );
};

export default ImagesMasonry;
