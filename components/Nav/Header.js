import Link from "next/link";
import { useRouter } from "next/router";
import React, { Fragment, useEffect, useState } from "react";
import useCsrfToken from "../../hooks/useCsrfToken";
import useMyAxios from "../../hooks/useMyAxios";
import { useUserContext } from "../Context/UserContext";
import MyHead from "../Meta/MyHead";

export default function Header() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const { isLoggedIn, setIsLoggedIn } = useUserContext();
  let getCsrf = useCsrfToken();
  // === if user uses more than one tab ===
  let updateLoggedInStatus = () => {
    if (localStorage.getItem("token")) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  };
  useEffect(() => {
    updateLoggedInStatus();
  }, []);
  // === if user uses more than one tab ===
  const router = useRouter();
  const urlPath = router.asPath;
  let handleLogout = async () => {
    localStorage.removeItem("token");
    let csrfToken = await getCsrf();
    let myAxios = useMyAxios(router, csrfToken);
    let res = await myAxios.delete(`/logout`).catch((e) => {
      return e.response;
    });
    updateLoggedInStatus();
    router.push("/");
  };
  return (
    <Fragment>
      <MyHead />
      <header className="sticky top-0 z-50">
        <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800 bg-blue-50">
          <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
            <Link href="/home">
              <div className="flex items-center">
                <img
                  src="https://flowbite.com/docs/images/logo.svg"
                  className="mr-3 h-6 sm:h-9"
                  alt="Flowbite Logo"
                />
                <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
                  SportsConnect
                </span>
              </div>
            </Link>
            <div>
              <nav>
                <section className="MOBILE-MENU flex lg:hidden">
                  <div
                    className="HAMBURGER-ICON space-y-2"
                    onClick={() => setIsNavOpen((prev) => !prev)}
                  >
                    <span className="block h-0.5 w-8 animate-pulse bg-gray-600"></span>
                    <span className="block h-0.5 w-8 animate-pulse bg-gray-600"></span>
                    <span className="block h-0.5 w-8 animate-pulse bg-gray-600"></span>
                  </div>

                  <div className={isNavOpen ? "showMenuNav" : "hideMenuNav"}>
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
                        <Link href="/">
                          <a
                            onClick={() => {
                              updateLoggedInStatus();
                              setIsNavOpen(false);
                            }}
                            className="border-b border-gray-400 text-xl my-12 uppercase hover:bg-gray-200"
                            aria-current="page"
                          >
                            Home
                          </a>
                        </Link>
                      </li>
                      <li>
                        <Link href="/universities">
                          <a
                            onClick={() => {
                              updateLoggedInStatus();
                              setIsNavOpen(false);
                            }}
                            className="border-b border-gray-400 text-xl my-12 uppercase hover:bg-gray-200"
                            aria-current="page"
                          >
                            Universities
                          </a>
                        </Link>
                      </li>
                      <li>
                        <Link href="/steps">
                          <a
                            onClick={() => {
                              updateLoggedInStatus();
                              setIsNavOpen(false);
                            }}
                            className="border-b border-gray-400 text-xl my-12 uppercase hover:bg-gray-200"
                            aria-current="page"
                          >
                            Steps
                          </a>
                        </Link>
                      </li>
                      <li>
                        <Link href="/portfolio">
                          <a
                            onClick={() => {
                              updateLoggedInStatus();
                              setIsNavOpen(false);
                            }}
                            className="border-b border-gray-400 text-xl my-12 uppercase hover:bg-gray-200"
                          >
                            Portfolio
                          </a>
                        </Link>
                      </li>
                      {!isLoggedIn ? (
                        <Fragment>
                          <li>
                            <Link href="/auth/login">
                              <a
                                onClick={() => {
                                  updateLoggedInStatus();
                                  setIsNavOpen(false);
                                }}
                                className="border-b border-gray-400 text-xl my-12 uppercase hover:bg-gray-200"
                              >
                                Log in
                              </a>
                            </Link>
                          </li>
                          <li>
                            <Link href="/auth/signup">
                              <a
                                onClick={() => {
                                  updateLoggedInStatus();
                                  setIsNavOpen(false);
                                }}
                                className="border-b border-gray-400 text-xl my-12 uppercase hover:bg-gray-200"
                              >
                                Sign up
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
                            Log out
                          </span>
                        </li>
                      )}
                    </ul>
                  </div>
                </section>

                <ul className="DESKTOP-MENU hidden space-x-8 lg:flex">
                  <li>
                    <Link href="/home">
                      <a
                        onClick={updateLoggedInStatus}
                        className={
                          "block py-2 pr-4 pl-3 text-gray-700 rounded lg:bg-transparent lg:p-0 dark:text-white hover:border-b hover:border-gray-800 hover:text-blue-700 " +
                          (urlPath.includes("/home")
                            ? "border-b border-gray-800 text-blue-700"
                            : "")
                        }
                        aria-current="page"
                      >
                        Home
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/universities">
                      <a
                        onClick={updateLoggedInStatus}
                        className={
                          "block py-2 pr-4 pl-3 text-gray-700 rounded lg:bg-transparent lg:p-0 dark:text-white hover:border-b hover:border-gray-800 hover:text-blue-700 " +
                          (urlPath.includes("/universities")
                            ? "border-b border-gray-800 text-blue-700"
                            : "")
                        }
                        aria-current="page"
                      >
                        Universities
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/steps">
                      <a
                        onClick={updateLoggedInStatus}
                        className={
                          "block py-2 pr-4 pl-3 text-gray-700 rounded lg:bg-transparent lg:p-0 dark:text-white hover:border-b hover:border-gray-800 hover:text-blue-700 " +
                          (urlPath.includes("/steps")
                            ? "border-b border-gray-800 text-blue-700"
                            : "")
                        }
                        aria-current="page"
                      >
                        Steps
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/portfolio">
                      <a
                        onClick={updateLoggedInStatus}
                        className={
                          "block py-2 pr-4 pl-3 text-gray-700 rounded lg:bg-transparent lg:p-0 dark:text-white hover:border-b hover:border-gray-800 hover:text-blue-700 " +
                          (urlPath.includes("/portfolio")
                            ? "border-b border-gray-800 text-blue-700"
                            : "")
                        }
                        aria-current="page"
                      >
                        {" "}
                        Portfolio
                      </a>
                    </Link>
                  </li>
                  {!isLoggedIn ? (
                    <Fragment>
                      <li>
                        <Link href="/auth/login">
                          <a
                            onClick={updateLoggedInStatus}
                            className={
                              "block py-2 pr-4 pl-3 text-gray-700 rounded lg:bg-transparent lg:p-0 dark:text-white hover:border-b hover:border-gray-800 hover:text-blue-700 " +
                              (urlPath.includes("/auth/login")
                                ? "border-b border-gray-800 text-blue-700"
                                : "")
                            }
                            aria-current="page"
                          >
                            {" "}
                            Log in
                          </a>
                        </Link>
                      </li>
                      <li>
                        <Link href="/auth/signup">
                          <a
                            onClick={updateLoggedInStatus}
                            className={
                              "block py-2 pr-4 pl-3 text-gray-700 rounded lg:bg-transparent lg:p-0 dark:text-white hover:border-b hover:border-gray-800 hover:text-blue-700 " +
                              (urlPath.includes("/auth/signup")
                                ? "border-b border-gray-800 text-blue-700"
                                : "")
                            }
                            aria-current="page"
                          >
                            {" "}
                            Sign up
                          </a>
                        </Link>
                      </li>
                    </Fragment>
                  ) : (
                    <li>
                      <span
                        onClick={handleLogout}
                        className="block py-2 pr-4 pl-3 text-gray-700 rounded lg:bg-transparent lg:p-0 dark:text-white hover:border-b hover:border-gray-800 hover:text-blue-700"
                      >
                        Log out
                      </span>
                    </li>
                  )}
                </ul>
              </nav>
            </div>
          </div>
        </nav>
      </header>
    </Fragment>
  );
}
