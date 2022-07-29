import Footer from "./Nav/Footer";
import Header from "./Nav/Header";

export default function Layout({ children }) {
  return (
    <>
      <Header />
      {children}
      <Footer />
      {/* <div className="w-full bottom-0">
      </div> */}
    </>
  );
}
