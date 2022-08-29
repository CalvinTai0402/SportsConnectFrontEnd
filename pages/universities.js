import React, { Fragment } from 'react';
import UniversitiesGallery from '../components/Universities/UniversitiesGallery';

export default function universities() {
  return (
    <Fragment>
      <div className="mx-auto max-w-screen-xl max-h-screen-xl">
        <UniversitiesGallery />
      </div>
    </Fragment>
  );
}
