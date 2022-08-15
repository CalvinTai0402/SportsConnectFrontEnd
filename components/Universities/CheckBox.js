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

  return (
    <input
      type="checkbox"
      checked={isChecked}
      onChange={() => {
        setIsChecked(!isChecked);
        updateTickedUni(isChecked, uniId, index);
        handleOnChange(uniId);
      }}
    />
  );
});
