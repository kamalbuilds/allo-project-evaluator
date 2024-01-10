"use client";

import { useMediaQuery } from "@/hooks/useMediaQuery";
import { TTableData } from "../types/types";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import TableMobile from "./TableMobile";

import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { IoMdClose } from "react-icons/io";

/** TODO: the mobile view needs to be completed
 * we could create a new component for mobile view entirely
 */
const Table = ({
  data,
  header,
  description,
  rowsPerPage = 10,
  showPagination,
  activeState,
  filterPool,
  clearSelect
}: {
  data: TTableData;
  header: string | undefined | "";
  description: string | undefined | "";
  rowsPerPage?: number;
  showPagination?: boolean;
  activeState: any;
  filterPool: any;
  clearSelect: any
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(data.rows.length / rowsPerPage);

  const isMobile = useMediaQuery(768);
  if (isMobile) rowsPerPage = 5;

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const startRow = (currentPage - 1) * rowsPerPage;
  const endRow = startRow + rowsPerPage;
  const currentRows = data.rows.slice(startRow, endRow);


  function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
  }



  return (
    <>
      <div
        className={`px-4 sm:px-6 lg:px-8 ${header || description ? "pt-2 mt-10" : ""
          }`}
      >
        <div className="sm:flex flex flex-col items-center">
          {(header || description) && (
            <div className="sm:flex-auto flex-auto">
              {header && (
                <h1 className="text-center text-base font-semibold leading-6 text-gray-900">
                  {header}
                </h1>
              )}
              {description && (
                <p className="mt-2 text-center text-sm text-gray-700">
                  {description}
                </p>
              )}
            </div>
          )}
        </div>

        <div className="flex justify-end">
          <Menu as="div" className="relative text-left">
            <div>
              <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                {activeState}{" "} Strategy
                <ChevronDownIcon className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
              </Menu.Button>
            </div>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="py-1">

                  {activeState !== 'Select' && <Menu.Item>
                    {({ active }) => (
                      <div
                        onClick={() => clearSelect()}
                        className={classNames(
                          active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                          'block px-4 py-2 text-sm cursor-pointer'
                        )}
                      >
                        Clear Selection
                      </div>
                    )}
                  </Menu.Item>}


                  <Menu.Item>
                    {({ active }) => (
                      <div
                        onClick={() => filterPool("MicroGrants")}
                        className={classNames(
                          active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                          'block px-4 py-2 text-sm cursor-pointer'
                        )}
                      >
                        MicroGrants Strategy
                      </div>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <div
                        onClick={() => filterPool("Governance")}
                        className={classNames(
                          active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                          'block px-4 py-2 text-sm cursor-pointer'
                        )}
                      >
                        Governance Strategy
                      </div>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <div
                        onClick={() => filterPool("Hats")}
                        className={classNames(
                          active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                          'block px-4 py-2 text-sm cursor-pointer'
                        )}
                      >
                        Hats Strategy
                      </div>
                    )}
                  </Menu.Item>

                </div>
              </Menu.Items>
            </Transition>
          </Menu>

        </div>






        <div className="mt-8 flow-root">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8 lg:border lg:rounded-md lg:shadow-gray lg:shadow-md">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              {!isMobile ? (
                <table className="min-w-full divide-y divide-gray-300">
                  <thead>
                    <tr
                      key={"header-row"}
                      className="md:table-row lg:table-row"
                    >
                      {data.headers?.map((header, index) => (
                        <th
                          key={"headers-" + index}
                          scope="col"
                          className="py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
                        >
                          <div className="group inline-flex">{header}</div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {currentRows.map((row, index) => (
                      <tr key={"rows-" + index}>
                        {row.map((col, colIndex) => (
                          <td
                            key={"rows-" + index + "-col-" + colIndex}
                            className="w-full max-w-0 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:w-auto sm:max-w-none sm:pl-0 lg:table-cell"
                          >
                            {col}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <TableMobile data={data} currentRows={currentRows} />
              )}
            </div>
          </div>
        </div>
      </div>
      {showPagination && (
        <div className="text-sm flex justify-between my-10">
          <button
            className="rounded bg-white px-2 py-1 text-xs font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            onClick={handlePrevPage}
            disabled={currentPage === 1}
          >
            <ArrowLeftIcon className="h-3 w-3 inline-block mr-2" />
            Previous
          </button>
          <span className="font-semibold text-sm">
            Page {currentPage} of {totalPages}
          </span>
          <button
            className="rounded bg-white px-2 py-1 text-xs font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            Next
            <ArrowRightIcon className="h-3 w-3 inline-block ml-2" />
          </button>
        </div>
      )}
    </>
  );
};

export default Table;
