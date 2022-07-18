import React, { Fragment, useEffect, useRef, useState } from "react";
import DatePicker from "react-datepicker";
import yyyymmdd from "../../utilities/yyyymmdd";
import { TrashIcon } from "@heroicons/react/solid";
import axios from "axios";
import debounce from "../../utilities/debounce";

import "react-datepicker/dist/react-datepicker.css";

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
  let [timer, setTimer] = useState(setTimeout(() => {}, 1000));
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

  let handleDelete = async (_id) => {
    try {
      let res = await axios.delete(
        process.env.NEXT_PUBLIC_API_URL + `${endpoint}/${_id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
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
    let res = await axios.put(
      process.env.NEXT_PUBLIC_API_URL + `${endpoint}/${id}`,
      updateObject,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
  };

  useEffect(() => {
    if (firstRun.current) {
      // we do not want to update on mount
      firstRun.current = false;
    } else {
      // only auto send put requests
      debounce(handleUpdate, timer, setTimer)();
    }
  }, [currentDescription, currentActive, currentStartDate, currentEndDate]);

  return (
    <Fragment>
      <li>
        <div className="flex justify-between text-blue-600">
          <input
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
          <div
            className="mr-10 hover:cursor-pointer"
            onClick={() => setCurrentActive(!currentActive)}
          >
            {currentActive ? "active" : "inactive"}
          </div>
        </div>
      </li>
    </Fragment>
  );
}
