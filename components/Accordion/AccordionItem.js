import React, { useState } from "react";
import { classNames } from "../../utilities/classNames";

export default function AccordionItem({
  name,
  city,
  state,
  conference,
  division,
  region,
  category,
  interested,
}) {
  const [show, setShow] = useState(false);
  return (
    <div>
      <h2 id="accordion-collapse-heading-1">
        <button
          type="button"
          className="flex items-center justify-between w-full p-5 font-medium text-left text-gray-500 border border-gray-200 rounded-t-xl focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
          data-accordion-target="#accordion-collapse-body-1"
          aria-expanded="true"
          aria-controls="accordion-collapse-body-1"
        >
          <span>{name}</span>
          <svg
            data-accordion-icon
            className={classNames(
              "w-6 h-6 shrink-0 ",
              show === false ? "rotate-0" : "rotate-180"
            )}
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
            onClick={() => setShow(!show)}
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            ></path>
          </svg>
        </button>
      </h2>
      <div
        id="accordion-collapse-body-1"
        className={show === false ? "hidden" : ""}
        aria-labelledby="accordion-collapse-heading-1"
      >
        <div className="p-5 font-light border border-gray-200 dark:border-gray-700 dark:bg-gray-900">
          <div className="flex justify-start">
            <p className="mb-2 text-gray-500 dark:text-gray-400">
              <span className="font-bold">City</span>: {city}
            </p>
            <p className="mb-2 ml-2 text-gray-500 dark:text-gray-400">
              <span className="font-bold">State</span>: {state}
            </p>
          </div>
          <div className="flex justify-start">
            <p className="mb-2 text-gray-500 dark:text-gray-400">
              <span className="font-bold">Region</span>: {region}
            </p>
            <p className="mb-2 ml-2 text-gray-500 dark:text-gray-400">
              <span className="font-bold">Category</span>: {category}
            </p>
          </div>
          <div className="flex justify-start">
            <p className="mb-2 text-gray-500 dark:text-gray-400">
              <span className="font-bold">Conference</span>: {conference}
            </p>
            <p className="mb-2 ml-2 text-gray-500 dark:text-gray-400">
              <span className="font-bold">Division</span>: {division}
            </p>
          </div>
          <div className="flex justify-start">
            <p className="mb-2 text-gray-500 dark:text-gray-400">
              <span className="font-bold">Interest</span>: {interested}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
