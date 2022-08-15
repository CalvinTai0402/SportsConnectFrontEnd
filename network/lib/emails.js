import myAxiosPrivate from '../myAxiosPrivate';
import { getCsrfToken } from './auth';

export async function sendEmail(payload) {
  try {
    let csrfToken = await getCsrfToken();
    let myAxios = myAxiosPrivate(csrfToken);
    return await myAxios.post(`/emails/send_email`, payload).catch((e) => {
      return e.response;
    });
  } catch (error) {
    console.log(error);
  }
}
