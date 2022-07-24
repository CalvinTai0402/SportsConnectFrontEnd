import { useRouter } from "next/router";
import React, { useState, memo } from "react";
import useCsrfToken from "../../hooks/useCsrfToken";
import myAxiosPrivate from "../../axios/myAxiosPrivate";

export default memo(function CheckBox({
  checked,
  uniId,
  index,
  updateTickedUni,
}) {
  const [isChecked, setIsChecked] = useState(checked);
  const router = useRouter();
  let getCsrf = useCsrfToken();
  let handleOnChange = async (uniId) => {
    let csrfToken = await getCsrf();
    let myAxios = myAxiosPrivate(router, csrfToken);
    if (isChecked) {
      let res = await myAxios
        .delete(`/users/remove_interest_in/${uniId}`)
        .catch((e) => {
          return e.response;
        });
    } else {
      let res = await myAxios
        .post(`/users/interested_in/${uniId}`)
        .catch((e) => {
          return e.response;
        });
    }
    setIsChecked(!isChecked);
  };

  return (
    <input
      type="checkbox"
      checked={isChecked}
      onChange={() => {
        updateTickedUni(isChecked, uniId, index, updateTickedUni);
        handleOnChange(uniId);
      }}
    />
  );
});
