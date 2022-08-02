import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import myAxiosPrivate from "../axios/myAxiosPrivate";
import useCsrfToken from "../hooks/useCsrfToken";

export { RouteGuard };

function RouteGuard({ children }) {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);
  // const [location, _] = useState(router.asPath);
  let getCsrf = useCsrfToken();
  useEffect(() => {
    // first time mount, we redirect to universities if access token in cookies is still valid
    let setSessionStorage = async () => {
      try {
        let csrfToken = await getCsrf();
        let myAxios = myAxiosPrivate(router, csrfToken);
        let res = await myAxios.get(`/users/me`).catch((e) => {
          return e.response;
        });
        if (res.status === 200) {
          sessionStorage.setItem("token", "isLoggedIn");
          router.push("/universities");
        } else if (res.status === 401) {
          sessionStorage.removeItem("token");
        }
      } catch (error) {
        // sessionStorage.removeItem("token");
        // not logged in anymore, don't set token
        console.log(error);
      }
    };
    setSessionStorage();
  }, []);

  useEffect(() => {
    authCheck(router.asPath);
    const hideContent = () => setAuthorized(false);
    router.events.on("routeChangeStart", hideContent);
    router.events.on("routeChangeComplete", authCheck);

    return () => {
      router.events.off("routeChangeStart", hideContent);
      router.events.off("routeChangeComplete", authCheck);
    };
  }, []);

  let authCheck = (url) => {
    // redirect to login page if accessing a private page and not logged in
    const publicPaths = ["/home", "/auth/login", "/auth/signup", "/"];
    let allLocalesPublicPaths = [...publicPaths];
    router.locales.map((locale) => {
      if (locale !== router.defaultLocale) {
        // default locale does not have a prefix
        for (const path of publicPaths) {
          allLocalesPublicPaths.push("/" + locale + path);
        }
      }
    });
    const path = url.split("?")[0];
    if (
      !sessionStorage.getItem("token") &&
      // !isLoggedIn &&
      !allLocalesPublicPaths.includes(path)
    ) {
      setAuthorized(false);
      router.push("/auth/login");
    } else {
      setAuthorized(true);
    }
  };

  return authorized && children;
}
