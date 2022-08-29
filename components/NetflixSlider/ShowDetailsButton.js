import React from 'react';
import IconArrowDown from './../Icons/IconArrowDown';

const ShowDetailsButton = ({ onClick }) => (
  <span
    onClick={onClick}
    className={`transition-opacity duration-300 ease-in delay-100 absolute bottom-0 left-0 right-0 opacity-0 bg-transparent border-none outline-none w-full show_details_button`}
  >
    <span className="block w-4 my-0 mx-auto text-white">
      <IconArrowDown />
    </span>
  </span>
);

export default ShowDetailsButton;
