import useTranslation from 'next-translate/useTranslation';
import React, { Fragment, useEffect, useMemo, useRef, useState } from 'react';
import {
  getInterestedUniversities,
  getUniversities,
} from '../../network/lib/universities';
import Accordion from '../Accordion/Accordion';
import Table from '../Table/Table';
import CheckBox from './CheckBox';
import Spinner from '../Spinner';

export default function Universities({ unis }) {
  const { t } = useTranslation();
  const [allUnis, setAllUnis] = useState(unis);
  const [loading, setLoading] = useState(false);
  const [renderTable, setRenderTable] = useState(window.innerWidth > 1210);
  const [allOrIntersted, setAllOrInterested] = useState('all');
  const skipPageResetRef = useRef();
  const abortControllerRef = useRef(new AbortController());

  // Note that in this useEffect we do not setLoading because we have getStaticProps
  useEffect(() => {
    let fetchAllUnis = async (limit) => {
      let res = await getUniversities(limit, abortControllerRef.current);
      if (res?.status === 200) setAllUnis(transformUnis(res.data));
    };
    fetchAllUnis(-1);
    window.addEventListener('resize', greaterThan1210px);
    return () => {
      window.removeEventListener('resize', greaterThan1210px);
      abortControllerRef.current.abort();
    };
  }, []);

  let greaterThan1210px = () => {
    setRenderTable(window.innerWidth > 1210);
  };

  let transformUnis = (unis) => {
    let transformedUnis = unis.map((uni, index) => {
      return {
        ...uni,
        interested: (
          <CheckBox
            checked={uni.interested}
            uniId={uni.id}
            index={index}
            updateTickedUni={updateTickedUni}
          />
        ),
      };
    });
    return transformedUnis;
  };

  let updateTickedUni = (isChecked, uniId, index) => {
    skipPageResetRef.current = true;
    setAllUnis((prevAllUnis) => {
      let newAllUnis = [...prevAllUnis];
      newAllUnis[index] = {
        ...prevAllUnis[index],
        interested: (
          <CheckBox
            checked={!isChecked}
            uniId={uniId}
            index={index}
            updateTickedUni={updateTickedUni}
          />
        ),
      };
      return newAllUnis;
    });
  };

  let handleAllOrIntersted = async () => {
    let res;
    setLoading(true);
    if (allOrIntersted === 'all') {
      setAllOrInterested('interested');
      res = await getInterestedUniversities(-1, abortControllerRef.current);
    } else {
      setAllOrInterested('all');
      res = await getUniversities(-1, abortControllerRef.current);
    }
    if (res?.status === 200) {
      setLoading(false);
      setAllUnis(transformUnis(res.data));
    }
  };

  const columns = useMemo(
    () => [
      {
        Header: t('universities:name'),
        accessor: 'name',
      },
      {
        Header: t('universities:city'),
        accessor: 'city',
      },
      {
        Header: t('universities:state'),
        accessor: 'state',
      },
      {
        Header: t('universities:conference'),
        accessor: 'conference',
      },
      {
        Header: t('universities:division'),
        accessor: 'division',
      },
      {
        Header: t('universities:region'),
        accessor: 'region',
      },
      {
        Header: t('universities:category'),
        accessor: 'category',
      },
      {
        Header: t('universities:interested'),
        accessor: 'interested',
      },
    ],
    []
  );
  return (
    <Fragment>
      {loading ? (
        <div className="flex h-screen w-screen">
          <Spinner size={12} />
        </div>
      ) : (
        <section className="w-screen bg-gradient-to-br min-h-[68vh] p-8">
          {allOrIntersted === 'all' ? (
            <Fragment>
              <h1 className="text-center text-2xl mb-4">
                {t('universities:all_universities')}
              </h1>
              <p className="inline-flex justify-center w-full">
                <span
                  className="text-center text-sm mb-4 underline hover:cursor-pointer"
                  onClick={handleAllOrIntersted}
                >
                  {t('universities:only_show_interested')}
                </span>
              </p>
            </Fragment>
          ) : (
            <Fragment>
              <h1 className="text-center text-2xl mb-4">
                {t('universities:interested_universities')}{' '}
              </h1>
              <p className="inline-flex justify-center w-full">
                <span
                  className="text-center text-sm mb-4 underline hover:cursor-pointer"
                  onClick={handleAllOrIntersted}
                >
                  {t('universities:show_all')}
                </span>
              </p>
            </Fragment>
          )}
          {renderTable ? (
            <Table
              columns={columns}
              data={allUnis}
              skipPageResetRef={skipPageResetRef}
            />
          ) : (
            <Accordion unis={allUnis} />
          )}
        </section>
      )}
    </Fragment>
  );
}
