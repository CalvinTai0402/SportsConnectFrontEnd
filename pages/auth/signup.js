import { Fragment, useState } from "react";
import { useRouter } from "next/router";
import Form from "../../components/Auth/Form";
import { useUserContext } from "../../components/Context/UserContext";
import myAxiosPrivate from "../../axios/myAxiosPrivate";
import useCsrfToken from "../../hooks/useCsrfToken";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const { setIsLoggedIn } = useUserContext();
  let getCsrf = useCsrfToken();

  let handleUsernameChange = (e) => setUsername(e.target.value);
  let handlePasswordChange = (e) => setPassword(e.target.value);
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
      .post(`/signup`, {
        email: username,
        password: password,
      })
      .catch((e) => {
        return e.response;
      });
    switch (res.status) {
      case 201:
        localStorage.setItem("token", "isLoggedIn");
        setIsLoggedIn(true);
        router.push("/universities");
        break;
      case 422:
        if (res.data.detail.constructor === Array) {
          setError(res.data.detail[0].msg);
        } else {
          setError(res.data.detail);
        }
        break;
      default:
        setError("An error occured, please refresh and try again");
    }
  };

  return (
    <Fragment>
      <Form
        text="Sign up"
        handleUsernameChange={handleUsernameChange}
        handlePasswordChange={handlePasswordChange}
        handleSubmit={handleSubmit}
        error={error}
        setError={setError}
      />
    </Fragment>
  );
}
