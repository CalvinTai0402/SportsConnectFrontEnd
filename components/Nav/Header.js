import { useRouter } from 'next/router';
import React, { Fragment, useEffect } from 'react';
import { useUserContext } from '../Context/UserContext';
import MyHead from '../Meta/MyHead';
import updateLoggedInStatus from '../../utilities/updateLoggedInStatus';
import { logout } from '../../network/lib/auth';
import HeaderNavLarge from './HeaderNavLarge';
import HeaderNavSmall from './HeaderNavSmall';
import Home from './Home';

export default function Header() {
  const { isLoggedIn, setIsLoggedIn } = useUserContext();
  // === if user uses more than one tab ===
  useEffect(() => {
    updateLoggedInStatus(setIsLoggedIn);
  }, []);
  // === if user uses more than one tab ===
  const router = useRouter();
  let handleLogout = async () => {
    sessionStorage.removeItem('token');
    let res = await logout();
    if (res.status === 200) router.push('/');
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
              <nav>
                <HeaderNavSmall
                  updateLoggedInStatus={updateLoggedInStatus}
                  isLoggedIn={isLoggedIn}
                  setIsLoggedIn={setIsLoggedIn}
                  handleLogout={handleLogout}
                />
                <HeaderNavLarge
                  updateLoggedInStatus={updateLoggedInStatus}
                  isLoggedIn={isLoggedIn}
                  setIsLoggedIn={setIsLoggedIn}
                  handleLogout={handleLogout}
                />
              </nav>
            </div>
          </div>
        </nav>
      </header>
    </Fragment>
  );
}
