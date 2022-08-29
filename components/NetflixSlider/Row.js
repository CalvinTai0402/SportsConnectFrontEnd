import React from 'react';
import Spinner from '../Spinner';
import Item from './Item';
import Slider from './Slider';

export default function Row({ title, loading, data }) {
  return (
    <div className="pt-10 px-0 overflow-hidden relative">
      {!loading && (
        <span className="text-xl md:text-2xl text-slate-500 ml-4 xl:ml-0">
          {title}
        </span>
      )}
      {loading ? (
        <div>
          <Spinner />
        </div>
      ) : (
        <Slider>
          {data.map((datum) => (
            <Item datum={datum} key={datum.id} />
          ))}
        </Slider>
      )}
    </div>
  );
}
