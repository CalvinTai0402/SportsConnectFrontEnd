import useTranslation from 'next-translate/useTranslation';
import Image from 'next/image';
import React from 'react';
import CheckBox from '../Universities/CheckBox';
import IconCross from './../Icons/IconCross';

const Content = ({ uni, onClose, updateTickedUni }) => {
  const { t } = useTranslation();
  const checkBox = (
    <CheckBox
      checked={uni.interested}
      uniId={uni.id}
      index={uni.index}
      updateTickedUni={updateTickedUni}
    />
  );
  if (uni.prev) {
    // var for more scope
    var prevCheckBox = (
      <CheckBox
        checked={uni.prev.interested}
        uniId={uni.prev.id}
        index={uni.prev.index}
        updateTickedUni={updateTickedUni}
      />
    );
  }
  return (
    <>
      <div>
        <div className="rounded-l-xl absolute top-0 bottom-0 left-0 bg-slate-900 w-[30%] z-[2] before:absolute before:z-10 before:bg-gradient-to-r from-slate-900 to-transparent before:top-0 before:bottom-0 before:left-full before:w-60" />
        <div className="absolute top-0 bottom-0 right-0 w-[70%] bg-repeat-round z-[1] rounded-r-xl">
          <Image
            src={uni.backgroundImage}
            className="bg-repeat-round rounded-r-xl"
            alt="University image"
            layout="fill"
          />
        </div>
        {/* w-[20%] h-[25%] sm:w-[16%] sm:h-[30%] lg:w-[14%] lg:h-[30%] xl:w-[10%] xl:h-[30%] */}
        <span className="absolute bottom-0 right-0 sm:left-0 w-24 h-24 z-[2] m-4">
          <Image src={uni.logo} alt="University logo" layout="fill" />
        </span>
      </div>
      <div className="text-sm md:text-lg absolute top-0 bottom-0 left-0 right-0 h-full z-[3]">
        <div className="px-4 py-6 lg:py-10 text-[#f5deb3] w-[70%]">
          <h1 className="text-[#fff] font-[45px] font-bold mb-6">
            {uni.name.substring(uni.name.indexOf(')') + 2)}
          </h1>
          <div className="text-[#d4d3d3] font-[18px] mt-2 max-w-xs sm:max-w-sm md:max-w-md">
            <span className="text-white">{t('universities:category')}:</span>{' '}
            {uni.category}
          </div>
          <div className="text-[#d4d3d3] font-[18px] mt-2 max-w-xs sm:max-w-sm md:max-w-md">
            <span className="text-white">{t('universities:conference')}:</span>{' '}
            {uni.conference}
          </div>
          <div className="text-[#d4d3d3] font-[18px] mt-2 max-w-xs sm:max-w-sm md:max-w-md">
            <span className="text-white">{t('universities:division')}:</span>{' '}
            {uni.division}
          </div>
          <div className="text-[#d4d3d3] font-[18px] mt-2 max-w-xs sm:max-w-sm md:max-w-md">
            <span className="text-white mr-2">{t('universities:city')}:</span>
            {uni.city}
          </div>
          <div className="text-[#d4d3d3] font-[18px] mt-2 max-w-xs sm:max-w-sm md:max-w-md">
            <span className="text-white mr-2">{t('universities:state')}:</span>
            {uni.state}
          </div>
          {uni.prev && (
            <div className="text-[#d4d3d3] font-[18px] mt-2 max-w-xs sm:max-w-sm md:max-w-md">
              <span className="text-white mr-2">
                {t('universities:interested')}: ({uni.prev.category})
              </span>
              {prevCheckBox && prevCheckBox}
            </div>
          )}
          <div className="text-[#d4d3d3] font-[18px] mt-2 max-w-xs sm:max-w-sm md:max-w-md">
            <span className="text-white mr-2">
              {t('universities:interested')}:{' '}
              {uni.prev && (uni.prev.category === 'Men' ? '(Women)' : '(Men)')}
            </span>
            {checkBox}
          </div>
        </div>
        <button
          className="text-gray-200 w-4 h-4 md:w-6 md:h-6 top-2 right-2 md:top-4 md:right-4 absolute border-none outline-none bg-transparent"
          onClick={onClose}
        >
          <IconCross />
        </button>
      </div>
    </>
  );
};

export default Content;
