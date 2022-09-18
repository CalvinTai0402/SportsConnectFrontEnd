import Link from 'next/link';
import React from 'react';
import useTranslation from 'next-translate/useTranslation';
import Image from 'next/image';
import Spinner from '../Spinner';

export default function Form({
  text,
  handleUsernameChange,
  handlePasswordChange,
  handleSubmit,
  error,
  loading,
  setError,
}) {
  const { t } = useTranslation();
  return (
    <div className="dark:bg-white mx-auto">
      <div className="flex justify-center h-screen">
        <div className="relative hidden bg-cover lg:block lg:w-2/3">
          <Image
            src="/computer.jpg"
            className="object-center object-cover pointer-events-none"
            alt="Computer image"
            layout="fill"
            priority={true}
          />
          <div className="flex items-center h-full px-20 bg-gray-900 bg-opacity-40 relative z-1">
            <div>
              <h2 className="text-4xl font-bold text-white">SportsConnect</h2>

              <p className="max-w-xl mt-3 text-gray-300">
                {t('login:image_description')}
              </p>
            </div>
          </div>
        </div>
        {/* <div
          className="hidden bg-cover lg:block lg:w-2/3"
          style={{ backgroundImage: 'url(/computer.jpg)' }}
        >
          <div className="flex items-center h-full px-20 bg-gray-900 bg-opacity-40">
            <div>
              <h2 className="text-4xl font-bold text-white">SportsConnect</h2>

              <div className="max-w-xl mt-3 text-gray-300">
                {t('login:image_description')}
              </div>
            </div>
          </div>
        </div> */}
        <div className="flex items-center w-full max-w-md px-6 mx-auto lg:w-2/6">
          <div className="flex-1">
            <div className="text-center">
              <h2 className="text-4xl font-bold text-center text-gray-700">
                SportsConnect
              </h2>

              <p className="mt-3 text-gray-500">
                {text} {t('login:subheader')}
              </p>
            </div>

            <div className="mt-8">
              <form onSubmit={handleSubmit}>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm text-gray-600"
                  >
                    {t('login:username')}
                  </label>
                  <input
                    name="username"
                    id="username"
                    onChange={handleUsernameChange}
                    placeholder={t('login:example_username')}
                    className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                  />
                </div>

                <div className="mt-6">
                  <div className="flex justify-between mb-2">
                    <label htmlFor="password" className="text-sm text-gray-600">
                      {t('login:password')}
                    </label>
                  </div>

                  <input
                    type="password"
                    name="password"
                    id="password"
                    onChange={handlePasswordChange}
                    placeholder={t('login:example_password')}
                    className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                  />
                </div>

                {error !== '' ? (
                  <div
                    className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-8"
                    role="alert"
                  >
                    <span className="block sm:inline">{error}</span>
                    <span
                      className="absolute top-0 bottom-0 right-0"
                      onClick={() => setError('')}
                    >
                      <svg
                        className="fill-current h-6 w-6 text-red-500"
                        role="button"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                      >
                        <title>Close</title>
                        <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
                      </svg>
                    </span>
                  </div>
                ) : null}

                <div className="mt-6">
                  <button
                    type="submit"
                    className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-500 rounded-md hover:bg-blue-400 focus:outline-none focus:bg-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50"
                  >
                    {loading ? <Spinner /> : text}
                  </button>
                </div>
              </form>
              {text === 'Log in' || text === '登录' ? (
                <p className="mt-6 text-sm text-center text-gray-400">
                  {t('login:description')}{' '}
                  <Link href="/auth/signup">
                    <a className="text-blue-500 focus:outline-none focus:underline hover:underline">
                      {t('login:sign_up')}
                    </a>
                  </Link>
                </p>
              ) : (
                <p className="mt-6 text-sm text-center text-gray-400">
                  {t('signup:description')}{' '}
                  <Link href="/auth/login">
                    <a className="text-blue-500 focus:outline-none focus:underline hover:underline">
                      {t('signup:log_in')}
                    </a>
                  </Link>
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
