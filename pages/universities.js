import React, { Fragment } from 'react';
import UniversitiesGallery from '../components/Universities/UniversitiesGallery';
// import Universities from '../components/Universities/Universities';
import { getPublicUniversities } from '../network/lib/universities';

export default function universities({ unis }) {
  return (
    <Fragment>
      {/* <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
        <Universities unis={unis} />
      </div> */}
      <div className="mx-auto max-w-screen-xl max-h-screen-xl">
        <UniversitiesGallery />
      </div>
    </Fragment>
  );
}

export async function getStaticProps() {
  let res = await getPublicUniversities(500);
  return {
    props: {
      unis: res.data,
    },
  };
}
