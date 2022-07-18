import { Fragment, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Form from "../../components/Auth/Form";
import { useUserContext } from "../../components/Context/UserContext";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const { setIsLoggedIn } = useUserContext();
  let handleUsernameChange = (e) => setUsername(e.target.value);
  let handlePasswordChange = (e) => setPassword(e.target.value);
  let handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (username.length === 0 || password.length === 0) {
      setError("Enter both your email and password");
      return;
    }
    let res = await axios
      .post(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
        email: username,
        password: password,
      })
      .catch((e) => {
        return e.response;
      });
    switch (res.status) {
      case 200:
        localStorage.setItem("token", res.data.access_token);
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
        setError("An error occured, please try again");
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
