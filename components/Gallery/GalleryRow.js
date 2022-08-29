import React from 'react';
import GalleryItem from './GalleryItem';

export default function GalleryRow({ dataChunk, updateTickedUni }) {
  return (
    <>
      <section className="overflow-hidden text-gray-700 ">
        <div className="px-5 xl:px-3 py-2 mx-auto">
          <div className="flex flex-wrap m-1">
            <GalleryItem
              datum={dataChunk[0]}
              updateTickedUni={updateTickedUni}
            />
            <GalleryItem
              datum={dataChunk[1]}
              updateTickedUni={updateTickedUni}
            />
            <GalleryItem
              datum={dataChunk[2]}
              updateTickedUni={updateTickedUni}
            />
          </div>
        </div>
      </section>
    </>
  );
}
