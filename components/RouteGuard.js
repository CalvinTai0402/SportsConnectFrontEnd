import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { getCurrentUser } from '../network/lib/users';
import Spinner from './Spinner';

export function RouteGuard({ children }) {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);
  const [loading, setLoading] = useState(false);
  const abortControllerRef = useRef(new AbortController());

  const privatePaths = ['/universities', '/myuniversities', '/portfolio'];
  let setSessionStorage = async (url) => {
    // no need to check isLoggedIn or not if it's not a private page
    if (!privatePaths.includes(url)) return;
    setLoading(true);
    try {
      let res = await getCurrentUser(abortControllerRef.current);
      if (res?.status === 200) {
        setLoading(false);
        sessionStorage.setItem('token', 'isLoggedIn');
      } else if (res?.status === 401) {
        setLoading(false);
        sessionStorage.removeItem('token');
      }
    } catch (error) {
      setLoading(false);
    }
    return;
  };

  useEffect(() => {
    let hideContent = () => setAuthorized(false);
    let checkLoggedInAndRedirect = async (url) => {
      await setSessionStorage(url); // await is necessary because setSessionStorage alters sessionStorage which authCheck depends on
      authCheck(url);
    };
    checkLoggedInAndRedirect(router.asPath);
    router.events.on('routeChangeStart', hideContent);
    router.events.on('routeChangeComplete', checkLoggedInAndRedirect);

    return () => {
      router.events.off('routeChangeStart', hideContent);
      router.events.off('routeChangeComplete', checkLoggedInAndRedirect);
      abortControllerRef.current.abort();
    };
  }, []);

  let addLocalesToPaths = (paths) => {
    let pathsWithAllLocales = [...paths];
    router.locales.map((locale) => {
      // default locale does not have a prefix
      if (locale !== router.defaultLocale) {
        for (const path of paths) {
          pathsWithAllLocales.push('/' + locale + path);
        }
      }
    });
    return pathsWithAllLocales;
  };

  let authCheck = (url) => {
    let allLocalesPrivatePaths = addLocalesToPaths(privatePaths);
    const path = url.split('?')[0];
    if (
      !sessionStorage.getItem('token') &&
      allLocalesPrivatePaths.includes(path)
    ) {
      setAuthorized(false);
      router.push('/auth/login'); // redirect to login page if accessing a private page and not logged in
    } else {
      setAuthorized(true); // show content
    }
  };

  return loading ? (
    <div className="flex h-screen">
      <Spinner size={12} />
    </div>
  ) : (
    authorized && children
  );
}
