import axios from "axios";
import useCsrfToken from "./useCsrfToken";

export default function useMyAxios(router = null, csrfToken = null) {
  let getCsrf = useCsrfToken();
  let headersObj = { "x-csrf-token": "" };
  if (csrfToken !== null) {
    headersObj = { "x-csrf-token": csrfToken };
  }
  const myAxios = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: headersObj,
    withCredentials: true,
  });

  let handleLogout = async () => {
    localStorage.removeItem("token");
    let csrfToken = await getCsrf();
    let myAxios = useMyAxios(router, csrfToken);
    let res = await myAxios.post(`/logout`).catch((e) => {
      return e.response;
    });
    router.push("/");
  };

  const onRequest = (config) => {
    return config;
  };

  const onRequestError = (error) => {
    return Promise.reject(error);
  };

  const onResponse = (response) => {
    return response;
  };

  const onResponseError = async (error) => {
    if (
      error?.response?.status === 422 &&
      error?.response?.data.detail === "Signature has expired" &&
      error?.response?.config.url !== "/refresh" // for when the access_token expires
    ) {
      // let csrfToken = await getCsrf();
      // let myAxios = useMyAxios(router, csrfToken);
      await myAxios.post("/refresh").catch((e) => {
        return e.response;
      });
      return myAxios.request(error.config); // to retry previous request
    } else if (
      error?.response?.status === 422 &&
      error?.response?.data.detail === "Signature has expired" &&
      error?.response?.config.url === "/refresh" // for when the refresh_token expires
    ) {
      await handleLogout();
      return Promise.reject(error);
    }
    return Promise.reject(error);
  };

  myAxios.interceptors.request.use(onRequest, onRequestError);
  myAxios.interceptors.response.use(onResponse, onResponseError);

  return myAxios;
}
