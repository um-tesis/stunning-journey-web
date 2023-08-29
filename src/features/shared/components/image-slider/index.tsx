/* eslint-disable @next/next/no-img-element */
import React from 'react';
import Carousel from 'nuka-carousel';
import styles from './styles.module.scss';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import {classNamesFilter} from '@/lib/utils/ui-helper';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import PauseCircleIcon from '@mui/icons-material/PauseCircle';

type Props = {
  images: string[];
  containerClassName?: string;
  carouselImageClassName?: string;
};

export default function ImageSlider({images, containerClassName, carouselImageClassName}: Props) {
  const [autoplayEnabled, setAutoplayEnabled] = React.useState(true);

  const settings = {
    adaptiveHeightAnimation: true,
    autoplay: autoplayEnabled,
    autoplayInterval: 3000,
    wrapAround: true,
    slidesToShow: 1,
    renderCenterLeftControls: ({previousSlide}: any) => (
      <div onClick={previousSlide} className={styles.carouselControl}>
        <NavigateBeforeIcon />
      </div>
    ),
    renderCenterRightControls: ({nextSlide}: any) => (
      <div onClick={nextSlide} className={styles.carouselControl}>
        <NavigateNextIcon />
      </div>
    ),
    renderBottomLeftControls: () => (
      <div onClick={() => setAutoplayEnabled(!autoplayEnabled)} className={styles.autoplayControl}>
        {autoplayEnabled ? <PauseCircleIcon /> : <PlayCircleIcon />}
      </div>
    ),
  };

  return (
    <div className={classNamesFilter(styles.carouselContainer, containerClassName)}>
      <Carousel {...settings}>
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt='project-image'
            className={classNamesFilter(styles.carouselImage, carouselImageClassName)}
          />
        ))}
      </Carousel>
    </div>
  );
}
