import myAxiosPrivate from '../myAxiosPrivate';
import { getCsrfToken } from './auth';

export async function createExperience(createObject) {
  try {
    let csrfToken = await getCsrfToken();
    let myAxios = myAxiosPrivate(csrfToken);
    let res = await myAxios.post(`/experiences`, createObject).catch((e) => {
      return e.response;
    });
    return res;
  } catch (error) {
    console.log(error);
  }
}

export async function getExperiences() {
  try {
    let csrfToken = await getCsrfToken();
    let myAxios = myAxiosPrivate(csrfToken);
    let res = await myAxios.get(`/experiences`).catch((e) => {
      return e.response;
    });
    return res;
  } catch (error) {
    console.log(error);
  }
}

export async function updateExperience(id, updateObject) {
  try {
    let csrfToken = await getCsrfToken();
    let myAxios = myAxiosPrivate(csrfToken);
    let res = await myAxios
      .put(`/experiences/${id}`, updateObject)
      .catch((e) => {
        return e.response;
      });
    return res;
  } catch (error) {
    console.log(error);
  }
}

export async function deleteExperience(id) {
  try {
    let csrfToken = await getCsrfToken();
    let myAxios = myAxiosPrivate(csrfToken);
    let res = await myAxios.delete(`/experiences/${id}`).catch((e) => {
      return e.response;
    });
    return res;
  } catch (error) {
    console.log(error);
  }
}
