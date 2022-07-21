import React, { Fragment } from "react";
import Universities from "../components/Universities/Universities";
import useCsrfToken from "../hooks/useCsrfToken";
import useMyAxios from "../hooks/useMyAxios";

export default function universities({ unis }) {
  return (
    <Fragment>
      <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
        <Universities unis={unis} />
      </div>
    </Fragment>
  );
}

export async function getStaticProps() {
  let getCsrf = useCsrfToken();
  let fetchUnis = async (limit) => {
    let myAxios = useMyAxios();
    let res = await myAxios.get(`/universities?limit=${limit}`).catch((e) => {
      return e.response;
    });
    return res.data;
  };
  let unis = await fetchUnis(500);
  return {
    props: {
      unis: unis,
    },
  };
}
