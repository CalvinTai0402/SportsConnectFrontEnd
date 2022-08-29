import React, { useState } from 'react';
import SliderContext from './context';
import Content from './Content';
import SlideButton from './SlideButton';
import SliderWrapper from './SliderWrapper';
import useSliding from './useSliding';
import useSizeElement from './useSizeElement';

const Slider = ({ children, activeSlide }) => {
  const [currentSlide, setCurrentSlide] = useState(activeSlide);
  const { width, elementRef } = useSizeElement();
  const { handlePrev, handleNext, slideProps, containerRef, hasNext, hasPrev } =
    useSliding(width, React.Children.count(children));

  const handleSelect = (datum) => {
    if (currentSlide && datum.id == currentSlide.id) setCurrentSlide(null);
    else setCurrentSlide(datum);
  };

  const handleClose = () => {
    setCurrentSlide(null);
  };

  const contextValue = {
    onSelectSlide: handleSelect,
    onCloseSlide: handleClose,
    elementRef,
    currentSlide,
  };

  return (
    <SliderContext.Provider value={contextValue}>
      {children.length > 0 ? (
        <SliderWrapper>
          <div className={`flex relative slider`}>
            <div
              ref={containerRef}
              className={`flex px-[55px] transition-transform duration-300 ease-in delay-100 z-3`}
              {...slideProps}
            >
              {children}
            </div>
          </div>

          {hasPrev ? (
            <SlideButton onClick={handlePrev} type="prev" />
          ) : (
            <SlideButton type="prev" />
          )}
          {hasNext && <SlideButton onClick={handleNext} type="next" />}
        </SliderWrapper>
      ) : (
        <div className="text-slate-500 my-2 m-4 xl:m-0">No results</div>
      )}
      {currentSlide && (
        <div className="relative h-[70vw] sm:h-[50vw] lg:h-[40vw] xl:h-[30vw] -mt-5 ">
          <Content uni={currentSlide} onClose={handleClose} />
        </div>
      )}
    </SliderContext.Provider>
  );
};

export default Slider;
