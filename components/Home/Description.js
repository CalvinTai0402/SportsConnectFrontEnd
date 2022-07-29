import Image from "next/image";
import React from "react";

export default function Description() {
  return (
    <section className="bg-white">
      <div className="gap-16 items-center py-8 px-4 mx-auto max-w-screen-2xl lg:grid lg:grid-cols-2 lg:py-16 lg:px-6">
        <div className="font-light text-gray-500 sm:text-lg">
          <h2 className="mb-4 text-4xl font-bold md:font-extrabold text-gray-900">
            How we can help
          </h2>
          <p className="mb-4">
            Don&apos;t know how to get started with your application? Frustrated
            with the slowness of getting accepted? Worry no more! 😇
          </p>
          <p>
            With SportsConnect not only will you be able to express your
            interest to numerous universities at once, we also provide you with
            all the necessary steps and guidance you will ever need 😊
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-8">
          <div className="w-full h-full">
            <Image
              className="rounded-lg"
              src={"/tennis0.png"}
              alt="Tennis photo"
              width={550}
              height={700}
            />
          </div>
          <div className="w-full lg:mt-10 xl:mt-10 2xl:mt-10">
            <Image
              className="rounded-lg"
              src={"/tennis1.png"}
              alt="Tennis photo"
              width={550}
              height={700}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
