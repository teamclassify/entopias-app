import Footer from "../base/Footer";
import Header from "../base/Header";

function DefaultLayout({ children, className = "" }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header className="w-[90%] max-w-screen-lg mx-auto" />
      <main className="flex-grow w-[90%] py-8 mx-auto max-w-screen-lg">
        <div className={className}>{children}</div>
      </main>
      <Footer className="w-full" />
    </div>
  );
}

export default DefaultLayout;