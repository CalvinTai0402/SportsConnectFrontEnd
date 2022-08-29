import React, { useState, memo } from 'react';
import {
  expressInterestInUni,
  removeInterestInUni,
} from '../../network/lib/users';

export default memo(function CheckBox({
  checked,
  uniId,
  index,
  updateTickedUni,
}) {
  const [isChecked, setIsChecked] = useState(checked);
  let handleOnChange = async (uniId) => {
    if (isChecked) {
      await removeInterestInUni(uniId);
    } else {
      await expressInterestInUni(uniId);
    }
  };

  let bounce = !isChecked ? ' animate-bounce' : '';

  return (
    <input
      type="checkbox"
      className={'w-4 h-4 md:h-6 md:w-6 lg:w-7 lg:h-7' + bounce}
      checked={isChecked}
      onChange={() => {
        setIsChecked(!isChecked);
        updateTickedUni(isChecked, index);
        handleOnChange(uniId);
      }}
    />
  );
});
