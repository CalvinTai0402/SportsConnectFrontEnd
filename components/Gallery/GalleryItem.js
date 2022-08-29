import Image from 'next/image';
import React from 'react';
import DetailModal from './DetailModal';

export default function GalleryItem({ datum, updateTickedUni }) {
  let display = datum && (
    <div className="flex flex-wrap">
      <div className="w-full p-1 md:p-2 shadow-xl rounded-lg">
        <Image
          width={500}
          height={300}
          alt="university image"
          className="block object-cover object-center rounded-lg"
          src={datum.backgroundImage}
        />
        <span className="flex text-[10px] sm:text-sm">
          <span className="mx-auto italic">{datum.name}</span>
        </span>
      </div>
    </div>
  );

  return (
    <DetailModal
      display={display}
      uni={datum}
      updateTickedUni={updateTickedUni}
    />
  );
}
