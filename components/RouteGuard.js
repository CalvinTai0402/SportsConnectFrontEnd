import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import myAxiosPrivate from "../axios/myAxiosPrivate";
import useCsrfToken from "../hooks/useCsrfToken";

export { RouteGuard };

function RouteGuard({ children }) {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);
  const [loading, setLoading] = useState(true);
  const [location, _] = useState(router.asPath);
  let getCsrf = useCsrfToken();
  let redirecting = true;
  let setSessionStorage = async () => {
    setLoading(true);
    try {
      let csrfToken = await getCsrf();
      let myAxios = myAxiosPrivate(router, csrfToken);
      let res = await myAxios.get(`/users/me`).catch((e) => {
        return e.response;
      });
      if (res.status === 200) {
        setLoading(false);
        sessionStorage.setItem("token", "isLoggedIn");
      } else if (res.status === 401) {
        setLoading(false);
        sessionStorage.removeItem("token");
      }
    } catch (error) {
      setLoading(false);
    }
    return true;
  };

  useEffect(() => {
    authCheck(router.asPath);
    let hideContent = () => setAuthorized(false);
    let checkLoggedInAndRedirect = async (url) => {
      let done = await setSessionStorage();
      if (done) authCheck(url);
    };
    router.events.on("routeChangeStart", hideContent);
    router.events.on("routeChangeComplete", checkLoggedInAndRedirect);

    return () => {
      router.events.off("routeChangeStart", hideContent);
      router.events.off("routeChangeComplete", checkLoggedInAndRedirect);
    };
  }, []);

  let addLocalesToPaths = (paths) => {
    let pathsWithAllLocales = [...paths];
    router.locales.map((locale) => {
      // default locale does not have a prefix
      if (locale !== router.defaultLocale) {
        for (const path of paths) {
          pathsWithAllLocales.push("/" + locale + path);
        }
      }
    });
    return pathsWithAllLocales;
  };

  let authCheck = (url) => {
    const publicPaths = ["/home", "/auth/login", "/auth/signup", "/"];
    let allLocalesPublicPaths = addLocalesToPaths(publicPaths);
    const path = url.split("?")[0];
    if (
      !sessionStorage.getItem("token") &&
      !allLocalesPublicPaths.includes(path)
    ) {
      setAuthorized(false);
      router.push("/auth/login"); // redirect to login page if accessing a private page and not logged in
    } else if (redirecting) {
      redirecting = false; // redirect to page accessed previously. When a location is pushed, authCheck refires and enters the "else" block.
      router.push(location);
    } else {
      setAuthorized(true); // show content
    }
  };

  return loading ? null : authorized && children;
}
