import {useState, useEffect} from 'react';

function getWindowDimensions(upperLim?: number, lowerLim?: number) {
  if (typeof window !== 'undefined') {
    const {innerWidth: width, innerHeight: height} = window;
    const upperPxLimit = upperLim || 1380;
    const lowerPxLimit = lowerLim || 830;
    return {
      width,
      height,
      isBigScreen: width > upperPxLimit,
      isMediumScreen: width <= upperPxLimit && width > lowerPxLimit,
      isSmallScreen: width <= lowerPxLimit,
    };
  } else
    return {
      width: undefined,
      height: undefined,
      isBigScreen: false,
      isMediumScreen: false,
      isSmallScreen: false,
    };
}

export default function useWindowDimensions(upperLim?: number, lowerLim?: number) {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions(upperLim, lowerLim));

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions(upperLim, lowerLim));
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [lowerLim, upperLim]);

  return windowDimensions;
}
