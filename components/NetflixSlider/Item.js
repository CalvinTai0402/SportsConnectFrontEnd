import React from 'react';
import SliderContext from './context';
import ShowDetailsButton from './ShowDetailsButton';
import Mark from './Mark';
import Image from 'next/image';

const Item = ({ datum }) => (
  <SliderContext.Consumer>
    {({ onSelectSlide, currentSlide, elementRef }) => {
      const isActive = currentSlide && currentSlide.id === datum.id;

      return (
        <div
          ref={elementRef}
          onClick={() => onSelectSlide(datum)}
          className={`transition-transform duration-300 ease-in delay-100 relative item shadow-md mx-[2px]
          flex-[0_0_49.25%] sm:flex-[0_0_32.7%] md:flex-[0_0_24.525%] lg:flex-[0_0_19.63%] xl:flex-[0_0_16.35%] 2xl:flex-[0_0_13.95%]`}
        >
          <Image
            width={400}
            height={400}
            src={datum.backgroundImage}
            alt="university image"
            className="rounded-md"
          />
          <ShowDetailsButton />
          {isActive && <Mark />}
        </div>
      );
    }}
  </SliderContext.Consumer>
);

export default Item;
