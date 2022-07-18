import Image from "next/image";
import React from "react";

export default function Description() {
  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="gap-16 items-center py-8 px-4 mx-auto max-w-screen-2xl lg:grid lg:grid-cols-2 lg:py-16 lg:px-6">
        <div className="font-light text-gray-500 sm:text-lg dark:text-gray-400">
          <h2 className="mb-4 text-4xl font-bold md:font-extrabold text-gray-900 dark:text-white">
            How we can help
          </h2>
          <p className="mb-4">
            Don't know how to get started with your application? Frustrated with
            the slowness of getting accepted? Worry no more! 😇
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
              src={
                "https://images.unsplash.com/photo-1595435742656-5272d0b3fa82?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8dGVubmlzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
              }
              alt="Tennis photo"
              width={550}
              height={700}
            />
          </div>
          <div className="w-full lg:mt-10 xl:mt-10 2xl:mt-10">
            <Image
              className="rounded-lg"
              src={
                "https://images.unsplash.com/photo-1622163642998-1ea32b0bbc67?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fHRlbm5pc3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
              }
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
