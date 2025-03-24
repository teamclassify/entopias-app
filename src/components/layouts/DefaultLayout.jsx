import Footer from "../base/Footer";
import Header from "../base/Header";

function DefaultLayout({ children, className = "" }) {
  return (
    <>
      <Header className="w-[90%] max-w-screen-lg mx-auto" />

      <main className="w-[90%] py-8 mx-auto max-w-screen-lg">
        <div className={`${className}`}>{children}</div>
      </main>

      <Footer />
    </>
  );
}

export default DefaultLayout;
