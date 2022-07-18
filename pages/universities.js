import axios from "axios";
import React, { Fragment } from "react";
import Universities from "../components/Universities/Universities";

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
  let fetchUnis = async (limit) => {
    let res = await axios.get(
      process.env.NEXT_PUBLIC_API_URL + `/universities?limit=${limit}`
    );
    return res.data;
  };
  let unis = await fetchUnis(500);
  return {
    props: {
      unis: unis,
    },
  };
}
