import { useRouter } from "next/router";
import React, { Fragment, useEffect, useMemo, useRef, useState } from "react";
import useMyAxios from "../../hooks/useMyAxios";
import Accordion from "../Accordion/Accordion";
import Table from "../Table/Table";
import CheckBox from "./CheckBox";

export default function Universities({ unis }) {
  const [allUnis, setAllUnis] = useState(unis);
  let [allUnisWithInterest, setAllUnisWithInterest] = useState([]);
  const skipPageResetRef = useRef();
  const router = useRouter();
  let updateMemo = (isChecked, uniId, index, updateMemo) => {
    skipPageResetRef.current = true;
    setAllUnisWithInterest((prevAllUnisWithInterest) => {
      let newAllUnisWithInterest = [...prevAllUnisWithInterest];
      newAllUnisWithInterest[index] = {
        ...prevAllUnisWithInterest[index],
        interested: (
          <CheckBox
            checked={!isChecked}
            uniId={uniId}
            index={index}
            updateMemo={updateMemo}
          />
        ),
      };
      return newAllUnisWithInterest;
    });
  };

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

  useEffect(() => {
    let newAllUnisWithInterest = allUnis.map((uni, index) => {
      return {
        ...uni,
        interested: (
          <CheckBox
            checked={uni.interested}
            uniId={uni.id}
            index={index}
            updateMemo={updateMemo}
          />
        ),
      };
    });
    setAllUnisWithInterest(newAllUnisWithInterest);
  }, [allUnis]);

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
      {
        Header: "Interested",
        accessor: "interested",
      },
    ],
    []
  );
  return (
    <Fragment>
      {allUnisWithInterest.length === allUnis.length ? ( // only render tickboxes when all checkboxes are fully constructed
        <section className="w-screen bg-gradient-to-br p-8">
          <h1 className="text-center text-2xl mb-4">Universities </h1>
          <div className="hidden 1210:block">
            <Table
              columns={columns}
              data={allUnisWithInterest}
              skipPageResetRef={skipPageResetRef}
            />
          </div>
          <div key={allUnisWithInterest.length} className="1210:hidden">
            <Accordion unis={allUnisWithInterest} />
          </div>
        </section>
      ) : (
        <section className="w-screen bg-gradient-to-br p-8">
          <h1 className="text-center text-2xl mb-4">Universities </h1>
          <div className="hidden 1210:block">
            <Table
              columns={columns}
              data={allUnis}
              skipPageResetRef={skipPageResetRef}
            />
          </div>
          <div key={allUnis.length} className="1210:hidden">
            <Accordion unis={allUnis} />
          </div>
        </section>
      )}
    </Fragment>
  );
}
