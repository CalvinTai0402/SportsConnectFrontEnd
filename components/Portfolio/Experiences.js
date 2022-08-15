import useTranslation from 'next-translate/useTranslation';
import React, { Fragment } from 'react';
import Template from './Template';

export default function Experiences() {
  const { t } = useTranslation();
  return (
    <Fragment>
      <Template endpoint="/experiences" title={t('portfolio:experience')} />
    </Fragment>
  );
}
