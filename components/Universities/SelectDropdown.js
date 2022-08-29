import React from 'react';
import Select from 'react-select';

export default function SelectDropdown({
  selected,
  setSelected,
  options,
  isSearchable,
  label,
  className,
  titleClassName,
}) {
  return (
    <>
      <div className={'my-auto ' + titleClassName}>{label}:</div>
      <Select
        className={'my-auto ' + className}
        defaultValue={selected}
        isSearchable={isSearchable}
        name="category"
        options={options}
        onChange={setSelected}
      />
    </>
  );
}
