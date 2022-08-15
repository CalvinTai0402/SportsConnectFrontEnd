import myAxiosPrivate from '../myAxiosPrivate';

export async function getPublicUniversities(limit) {
  try {
    let myAxios = myAxiosPrivate();
    let res = await myAxios
      .get(`/universities/public?limit=${limit}`)
      .catch((e) => {
        return e.response;
      });
    return res;
  } catch (error) {
    console.log(error);
  }
}

export async function getUniversities(limit) {
  try {
    let myAxios = myAxiosPrivate();
    let res = await myAxios.get(`/universities?limit=${limit}`).catch((e) => {
      return e.response;
    });
    return res;
  } catch (error) {
    console.log(error);
  }
}

export async function getInterestedUniversities(limit) {
  try {
    let myAxios = myAxiosPrivate();
    let res = await myAxios
      .get(`/universities/interested_only?limit=${limit}`)
      .catch((e) => {
        return e.response;
      });
    return res;
  } catch (error) {
    console.log(error);
  }
}
