import useTranslation from 'next-translate/useTranslation';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { Fragment } from 'react';
import UniversityDropdown from '../Universities/UniversityDropdown';
import LanguageDropdown from './LanguageDropdown';

export default function HeaderNavLarge({
  updateLoggedInStatus,
  isLoggedIn,
  setIsLoggedIn,
  handleLogout,
}) {
  const { t } = useTranslation();
  const router = useRouter();
  const urlPath = router.asPath;
  return (
    <ul className="DESKTOP-MENU space-x-8 hidden lg:flex">
      <li>
        <Link href="/home">
          <a
            onClick={() => updateLoggedInStatus(setIsLoggedIn)}
            className={
              'block py-2 pr-4 pl-3 text-gray-700 rounded lg:bg-transparent lg:p-0 hover:border-b hover:border-gray-800 hover:text-blue-700 ' +
              (urlPath.includes('/home')
                ? 'border-b border-gray-800 text-blue-700'
                : '')
            }
            aria-current="page"
          >
            {t('header:home')}
          </a>
        </Link>
      </li>
      <li>
        <UniversityDropdown />
      </li>
      <li>
        <Link href="/steps">
          <a
            onClick={() => updateLoggedInStatus(setIsLoggedIn)}
            className={
              'block py-2 pr-4 pl-3 text-gray-700 rounded lg:bg-transparent lg:p-0 hover:border-b hover:border-gray-800 hover:text-blue-700 ' +
              (urlPath.includes('/steps')
                ? 'border-b border-gray-800 text-blue-700'
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
            onClick={() => updateLoggedInStatus(setIsLoggedIn)}
            className={
              'block py-2 pr-4 pl-3 text-gray-700 rounded lg:bg-transparent lg:p-0 hover:border-b hover:border-gray-800 hover:text-blue-700 ' +
              (urlPath.includes('/portfolio')
                ? 'border-b border-gray-800 text-blue-700'
                : '')
            }
            aria-current="page"
          >
            {' '}
            {t('header:portfolio')}
          </a>
        </Link>
      </li>
      {!isLoggedIn ? (
        <Fragment>
          <li>
            <Link href="/auth/login">
              <a
                onClick={() => updateLoggedInStatus(setIsLoggedIn)}
                className={
                  'block py-2 pr-4 pl-3 text-gray-700 rounded lg:bg-transparent lg:p-0 hover:border-b hover:border-gray-800 hover:text-blue-700 ' +
                  (urlPath.includes('/auth/login')
                    ? 'border-b border-gray-800 text-blue-700'
                    : '')
                }
                aria-current="page"
              >
                {' '}
                {t('header:log_in')}
              </a>
            </Link>
          </li>
          <li>
            <Link href="/auth/signup">
              <a
                onClick={() => updateLoggedInStatus(setIsLoggedIn)}
                className={
                  'block py-2 pr-4 pl-3 text-gray-700 rounded lg:bg-transparent lg:p-0 hover:border-b hover:border-gray-800 hover:text-blue-700 ' +
                  (urlPath.includes('/auth/signup')
                    ? 'border-b border-gray-800 text-blue-700'
                    : '')
                }
                aria-current="page"
              >
                {' '}
                {t('header:sign_up')}
              </a>
            </Link>
          </li>
        </Fragment>
      ) : (
        <li>
          <span
            onClick={handleLogout}
            className="block py-2 pr-4 pl-3 text-gray-700 rounded lg:bg-transparent lg:p-0 hover:border-b hover:border-gray-800 hover:text-blue-700"
          >
            {t('header:log_out')}
          </span>
        </li>
      )}

      <li>
        <LanguageDropdown />
      </li>
    </ul>
  );
}
