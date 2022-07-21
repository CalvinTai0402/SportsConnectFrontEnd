import React, { Fragment, useEffect, useState } from "react";
import { AiOutlinePlusSquare } from "react-icons/ai";
import ItemRow from "./ItemRow";
import swal from "sweetalert";
import useCsrfToken from "../../hooks/useCsrfToken";
import useMyAxios from "../../hooks/useMyAxios";
import { useRouter } from "next/router";

export default function Template({ endpoint }) {
  const [data, setData] = useState([]);
  let getCsrf = useCsrfToken();
  const router = useRouter();
  useEffect(() => {
    let fetchData = async () => {
      let myAxios = useMyAxios(router);
      let res = await myAxios.get(endpoint).catch((e) => {
        return e.response;
      });
      setData(res.data);
    };
    fetchData();
  }, []);

  let removeDatum = async (index) => {
    let newData = [...data];
    newData.splice(index, 1);
    // make sure key in the list rendered is unique! use id not index
    setData(newData);
  };

  let capitalizeEndpoint = (string) => {
    return string.charAt(1).toUpperCase() + string.slice(2);
  };

  let handleCreate = async () => {
    if (data.length >= 5) {
      swal(
        "Optimize your portfolio",
        "Please only include the 5 most recent items for a good reading experience. Pick the ones you are proud of!"
      );
      return;
    }
    let csrfToken = await getCsrf();
    let myAxios = useMyAxios(router, csrfToken);
    let res = await myAxios
      .post(endpoint, {
        description: "",
        active: false,
        start_date: "2022-07-16",
        end_date: "2022-07-16",
      })
      .catch((e) => {
        return e.response;
      });
    setData([...data, res.data]);
  };

  return (
    <Fragment>
      <div>
        <div className="flex justify-between space-x-2 font-semibold text-gray-900 leading-8 mb-3 mr-4">
          <div className="flex items-center">
            <span className="text-blue-500 mr-2">
              <svg
                className="h-5"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </span>
            <div>
              <span className="tracking-wide">
                {capitalizeEndpoint(endpoint)}
              </span>
            </div>
          </div>
          <span className="float-right pt-1">
            <AiOutlinePlusSquare
              className="h-6 w-6 text-green-400"
              onClick={handleCreate}
            />
          </span>
        </div>
        <ul className="list-inside space-y-2">
          {data.map((datum, index) => {
            return (
              <ItemRow
                key={datum.id}
                index={index}
                removeItem={removeDatum}
                id={datum.id}
                description={datum.description}
                startDate={datum.start_date}
                endDate={datum.end_date}
                active={datum.active}
                endpoint={endpoint}
              />
            );
          })}
        </ul>
      </div>
    </Fragment>
  );
}
