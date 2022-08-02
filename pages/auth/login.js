import { Fragment, useState } from "react";
import { useRouter } from "next/router";
import Form from "../../components/Auth/Form";
import { useUserContext } from "../../components/Context/UserContext";
import useCsrfToken from "../../hooks/useCsrfToken";
import myAxiosPrivate from "../../axios/myAxiosPrivate";
import useTranslation from "next-translate/useTranslation";

export default function Login() {
  const { t } = useTranslation();
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
      setError("Enter both your username and password");
      return;
    }
    let csrfToken = await getCsrf();
    let myAxios = myAxiosPrivate(router, csrfToken);
    let res = await myAxios
      .post(`/login`, {
        username: username,
        password: password,
      })
      .catch((e) => {
        return e.response;
      });
    switch (res.status) {
      case 200:
        sessionStorage.setItem("token", "isLoggedIn");
        setIsLoggedIn(true);
        router.push("/universities");
        break;
      case 403:
        // setError(res.data.detail); // Invalid credentials
        setError(t("login:invalid_credentials"));
        break;
      default:
        setError("An error occured, please refresh and try again");
    }
  };

  return (
    <Fragment>
      <Form
        text={t("login:log_in")}
        handleUsernameChange={handleUsernameChange}
        handlePasswordChange={handlePasswordChange}
        handleSubmit={handleSubmit}
        error={error}
        setError={setError}
      />
    </Fragment>
  );
}
