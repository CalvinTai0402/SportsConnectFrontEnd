import Image from "next/image";
import React, { Fragment } from "react";

export default function University() {
  return (
    <Fragment>
      <div class="bg-white rounded-lg border shadow-md max-w-xs md:max-w-none overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1523289217630-0dd16184af8e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8d29tZW4lMjBlbXBvd2VybWVudHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
          alt="Tennis photo"
          width={400}
          height={400}
        />
        <div class="p-3">
          <h3 class="text-blue-700 flex justify-center text-xl leading-6 text-gray-700 border-b border-gray-200 p-2 align-middle">
            Colorado State University
          </h3>

          <div class="flex justify-center">
            <ul class="bg-white rounded-lg w-96 text-gray-900">
              <li class="px-6 py-2 border-b border-gray-200 w-full rounded-t-lg">
                <span className="text-blue-500">City and State: </span>{" "}
                Albeline, Texas
              </li>
              <li class="px-6 py-2 border-b border-gray-200 w-full">
                <span className="text-blue-500">Conference: </span>Western
                Athletic Conference
              </li>
              <li class="px-6 py-2 border-b border-gray-200 w-full">
                <span className="text-blue-500">Division: </span> NCAA D1
              </li>
              <li class="px-6 py-2 border-b border-gray-200 w-full">
                <span className="text-blue-500">Region: </span> Mid south
              </li>
            </ul>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
