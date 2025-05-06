import Footer from "../base/Footer";
import Header from "../base/Header";

function DefaultLayout({ children, className = "" }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header className="w-[90%] max-w-screen-lg mx-auto" />

      <main className="w-[90%] py-8 mx-auto max-w-screen-lg flex-grow">
        <div className={`${className}`}>{children}</div>
      </main>

      <Footer className="w-[90%] max-w-screen-lg mx-auto" />
    </div>
  );
}

export default DefaultLayout;
