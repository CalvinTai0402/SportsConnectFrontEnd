import React, { Fragment, useEffect, useRef, useState } from 'react';
// https://www.npmjs.com/package/react-onclickoutside

let listenForOutsideClick = (listening, setListening, menuRef, setIsOpen) => {
  return () => {
    if (listening) return;
    if (!menuRef.current || !menuRef) return;
    setListening(true);
    document.addEventListener(`click`, (evt) => {
      if (menuRef?.current?.contains(evt.target)) return;
      setIsOpen(false);
    });
  };
};

export default function SelectDropdown({
  selected,
  setSelected,
  options,
  label,
  className,
  titleClassName,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [listening, setListening] = useState(false);

  const onOptionClicked = (option) => () => {
    setSelected(option);
    setIsOpen(false);
  };

  const menuRef = useRef(null);
  useEffect(listenForOutsideClick(listening, setListening, menuRef, setIsOpen));

  return (
    <Fragment>
      <h1 className={titleClassName}>{label}</h1>
      <div ref={menuRef}>
        <div
          className={
            'rounded-md outline outline-1 p-2 ' +
            className +
            ' ' +
            (isOpen ? 'outline-blue-700' : 'outline-gray-300')
          }
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="flex justify-between">
            <span>
              <div className="truncate max-w-[12rem] 500:max-w-[16rem] max-w">
                {selected.label}
              </div>
            </span>
            <svg
              className="my-auto w- h-4 text-black"
              aria-hidden="true"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              ></path>
            </svg>
          </span>
        </div>
        {isOpen && (
          <div className={'relative rounded-md shadow-lg ' + className}>
            <ul className="absolute left-0 top-2 w-full overflow-auto max-h-60 z-[199] bg-white shadow-xl rounded-md outline outline-1 outline-gray-300">
              {options.map((option, index) => {
                let selectedClassName =
                  selected.label === option.label
                    ? 'bg-blue-500 text-white'
                    : '';
                return (
                  <li
                    className={
                      'list-none p-2 md:text-lg font-light hover:bg-blue-100 ' +
                      selectedClassName
                    }
                    onClick={onOptionClicked(option)}
                    key={index}
                  >
                    {option.label}
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>
    </Fragment>
  );
}
