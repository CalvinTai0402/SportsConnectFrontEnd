import { Fragment, useState } from 'react';
import { useRouter } from 'next/router';
import Form from '../../components/Auth/Form';
import { useUserContext } from '../../components/Context/UserContext';
import useTranslation from 'next-translate/useTranslation';
import { login } from '../../network/lib/auth';

export default function Login() {
  const { t } = useTranslation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const { setIsLoggedIn } = useUserContext();
  const [loading, setLoading] = useState(false);
  let handleUsernameChange = (e) => setUsername(e.target.value);
  let handlePasswordChange = (e) => setPassword(e.target.value);
  let handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (username.length === 0 || password.length === 0) {
      setError('Enter both your username and password');
      return;
    }
    setLoading(true);
    let res = await login({
      username: username,
      password: password,
    });
    if (res.status) setLoading(false);
    switch (res.status) {
      case 200:
        sessionStorage.setItem('token', 'isLoggedIn');
        setIsLoggedIn(true);
        router.push('/universities');
        break;
      case 403:
        // setError(res.data.detail); // Invalid credentials
        setError(t('login:invalid_credentials'));
        break;
      default:
        setError('An error occured, please refresh and try again');
    }
  };

  return (
    <Fragment>
      <Form
        text={t('login:log_in')}
        handleUsernameChange={handleUsernameChange}
        handlePasswordChange={handlePasswordChange}
        handleSubmit={handleSubmit}
        error={error}
        setError={setError}
        loading={loading}
      />
    </Fragment>
  );
}
