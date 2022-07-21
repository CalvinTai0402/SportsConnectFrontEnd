import React, { Fragment, useEffect, useRef, useState } from "react";
import DatePicker from "react-datepicker";
import yyyymmdd from "../../utilities/yyyymmdd";
import { TrashIcon } from "@heroicons/react/solid";
import { DebounceInput } from "react-debounce-input";

import "react-datepicker/dist/react-datepicker.css";
import useMyAxios from "../../hooks/useMyAxios";
import useCsrfToken from "../../hooks/useCsrfToken";
import { useRouter } from "next/router";

Date.prototype.yyyymmdd = yyyymmdd;

export default function ItemRow({
  description,
  startDate,
  endDate,
  active,
  id,
  index,
  removeItem,
  endpoint,
}) {
  let [currentActive, setCurrentActive] = useState(active);
  let [currentDescription, setCurrentDescription] = useState(description);
  let [currentStartDate, setCurrentStartDate] = useState(
    new Date(startDate + "T15:00:00Z")
  );
  if (!currentActive) {
    var [currentEndDate, setCurrentEndDate] = useState(
      new Date(endDate + "T15:00:00Z")
    );
  } else {
    var [currentEndDate, setCurrentEndDate] = useState(currentStartDate);
  }
  const firstRun = useRef(true);
  const router = useRouter();
  let getCsrf = useCsrfToken();
  let handleDelete = async (_id) => {
    let csrfToken = await getCsrf();
    let myAxios = useMyAxios(router, csrfToken);
    let res = await myAxios.delete(`${endpoint}/${_id}`).catch((e) => {
      return e.response;
    });
  };

  let handleUpdate = async () => {
    let updateObject = {
      description: currentDescription,
      active: currentActive,
      start_date: currentStartDate.yyyymmdd(),
      end_date: null,
    };
    if (currentEndDate !== undefined) {
      updateObject.end_date = currentEndDate.yyyymmdd();
    }
    let csrfToken = await getCsrf();
    let myAxios = useMyAxios(router, csrfToken);
    let res = await myAxios
      .put(`${endpoint}/${id}`, updateObject)
      .catch((e) => {
        return e.response;
      });
  };

  useEffect(() => {
    if (firstRun.current) {
      // we do not want to update on mount
      firstRun.current = false;
    } else {
      // only auto send put requests
      handleUpdate();
    }
  }, [currentDescription, currentActive, currentStartDate, currentEndDate]);

  return (
    <Fragment>
      <li>
        <div className="flex justify-between text-blue-600">
          <DebounceInput
            debounceTimeout={1000}
            label="description"
            type="text"
            placeholder="Add a description"
            value={currentDescription}
            onChange={(e) => setCurrentDescription(e.target.value)}
            className="pt-3 pb-2  w-full px-0 mt-0 border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black border-gray-200"
          />
          <span className="pt-4 pb-2 mr-4 border-0 focus:outline-none focus:ring-0 focus:border-black border-gray-200">
            <TrashIcon
              className="h-5 w-5 hover:cursor-pointer text-red-500"
              onClick={() => {
                removeItem(index);
                handleDelete(id);
              }}
            />
          </span>
        </div>
        <div className="text-gray-500 text-xs flex justify-between">
          <div className="flex">
            <DatePicker
              selected={currentStartDate}
              onChange={(date) => {
                setCurrentStartDate(date);
              }}
              className="border-0 p-0 max-w-[4rem] text-xs border-gray-200 m-0 
                          hover:cursor-pointer focus:outline-none focus:ring-0 focus:border-black"
              wrapperClassName="max-w-[4.2rem] mr-1"
            />{" "}
            to{" "}
            {currentActive ? (
              <span className="ml-2">present</span>
            ) : (
              <DatePicker
                selected={currentEndDate}
                onChange={(date) => {
                  setCurrentEndDate(date);
                }}
                className="border-0 p-0 max-w-[4rem] text-xs border-gray-200 m-0
                          hover:cursor-pointer focus:outline-none focus:ring-0 focus:border-black"
                wrapperClassName="max-w-[4.2rem] ml-2"
              />
            )}
          </div>
          {currentActive ? (
            <div
              className="mr-10 hover:cursor-pointer"
              onClick={() => setCurrentActive(!currentActive)}
            >
              active
            </div>
          ) : (
            <div
              className="mr-8 hover:cursor-pointer"
              onClick={() => setCurrentActive(!currentActive)}
            >
              inactive
            </div>
          )}
        </div>
      </li>
    </Fragment>
  );
}
