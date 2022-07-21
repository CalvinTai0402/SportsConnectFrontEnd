import { useRouter } from "next/router";
import React, { Fragment, useEffect, useMemo, useState } from "react";
import useCsrfToken from "../../hooks/useCsrfToken";
import useMyAxios from "../../hooks/useMyAxios";
import Accordion from "../Accordion/Accordion";
import Table from "../Table/Table";

export default function Universities({ unis }) {
  const [allUnis, setAllUnis] = useState(unis);
  const router = useRouter();
  useEffect(() => {
    let fetchAllUnis = async (limit) => {
      let myAxios = useMyAxios(router);
      let res = await myAxios.get(`/universities?limit=${limit}`).catch((e) => {
        return e.response;
      });
      setAllUnis(res.data);
    };
    fetchAllUnis(-1);
  }, []);
  const columns = useMemo(
    () => [
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "City",
        accessor: "city",
      },
      {
        Header: "State",
        accessor: "state",
      },
      {
        Header: "Conference",
        accessor: "conference",
      },
      {
        Header: "Division",
        accessor: "division",
      },
      {
        Header: "Region",
        accessor: "region",
      },
      {
        Header: "Category",
        accessor: "category",
      },
    ],
    []
  );

  return (
    <Fragment>
      <section className="w-screen bg-gradient-to-br p-8">
        <h1 className="text-center text-2xl mb-4">Universities </h1>
        <div className="hidden 1210:block">
          <Table columns={columns} data={useMemo(() => allUnis)} />
        </div>
        <div key={allUnis.length} className="1210:hidden">
          <Accordion unis={allUnis} />
        </div>
      </section>
    </Fragment>
  );
}
