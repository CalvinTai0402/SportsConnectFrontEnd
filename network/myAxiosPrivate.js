import axios from 'axios';
import { logout } from './lib/auth';

const getCsrfToken = async () => {
  try {
    let res = await axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/auth/csrf_token`, {
        withCredentials: true,
      })
      .catch((e) => {
        return e.response;
      });
    return res.data.csrf_token;
  } catch (error) {
    console.log(error);
  }
};

export default async function myAxiosPrivate() {
  const csrfToken = await getCsrfToken();
  const myAxios = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: { 'x-csrf-token': csrfToken },
    withCredentials: true,
  });

  let handleLogout = async () => {
    sessionStorage.removeItem('token');
    let res = await logout();
    if (res.status === 200) window.location.href = '/';
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
      error?.response?.data.detail === 'Signature has expired' &&
      error?.response?.config.url !== '/auth/refresh' // for when the access_token expires
    ) {
      await myAxios.post('/auth/refresh').catch((e) => {
        return e.response;
      });
      return myAxios.request(error.config); // to retry previous request
    } else if (
      error?.response?.status === 422 &&
      error?.response?.data.detail === 'Signature has expired' &&
      error?.response?.config.url === '/auth/refresh' // for when the refresh_token expires
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
