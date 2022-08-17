import '../styles/globals.css';
import Layout from '../components/Layout';
import { UserWrapper } from '../components/Context/UserContext';
import { RouteGuard } from '../components/RouteGuard';
import { Offline } from 'react-detect-offline';
import { Fragment } from 'react';
import Modal from '../components/Modal/Modal';
import useTranslation from 'next-translate/useTranslation';

function MyApp({ Component, pageProps }) {
  const { t } = useTranslation();
  let offlineTitle = t('offline:offline_title');
  let offlineDescription = t('offline:offline_description');

  return (
    <Fragment>
      <UserWrapper>
        <RouteGuard>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </RouteGuard>
      </UserWrapper>
      <Offline>
        <Modal
          initialShow={true}
          title={offlineTitle}
          description={offlineDescription}
        />
      </Offline>
    </Fragment>
  );
}

export default MyApp;
