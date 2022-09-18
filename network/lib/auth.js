import myAxiosPrivate from '../myAxiosPrivate';

export async function login(userObject) {
  try {
    let myAxios = await myAxiosPrivate();
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
    let myAxios = await myAxiosPrivate();
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
    let myAxios = await myAxiosPrivate();
    let res = await myAxios.post(`/auth/logout`).catch((e) => {
      return e.response;
    });
    return res;
  } catch (error) {
    console.log(error);
  }
}
