import React, { useEffect, useRef, useState } from 'react';
import {
  getInterestedUniversities,
  getUniversities,
} from '../../network/lib/universities';
import useTranslation from 'next-translate/useTranslation';
import InfiniteScroll from 'react-infinite-scroll-component';
import Spinner from '../Spinner';
import chunk from '../../utilities/chunk';
import GalleryRow from '../Gallery/GalleryRow';
import { DebounceInput } from 'react-debounce-input';
// import Rows from '../NetflixSlider/Rows';
import {
  cateGoryOptions,
  conferenceOptions,
  stateOptions,
  regionOptions,
  divisionOptions,
} from './data';
import SelectDropdown from './SelectDropdown';

export default function UniversitiesGallery({ mine }) {
  const [allUnis, setAllUnis] = useState([]);
  const [searchIndex, setSearchIndex] = useState(24);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(cateGoryOptions[0]);
  const [selectedConference, setSelectedConference] = useState(
    conferenceOptions[0]
  );
  const [selectedState, setSelectedState] = useState(stateOptions[0]);
  const [selectedRegion, setSelectedRegion] = useState(regionOptions[0]);
  const [selectedDivision, setSelectedDivision] = useState(divisionOptions[0]);
  const [search, setSearch] = useState('');
  const abortControllerRef = useRef(new AbortController());
  const { t } = useTranslation();

  const searchedUnis = filterUni(transformUnis(allUnis), search);

  useEffect(() => {
    let fetchAllUnis = async (limit) => {
      setLoading(true);
      let res;
      if (mine) {
        res = await getInterestedUniversities(
          limit,
          abortControllerRef.current
        );
      } else {
        res = await getUniversities(limit, abortControllerRef.current);
      }
      if (res?.status === 200) {
        setAllUnis(res.data);
      }
      setLoading(false);
    };
    fetchAllUnis(-1);
    return () => {
      abortControllerRef.current.abort();
    };
  }, []);

  useEffect(() => {
    // if (searchIndex !== 24) setSearchIndex(24); // to force rerender
    // else {
    //   setSearchIndex(18);
    // }
    setHasMore(true);
    setSearchIndex(24);
  }, [
    search,
    selectedCategory,
    selectedConference,
    selectedDivision,
    selectedRegion,
    selectedState,
  ]);

  useEffect(() => {
    console.log(loading, searchIndex, searchedUnis.length);
    if (searchIndex > searchedUnis.length) setHasMore(false);
    else {
      setHasMore(true);
    }
  }, [searchIndex, searchedUnis]);

  function transformUnis(unis) {
    let transformedUnis = {};
    unis.map((uni, index) => {
      let uniObj = {
        ...uni,
        index: index,
        backgroundImage: `/backgrounds/${uni.name}.jpg`,
        blurredBackgroundImage: `/blurredBackgrounds/${uni.name}.jpg`,
        logo: `/logos/${uni.name}.png`,
        blurredLogo: `/blurredLogos/${uni.name}.png`,
      };
      if (uni.name in transformedUnis) {
        uniObj.name =
          `(${t('universities:men')}, ${t('universities:women')}) ` + uni.name;
        uniObj.category = 'Men, Women';
        uniObj.prev = transformedUnis[uni.name];
      } else {
        let uniCategory = '';
        if (uni.category === 'Men') {
          uniCategory = t('universities:men');
        } else {
          uniCategory = t('universities:women');
        }
        uniObj.name = '(' + uniCategory + ') ' + uni.name;
      }
      transformedUnis[uni.name] = uniObj;
    });

    return Object.keys(transformedUnis).map((k) => {
      return transformedUnis[k];
    });
  }

  let updateTickedUni = (isChecked, index) => {
    setAllUnis((prevAllUnis) => {
      let newAllUnis = [...prevAllUnis];
      newAllUnis[index] = {
        ...prevAllUnis[index],
        interested: !isChecked,
      };
      return newAllUnis;
    });
  };

  // needs to use the "function" keyword to allow hoisting
  function filterUni(unis, search) {
    let filteredUnis = unis;
    if (selectedCategory.value !== 'all') {
      filteredUnis = filteredUnis.filter(
        (uni) => uni.category.toLowerCase() === selectedCategory.value
      );
    }
    if (selectedConference.value !== 'all') {
      filteredUnis = filteredUnis.filter(
        (uni) => uni.conference.toLowerCase() === selectedConference.value
      );
    }
    if (selectedState.value !== 'all') {
      filteredUnis = filteredUnis.filter(
        (uni) => uni.state.toLowerCase() === selectedState.value
      );
    }
    if (selectedRegion.value !== 'all') {
      filteredUnis = filteredUnis.filter(
        (uni) => uni.region.toLowerCase() === selectedRegion.value
      );
    }
    if (selectedDivision.value !== 'all') {
      filteredUnis = filteredUnis.filter(
        (uni) => uni.division.toLowerCase() === selectedDivision.value
      );
    }
    search = search.toLowerCase();
    if (search !== '') {
      filteredUnis = filteredUnis.filter(
        (uni) =>
          uni.name.toLowerCase().includes(search) ||
          uni.city.toLowerCase().includes(search)
      );
    }
    if (mine) {
      let i = 0;
      while (i < filteredUnis.length) {
        if (
          (!filteredUnis[i].interested && !filteredUnis[i].prev) ||
          (!filteredUnis[i].interested &&
            filteredUnis[i].prev &&
            !filteredUnis[i].prev.interested)
        ) {
          filteredUnis.splice(i, 1);
        } else {
          i++;
        }
      }
    }
    return filteredUnis;
  }

  return (
    <div className="min-h-[80vw]">
      <div className="flex text-xs md:text-base ml-4 mb-4 mt-4">
        <span className="my-auto">
          <div className={'my-auto'}>{t('universities:search')}:</div>
          <DebounceInput
            debounceTimeout={1000}
            type="text"
            placeholder={
              t('universities:search') +
              ' ' +
              t('universities:uni_or_city_name') +
              ' ...'
            }
            value={search || ''}
            className="xl:ml-0 max-w-xl text-sm md:text-base rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            onChange={(e) => setSearch(e.target.value)}
          />
        </span>
        <span className="w-full md:w-1/3 my-auto">
          <SelectDropdown
            selected={selectedCategory}
            setSelected={setSelectedCategory}
            options={cateGoryOptions}
            isSearchable={false}
            label={t('universities:category')}
            className="ml-4 z-[12] mr-4"
            titleClassName="ml-4"
          />
        </span>
        <span className="w-1/3 my-auto hidden md:block">
          <SelectDropdown
            selected={selectedDivision}
            setSelected={setSelectedDivision}
            options={divisionOptions}
            isSearchable={false}
            label={t('universities:division')}
            className="z-[12]"
          />
        </span>
        <span className="w-2/3 my-auto mr-4 hidden md:block">
          <SelectDropdown
            selected={selectedConference}
            setSelected={setSelectedConference}
            options={conferenceOptions}
            isSearchable={false}
            label={t('universities:conference')}
            className="ml-4 z-[12]"
            titleClassName="ml-4"
          />
        </span>
      </div>
      <div className="flex text-xs md:text-base mb-4">
        <span className="w-1/3 ml-4">
          <SelectDropdown
            selected={selectedState}
            setSelected={setSelectedState}
            options={stateOptions}
            isSearchable={false}
            label={t('universities:state')}
            className="z-[11]"
          />
        </span>
        <span className="w-2/3 mr-4">
          <SelectDropdown
            selected={selectedRegion}
            setSelected={setSelectedRegion}
            options={regionOptions}
            isSearchable={false}
            label={t('universities:region')}
            className="ml-4 z-[11]"
            titleClassName="ml-4"
          />
        </span>
      </div>
      <div className="flex text-xs md:text-base mb-4 md:hidden">
        <span className="w-1/3 ml-4">
          <SelectDropdown
            selected={selectedDivision}
            setSelected={setSelectedDivision}
            options={divisionOptions}
            isSearchable={false}
            label={t('universities:division')}
            className="z-[10]"
          />
        </span>
        <span className="w-2/3 mr-4">
          <SelectDropdown
            selected={selectedConference}
            setSelected={setSelectedConference}
            options={conferenceOptions}
            isSearchable={false}
            label={t('universities:conference')}
            className="ml-4 z-[10]"
            titleClassName="ml-4"
          />
        </span>
      </div>
      {loading ? (
        <Spinner />
      ) : (
        <InfiniteScroll
          dataLength={searchIndex}
          next={() => {
            setSearchIndex((prev) => prev + 9);
          }}
          hasMore={hasMore}
          endMessage={
            <span className="flex justify-center">
              <p className="p-4 max-auto text-slate-500">
                No more universities
              </p>
            </span>
          }
          loader={<Spinner />}
        >
          {chunk(searchedUnis.slice(0, searchIndex), 3).map(
            (uniChunk, index) => (
              <GalleryRow
                key={uniChunk[0].id}
                dataChunk={uniChunk}
                updateTickedUni={updateTickedUni}
              />
            )
          )}
        </InfiniteScroll>
        // <Rows loading={loading} data={allUnis} filterUni={filterUni} />
      )}
    </div>
  );
}
