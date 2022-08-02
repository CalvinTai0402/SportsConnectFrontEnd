import React, { Fragment, useEffect, useState } from "react";
import AccordionItem from "./AccordionItem";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
} from "@heroicons/react/solid";
import PageButton from "../Table/PageButton";
import useTranslation from "next-translate/useTranslation";

export default function Accordion({ unis }) {
  const { t } = useTranslation();
  const [pageSize, setPageSize] = useState(5);
  const [filteredUnis, setFilteredUnis] = useState(unis.slice(0, pageSize));
  const [totalFilteredUnis, setTotalFilteredUnis] = useState(unis.length);
  const [pageIndex, setPageIndex] = useState(0);
  const [pageCount, setPageCount] = useState(
    Math.floor(unis.length / pageSize) + 1
  );
  const [filterValue, setFilterValue] = useState("");
  const [canPreviousPage, setCanPreviousPage] = useState(false);
  const [canNextPage, setCanNextPage] = useState(true);

  useEffect(() => {
    let newTotalFilteredUnis = filterUni(filterValue, pageSize, pageIndex);
    setTotalFilteredUnis(newTotalFilteredUnis);
    setPageCount(Math.floor(totalFilteredUnis / pageSize) + 1);
    setPageIndex(0);
  }, [filterValue, pageSize]);

  useEffect(() => {
    filterUni(filterValue, pageSize, pageIndex);
    setPageCount(Math.floor(totalFilteredUnis / pageSize) + 1);
    setCanPreviousPage(pageIndex > 0);
    setCanNextPage(pageIndex + 1 < pageCount);
  }, [totalFilteredUnis, pageSize, pageIndex]);

  //   useEffect(() => {
  //     setCanPreviousPage(pageIndex > 0);
  //     setCanNextPage(pageIndex + 1 < pageCount);
  //   }, [pageIndex]);

  let filterUni = (search, _pageSize, _pageIndex) => {
    search = search.toLowerCase();
    let newFilteredUnis;
    if (search !== "") {
      newFilteredUnis = unis.filter(
        (uni) =>
          uni.name.toLowerCase().includes(search) ||
          uni.city.toLowerCase().includes(search) ||
          uni.state.toLowerCase().includes(search) ||
          uni.conference.toLowerCase().includes(search) ||
          uni.division.toLowerCase().includes(search) ||
          uni.region.toLowerCase().includes(search) ||
          uni.category.toLowerCase().includes(search)
      );
    } else {
      newFilteredUnis = unis;
    }
    setFilteredUnis(
      newFilteredUnis.slice(
        _pageIndex * _pageSize,
        _pageIndex * _pageSize + _pageSize
      )
    );
    return newFilteredUnis.length;
  };

  let nextPage = () => setPageIndex(pageIndex + 1);
  let previousPage = () => setPageIndex(pageIndex - 1);
  let gotoPage = (_pageIndex) => {
    if (_pageIndex < 0 || _pageIndex + 1 > pageCount) return;
    setPageIndex(_pageIndex);
  };

  return (
    <Fragment>
      <label className="flex gap-x-2 items-baseline justify-between mb-2">
        <div>
          <input
            type="text"
            placeholder={
              t("universities:search") +
              " " +
              totalFilteredUnis +
              t("universities:entries") +
              " ..."
            }
            value={filterValue || ""}
            className="mt-1 max-w-[180px] sm:max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            onChange={(e) => {
              setFilterValue(e.target.value);
            }}
          />
        </div>
        <div className="text-gray-700">
          <span className="hidden sm:inline-block">
            {t("universities:show")}
          </span>
          <select
            className="mx-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
            }}
          >
            {[5, 10, 25, 50, 100].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                {pageSize}
              </option>
            ))}
          </select>
        </div>
      </label>
      <div id="accordion-collapse" data-accordion="collapse">
        {filteredUnis.map((uni, index) => {
          return (
            <AccordionItem
              key={uni.id}
              index={index}
              name={uni.name}
              city={uni.city}
              state={uni.state}
              conference={uni.conference}
              division={uni.division}
              region={uni.region}
              category={uni.category}
              interested={uni.interested}
            />
          );
        })}
      </div>
      <div className="flex justify-between sm:hidden gap-x-2 mt-4 ">
        <span className="flex sm:hidden">
          <span className="m-auto">{t("universities:go_to_page")}: </span>
          <input
            type="number"
            className="w-full ml-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 max-w-sm w-20 h-8"
            // defaultValue={pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              gotoPage(page);
            }}
            value={pageIndex + 1}
          />
        </span>{" "}
        <nav
          className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px flex sm:hidden"
          aria-label="Pagination"
        >
          <span className="m-auto">
            <PageButton
              className="rounded-l-md sm:px-2 sm:py-2"
              onClick={() => gotoPage(0)}
              disabled={!canPreviousPage}
            >
              <ChevronDoubleLeftIcon className="h-5 w-5" aria-hidden="true" />
            </PageButton>
            <PageButton
              className="sm:px-2 sm:py-2"
              onClick={() => previousPage()}
              disabled={!canPreviousPage}
            >
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </PageButton>
            <PageButton
              onClick={() => nextPage()}
              disabled={!canNextPage}
              className="sm:px-2 sm:py-2"
            >
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </PageButton>
            <PageButton
              className="rounded-r-md sm:px-2 sm:py-2"
              onClick={() => {
                gotoPage(pageCount - 1);
              }}
              disabled={!canNextPage}
            >
              <span className="sr-only">Last</span>
              <ChevronDoubleRightIcon className="h-5 w-5" aria-hidden="true" />
            </PageButton>
          </span>
        </nav>
      </div>
      <div className="py-3 hidden sm:flex justify-between ">
        {/* <div className="sm:flex-1 sm:flex sm:items-center sm:justify-between"> */}
        <div className="hidden sm:flex gap-x-2 mb-4 sm:mb-0">
          <span className=" text-gray-700 w-full sm:flex">
            <span className="m-auto">
              {t("universities:showing_results")}{" "}
              <span className="font-medium">{pageIndex * pageSize + 1}</span>{" "}
              {t("universities:to")}{" "}
              <span className="font-medium">
                {Math.min(pageIndex * pageSize + pageSize, totalFilteredUnis)}
              </span>{" "}
              {t("universities:of")}{" "}
              <span className="font-medium">{totalFilteredUnis}</span>{" "}
              {t("universities:entries")}
            </span>
          </span>
        </div>
        <div className="flex gap-x-2 ">
          <span className="">
            {t("universities:go_to_page")}:{" "}
            <input
              type="number"
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 max-w-sm w-12 h-8 sm:h-10 sm:w-36"
              // defaultValue={pageIndex + 1}
              onChange={(e) => {
                const page = e.target.value ? Number(e.target.value) - 1 : 0;
                gotoPage(page);
              }}
              value={pageIndex + 1}
            />
          </span>{" "}
          <nav
            className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px flex"
            aria-label="Pagination"
          >
            <span className="m-auto">
              <PageButton
                className="rounded-l-md sm:px-2 sm:py-2"
                onClick={() => gotoPage(0)}
                disabled={!canPreviousPage}
              >
                <ChevronDoubleLeftIcon className="h-5 w-5" aria-hidden="true" />
              </PageButton>
              <PageButton
                className="sm:px-2 sm:py-2"
                onClick={() => previousPage()}
                disabled={!canPreviousPage}
              >
                <span className="sr-only">Previous</span>
                <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
              </PageButton>
              <PageButton
                onClick={() => nextPage()}
                disabled={!canNextPage}
                className="sm:px-2 sm:py-2"
              >
                <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
              </PageButton>
              <PageButton
                className="rounded-r-md sm:px-2 sm:py-2"
                onClick={() => {
                  gotoPage(pageCount - 1);
                }}
                disabled={!canNextPage}
              >
                <span className="sr-only">Last</span>
                <ChevronDoubleRightIcon
                  className="h-5 w-5"
                  aria-hidden="true"
                />
              </PageButton>
            </span>
          </nav>
        </div>
        {/* </div> */}
      </div>
    </Fragment>
  );
}
