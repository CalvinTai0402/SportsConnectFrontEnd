import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export { RouteGuard };

function RouteGuard({ children }) {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);

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
      !localStorage.getItem("token") &&
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
