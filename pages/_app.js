import "../styles/globals.css";
import Layout from "../components/Layout";
import { UserWrapper } from "../components/Context/UserContext";
import { RouteGuard } from "../components/RouteGuard";

function MyApp({ Component, pageProps }) {
  return (
    <UserWrapper>
      <RouteGuard>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </RouteGuard>
    </UserWrapper>
  );
}

export default MyApp;
