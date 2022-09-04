import React, { Fragment } from 'react';
import Portfolio from '../../../components/Portfolio/Portfolio';

export default function publicPortfolio() {
  return (
    <Fragment>
      <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
        <Portfolio />
      </div>
    </Fragment>
  );
}
