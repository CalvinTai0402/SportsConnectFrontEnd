import React, { useState } from 'react';
import Row from './Row';

export default function Rows({ loading, data, filterUni }) {
  return (
    <>
      <Row
        title={'Colorado'}
        data={filterUni(data, 'colorado').slice(0, 50)}
        loading={loading}
      />
      <Row
        title={'Texas'}
        data={filterUni(data, 'texas').slice(0, 50)}
        loading={loading}
      />
      <Row
        title={'California'}
        data={filterUni(data, 'california').slice(0, 50)}
        loading={loading}
      />
    </>
  );
}
