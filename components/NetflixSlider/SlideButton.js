import React from 'react';
import IconArrowDown from './../Icons/IconArrowDown';

const SlideButton = ({ onClick, type }) => {
  let nextOrPrev;
  let nextOrPrevSpan;
  if (type === 'next') {
    nextOrPrev = 'right-0';
    nextOrPrevSpan = 'rotate-[-90deg]';
  } else if (type === 'prev') {
    nextOrPrev = 'left-0';
    nextOrPrevSpan = 'rotate-90';
  }
  if (!onClick) {
    return (
      <span
        className={`absolute  w-[55px] bg-[#00000040] border-none outline-none p-0 z-[4] h-[75%] top-1/2 translate-y-[-50%]`}
      ></span>
    );
  }

  return (
    <span
      className={`absolute w-[55px] bg-[#00000040] border-none outline-none p-0 mx-0 z-[4] hover:cursor-pointer h-[75%] top-1/2 translate-y-[-50%] ${nextOrPrev}`}
      onClick={onClick}
    >
      <span
        className={`w-[25px] absolute top-1/2 translate-y-[-50%] translate-x-1/2 text-white block outline-none ${nextOrPrevSpan}`}
      >
        <IconArrowDown />
      </span>
    </span>
  );
};

export default SlideButton;
