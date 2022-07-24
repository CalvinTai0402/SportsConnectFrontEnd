import { Fragment, useState } from "react";
import { useRouter } from "next/router";
import Form from "../../components/Auth/Form";
import { useUserContext } from "../../components/Context/UserContext";
import useCsrfToken from "../../hooks/useCsrfToken";
import myAxiosPrivate from "../../axios/myAxiosPrivate";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const { setIsLoggedIn } = useUserContext();
  let getCsrf = useCsrfToken();
  let handleUsernameChange = (e) => setUsername(e.target.value);
  let handlePasswordChange = (e) => setPassword(e.target.value);
  let getMobileOperatingSystem = () => {
    var userAgent = navigator.userAgent || navigator.vendor || window.opera;
    // Windows Phone must come first because its UA also contains "Android"
    if (/windows phone/i.test(userAgent)) {
      return "Windows Phone";
    }
    if (/android/i.test(userAgent)) {
      return "Android";
    }
    // iOS detection from: http://stackoverflow.com/a/9039885/177710
    if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
      return "iOS";
    }
    return "unknown";
  };

  let handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (username.length === 0 || password.length === 0) {
      setError("Enter both your email and password");
      return;
    }
    let csrfToken = await getCsrf();
    let myAxios = myAxiosPrivate(router, csrfToken);
    let res = await myAxios
      .post(`/login`, {
        email: username,
        password: password,
      })
      .catch((e) => {
        return e.response;
      });
    switch (res.status) {
      case 200:
        localStorage.setItem("token", "isLoggedIn");
        setIsLoggedIn(true);
        router.push("/universities");
        break;
      case 403:
        setError(res.data.detail);
        break;
      case 422:
        setError(res.data.detail[0].msg);
        break;
      default:
        if (getMobileOperatingSystem() === "iOS") {
          setError(
            "Please go to settings > Safari and disable 'prevent Cross-Site Tracking'"
          );
        } else {
          setError("An error occured, please try again");
        }
      // setError("An error occured, please try again");
    }
  };

  return (
    <Fragment>
      <Form
        text="Log in"
        handleUsernameChange={handleUsernameChange}
        handlePasswordChange={handlePasswordChange}
        handleSubmit={handleSubmit}
        error={error}
        setError={setError}
      />
    </Fragment>
  );
}
