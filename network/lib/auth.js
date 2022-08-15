import axios from 'axios';
import myAxiosPrivate from '../myAxiosPrivate';

export async function getCsrfToken() {
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
}

export async function login(userObject) {
  try {
    let csrfToken = await getCsrfToken();
    let myAxios = myAxiosPrivate(csrfToken);
    let res = await myAxios.post(`/auth/login`, userObject).catch((e) => {
      return e.response;
    });
    return res;
  } catch (error) {
    console.log(error);
  }
}

export async function signup(userObject) {
  try {
    let csrfToken = await getCsrfToken();
    let myAxios = myAxiosPrivate(csrfToken);
    let res = await myAxios.post(`/auth/signup`, userObject).catch((e) => {
      return e.response;
    });
    return res;
  } catch (error) {
    console.log(error);
  }
}

export async function logout() {
  try {
    let csrfToken = await getCsrfToken();
    let myAxios = myAxiosPrivate(csrfToken);
    let res = await myAxios.post(`/auth/logout`).catch((e) => {
      return e.response;
    });
    return res;
  } catch (error) {
    console.log(error);
  }
}
