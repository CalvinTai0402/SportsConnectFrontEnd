import React, { Fragment, useEffect } from "react";
import { useTable, usePagination, useGlobalFilter } from "react-table";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
} from "@heroicons/react/solid";
import PageButton from "./PageButton";

export default function Table({ columns, data }) {
  const props = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter,
    usePagination
  );
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    setGlobalFilter,
    state,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize, globalFilter },
  } = props;

  useEffect(() => {}, [globalFilter]);

  return (
    <Fragment>
      <label className="flex gap-x-2 items-baseline justify-between">
        <div>
          <span className="text-gray-700">Search: </span>
          <input
            type="text"
            value={globalFilter || ""}
            className="mt-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 max-w-sm"
            onChange={(e) => setGlobalFilter(e.target.value)}
          />
        </div>
        <div className="text-gray-700">
          Show
          <select
            className="mx-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            value={state.pageSize}
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
          entries
        </div>
      </label>
      <div className="mt-2 flex flex-col">
        <div className="-my-2 overflow-x-auto -mx-4 sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table
                {...getTableProps()}
                className="min-w-full divide-y divide-gray-200"
              >
                <thead className="bg-gray-50">
                  {headerGroups.map((headerGroup) => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                      {headerGroup.headers.map((column) => (
                        <th
                          {...column.getHeaderProps()}
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          {column.render("Header")}
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody
                  {...getTableBodyProps()}
                  className="bg-white divide-y divide-gray-200"
                >
                  {page.map((row, i) => {
                    prepareRow(row);
                    return (
                      <tr {...row.getRowProps()}>
                        {row.cells.map((cell) => {
                          return (
                            <td
                              {...cell.getCellProps()}
                              className="px-6 py-4 truncate max-w-[16rem] hover:break-words hover:overflow-visible hover:text-clip hover:whitespace-normal"
                            >
                              {cell.render("Cell")}
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div className="py-3 flex items-center justify-center sm:justify-between">
        <div className="sm:flex-1 sm:flex sm:items-center sm:justify-between">
          <div className="flex gap-x-2 mb-4 sm:mb-0">
            <span className="hidden text-gray-700 w-full sm:flex">
              <span className="m-auto">
                Showing results{" "}
                <span className="font-medium">{pageIndex * pageSize + 1}</span>{" "}
                to{" "}
                <span className="font-medium">
                  {Math.min(pageIndex * pageSize + pageSize, data.length)}
                </span>{" "}
                of <span className="font-medium">{data.length}</span> entries
              </span>
            </span>
          </div>
          <div className="flex gap-x-2 ">
            <span className="">
              Go to page:{" "}
              <input
                autoComplete="off"
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
                  <ChevronDoubleLeftIcon
                    className="h-5 w-5"
                    aria-hidden="true"
                  />
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
                  onClick={() => gotoPage(pageCount - 1)}
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
        </div>
      </div>

      <br />
      <div>
        <pre>
          <code>{JSON.stringify(state.filters, null, 2)}</code>
        </pre>
      </div>
    </Fragment>
  );
}
