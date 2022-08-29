import { useState, useRef, useEffect } from 'react';

const PADDINGS = 110;

const useSliding = (elementWidth, countElements) => {
  const containerRef = useRef(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const [distance, setDistance] = useState(0);
  const [totalInViewport, setTotalInViewport] = useState(0);
  const [viewed, setViewed] = useState(0);

  useEffect(() => {
    setStates();
    window.addEventListener('resize', reset);
    return () => {
      window.removeEventListener('resize', reset);
    };
  }, [containerRef.current?.clientWidth]);

  let resetStates = async () => {
    setContainerWidth(0);
    setDistance(0);
    setTotalInViewport(0);
    setViewed(0);
  };

  let setStates = async () => {
    const containerWidth = containerRef.current?.clientWidth - PADDINGS;
    setContainerWidth(containerWidth);
    setTotalInViewport(Math.floor(containerWidth / elementWidth));
  };

  let reset = () => {
    let _reset = async () => {
      await resetStates();
      setStates();
    };
    _reset();
  };

  const handlePrev = () => {
    setViewed(viewed - totalInViewport);
    setDistance(distance + containerWidth);
  };

  const handleNext = () => {
    setViewed(viewed + totalInViewport);
    setDistance(distance - containerWidth);
  };

  const slideProps = {
    style: { transform: `translate3d(${distance}px, 0, 0)` },
  };

  const hasPrev = distance < 0;
  const hasNext = viewed + totalInViewport < countElements;
  return { handlePrev, handleNext, slideProps, containerRef, hasPrev, hasNext };
};

export default useSliding;
