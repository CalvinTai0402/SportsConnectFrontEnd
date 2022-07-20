import axios from "axios";
import { useEffect } from "react";
import { useUserContext } from "../components/Context/UserContext";

const useMyAxios = (csrfToken = null) => {
  // const { auth, csrfToken } = useUserContext();
  let headersObj = { "x-csrf-token": "" };
  if (csrfToken !== null) {
    headersObj = { "x-csrf-token": csrfToken };
  }
  const myAxios = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: headersObj,
    withCredentials: true,
  });

  // const refresh = async () => {
  //   let res = await axios.post("/refresh", {
  //     withCredentials: true,
  //     headers: {
  //       Authorization: `Bearer ${auth.refresh_token}`,
  //     },
  //   });
  //   setAuth((prev) => {
  //     console.log(JSON.stringify(prev));
  //     console.log(res.data.access_token);
  //     return { ...prev, access_token: res.data.access_token };
  //   });
  //   return res.data.access_token;
  // };

  // useEffect(() => {
  //   const requestIntercept = myAxios.interceptors.request.use(
  //     (config) => {
  //       if (!config.headers["Authorization"]) {
  //         config.headers["Authorization"] = `Bearer ${auth?.access_token}`;
  //       }
  //       return config;
  //     },
  //     (error) => Promise.reject(error)
  //   );

  //   const responseIntercept = myAxios.interceptors.response.use(
  //     (response) => response,
  //     async (error) => {
  //       const prevRequest = error?.config;
  //       if (error?.response?.status === 422 && !prevRequest?.sent) {
  //         prevRequest.sent = true;
  //         const newAccessToken = await refresh();
  //         prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
  //         return myAxios(prevRequest);
  //       }
  //       return Promise.reject(error);
  //     }
  //   );

  //   return () => {
  //     myAxios.interceptors.request.eject(requestIntercept);
  //     myAxios.interceptors.response.eject(responseIntercept);
  //   };
  // }, [auth, refresh]);

  return myAxios;
};

export default useMyAxios;
