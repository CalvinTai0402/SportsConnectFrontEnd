import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Hero() {
  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="grid max-w-screen-2xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
        <div className="mr-auto place-self-center lg:col-span-7">
          <h1 className="max-w-2xl mb-4 text-4xl font-bold md:font-extrabold leading-none md:text-5xl xl:text-6xl dark:text-white">
            Link between universities and college athletes
          </h1>
          <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
            From application to acceptance, the whole process is as easy as a
            few clicks
          </p>
          <Link href="/universities">
            <a className="inline-flex items-center justify-center px-2 sm:px-5 py-3 mr-3 text-base font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900">
              Browse universities
            </a>
          </Link>
          <Link href="/steps">
            <a className="mt-4 inline-flex items-center justify-center px-2 sm:px-4 py-3 text-base font-medium text-center text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800">
              Show me the process
            </a>
          </Link>
        </div>
        <div className="mt-10 lg:mt-0 lg:col-span-5 lg:flex">
          <Image
            className="rounded"
            src={
              "https://d1muf25xaso8hp.cloudfront.net/https%3A%2F%2Fs3.amazonaws.com%2Fappforest_uf%2Ff1656066806716x945998427644534400%2Fzsports.JPG?w=768&h=486&auto=compress&dpr=1&fit=max"
            }
            alt="Phone logo"
            width={800}
            height={500}
          />
        </div>
      </div>
    </section>
  );
}
