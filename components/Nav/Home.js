import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export default function Home() {
  return (
    <Link href="/home">
      <div className="flex items-center">
        <Image
          width={40}
          height={40}
          src="/logo.png"
          className="mr-3 h-6 sm:h-9"
          alt="Flowbite Logo"
        />
        <span className="self-center text-xl font-semibold whitespace-nowrap ml-4">
          SportsConnect
        </span>
      </div>
    </Link>
  );
}
