import React, { Fragment, useEffect, useRef, useState } from 'react';
import Content from './Content';

export default function DetailModal({ display, uni, updateTickedUni }) {
  const [showModal, setShowModal] = useState(false);
  // workaround for react-select z-index weird issue
  const displayRef = useRef(null);
  const executeScroll = () => {
    displayRef.current.scrollIntoView();
  };
  const firstMount = useRef(true);

  useEffect(() => {
    if (firstMount.current) {
      firstMount.current = false;
      return;
    }
    if (showModal) {
      document.body.style.overflow = 'hidden';
    } else if (!showModal && !firstMount.current) {
      document.body.style.overflow = 'unset';
    }
  }, [showModal]);
  // workaround for react-select z-index weird issue
  return (
    <Fragment>
      {display && (
        <span
          className="w-1/3 hover:cursor-pointer"
          onClick={() => {
            executeScroll();
            setShowModal(true);
          }}
          ref={displayRef}
        >
          {display}
        </span>
      )}
      {showModal ? (
        <>
          <div
            className="fixed top-0 bottom-0 left-0 right-0 bg-[#00000066] flex justify-center items-center z-[200]"
            onClick={() => {
              setShowModal(false);
            }}
          >
            <div
              className="relative h-[70vw] sm:h-[60vw] lg:h-[40vw] xl:h-[32vw] 2xl:h-[30vw] w-[90%] -mt-5 rounded-md"
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <Content
                uni={uni}
                onClose={() => setShowModal(false)}
                updateTickedUni={updateTickedUni}
              />
            </div>
          </div>
        </>
      ) : null}
    </Fragment>
  );
}
