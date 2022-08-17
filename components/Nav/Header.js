import { useRouter } from 'next/router';
import React, { Fragment, useEffect, useState } from 'react';
import { useUserContext } from '../Context/UserContext';
import MyHead from '../Meta/MyHead';
import updateLoggedInStatus from '../../utilities/updateLoggedInStatus';
import { logout } from '../../network/lib/auth';
import HeaderNavLarge from './HeaderNavLarge';
import HeaderNavSmall from './HeaderNavSmall';
import Home from './Home';
import Spinner from './../Spinner';

export default function Header() {
  const { isLoggedIn, setIsLoggedIn } = useUserContext();
  const [loading, setLoading] = useState(false);
  // === if user uses more than one tab ===
  useEffect(() => {
    updateLoggedInStatus(setIsLoggedIn);
  }, []);
  // === if user uses more than one tab ===
  const router = useRouter();
  let handleLogout = async () => {
    sessionStorage.removeItem('token');
    setLoading(true);
    let res = await logout();
    if (res.status === 200) {
      setLoading(false);
      router.push('/home');
    }
    updateLoggedInStatus(setIsLoggedIn);
  };
  return (
    <Fragment>
      <MyHead />
      <header className="sticky top-0 z-50">
        <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 bg-blue-50">
          <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
            <Home />
            <div>
              {loading ? (
                <div className="flex absolute top-0 left-0 w-full h-screen bg-white">
                  <Spinner size={12} />
                </div>
              ) : (
                <nav>
                  <HeaderNavSmall
                    updateLoggedInStatus={updateLoggedInStatus}
                    isLoggedIn={isLoggedIn}
                    setIsLoggedIn={setIsLoggedIn}
                    handleLogout={handleLogout}
                    loading={loading}
                  />
                  <HeaderNavLarge
                    updateLoggedInStatus={updateLoggedInStatus}
                    isLoggedIn={isLoggedIn}
                    setIsLoggedIn={setIsLoggedIn}
                    handleLogout={handleLogout}
                    loading={loading}
                  />
                </nav>
              )}
            </div>
          </div>
        </nav>
      </header>
    </Fragment>
  );
}
