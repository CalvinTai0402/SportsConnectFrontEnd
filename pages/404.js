import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function custom404() {
  return (
    <div className="h-screen w-screen bg-gray-50 flex justify-center items-center bg-black">
      <div className="container flex flex-col md:flex-row items-center justify-between px-5 text-gray-700">
        <div className="w-full lg:w-1/2 mx-8">
          <div className="text-7xl text-white font-dark font-extrabold mb-8">
            {" "}
            404
          </div>
          <p className="text-2xl md:text-3xl font-light leading-normal mb-8 text-white">
            Sorry we couldn't find the page you're looking for
          </p>
          <Link href="/home">
            <a
              href="#"
              className="px-5 inline py-3 text-sm font-medium leading-5 shadow-2xl text-black transition-all duration-400 border border-transparent rounded-lg focus:outline-none bg-white text-xl"
            >
              Back
            </a>
          </Link>
        </div>
        <div className="w-full lg:flex lg:justify-end lg:w-1/2 mx-5 my-12">
          <Image
            src="https://user-images.githubusercontent.com/43953425/166269493-acd08ccb-4df3-4474-95c7-ad1034d3c070.svg"
            className=""
            alt="Page not found"
            width={800}
            height={500}
          />
        </div>
      </div>
    </div>
  );
}
