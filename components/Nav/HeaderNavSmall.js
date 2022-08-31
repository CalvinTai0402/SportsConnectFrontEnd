import useTranslation from 'next-translate/useTranslation';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { Fragment, useState } from 'react';
import UniversityDropdown from '../Universities/UniversityDropdown';
import LanguageDropdown from './LanguageDropdown';

export default function HeaderNavSmall({
  updateLoggedInStatus,
  isLoggedIn,
  setIsLoggedIn,
  handleLogout,
}) {
  const { t } = useTranslation();
  const [isNavOpen, setIsNavOpen] = useState(false);
  const router = useRouter();
  const urlPath = router.asPath;
  return (
    <section className="MOBILE-MENU flex lg:hidden">
      <div
        className="HAMBURGER-ICON space-y-2"
        onClick={() => setIsNavOpen((prev) => !prev)}
      >
        <span className="block h-0.5 w-8 animate-pulse bg-gray-600"></span>
        <span className="block h-0.5 w-8 animate-pulse bg-gray-600"></span>
        <span className="block h-0.5 w-8 animate-pulse bg-gray-600"></span>
      </div>

      <div
        className={
          isNavOpen
            ? 'absolute w-full h-screen top-0 left-0 bg-white z-10 flex flex-col justify-evenly items-center'
            : 'hidden'
        }
      >
        <div
          className="absolute top-0 right-0 px-8 py-8"
          onClick={() => setIsNavOpen(false)}
        >
          <svg
            className="h-8 w-8 text-gray-600"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </div>
        <ul className="flex flex-col items-center justify-between min-h-[250px]">
          <li>
            <Link href="/home">
              <a
                onClick={() => {
                  updateLoggedInStatus(setIsLoggedIn);
                  setIsNavOpen(false);
                }}
                className={
                  'border-b border-gray-400 text-xl my-12 uppercase hover:bg-gray-200' +
                  (urlPath.includes('home')
                    ? 'border-blue-800 text-blue-700'
                    : '')
                }
                aria-current="page"
              >
                {t('header:home')}
              </a>
            </Link>
          </li>
          <li>
            <UniversityDropdown navSmall={true} />
          </li>
          <li>
            <Link href="/steps">
              <a
                onClick={() => {
                  updateLoggedInStatus(setIsLoggedIn);
                  setIsNavOpen(false);
                }}
                className={
                  'border-b border-gray-400 text-xl my-12 uppercase hover:bg-gray-200' +
                  (urlPath.includes('steps')
                    ? 'border-blue-800 text-blue-700'
                    : '')
                }
                aria-current="page"
              >
                {t('header:steps')}
              </a>
            </Link>
          </li>
          <li>
            <Link href="/portfolio">
              <a
                onClick={() => {
                  updateLoggedInStatus(setIsLoggedIn);
                  setIsNavOpen(false);
                }}
                className={
                  'border-b border-gray-400 text-xl my-12 uppercase hover:bg-gray-200' +
                  (urlPath.includes('portfolio')
                    ? 'border-blue-800 text-blue-700'
                    : '')
                }
              >
                {t('header:portfolio')}
              </a>
            </Link>
          </li>
          {!isLoggedIn ? (
            <Fragment>
              <li>
                <Link href="/auth/login">
                  <a
                    onClick={() => {
                      updateLoggedInStatus(setIsLoggedIn);
                      setIsNavOpen(false);
                    }}
                    className={
                      'border-b border-gray-400 text-xl my-12 uppercase hover:bg-gray-200' +
                      (urlPath.includes('login')
                        ? 'border-blue-800 text-blue-700'
                        : '')
                    }
                  >
                    {t('header:log_in')}
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/auth/signup">
                  <a
                    onClick={() => {
                      updateLoggedInStatus(setIsLoggedIn);
                      setIsNavOpen(false);
                    }}
                    className={
                      'border-b border-gray-400 text-xl my-12 uppercase hover:bg-gray-200' +
                      (urlPath.includes('signup')
                        ? 'border-blue-800 text-blue-700'
                        : '')
                    }
                  >
                    {t('header:sign_up')}
                  </a>
                </Link>
              </li>
            </Fragment>
          ) : (
            <li>
              <span
                onClick={() => {
                  handleLogout();
                  setIsNavOpen(false);
                }}
                className="border-b border-gray-400 text-xl my-12 uppercase hover:bg-gray-200"
              >
                {t('header:log_out')}
              </span>
            </li>
          )}
          <li>
            <LanguageDropdown />
          </li>
        </ul>
      </div>
    </section>
  );
}
