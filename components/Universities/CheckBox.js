import { useRouter } from "next/router";
import React, { useState, memo } from "react";
import useCsrfToken from "../../hooks/useCsrfToken";
import useMyAxios from "../../hooks/useMyAxios";

export default memo(function CheckBox({ checked, uniId, index, updateMemo }) {
  const [isChecked, setIsChecked] = useState(checked);
  const router = useRouter();
  let getCsrf = useCsrfToken();
  let handleOnChange = async (uniId) => {
    let csrfToken = await getCsrf();
    let myAxios = useMyAxios(router, csrfToken);
    if (isChecked) {
      console.log("remove");
      let res = await myAxios
        .delete(`/users/remove_interest_in/${uniId}`)
        .catch((e) => {
          return e.response;
        });
    } else {
      console.log("adding");
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
        updateMemo(isChecked, uniId, index, updateMemo);
        handleOnChange(uniId);
      }}
    />
  );
});
