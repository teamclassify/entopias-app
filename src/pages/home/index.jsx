import DefaultLayout from "@/components/layouts/DefaultLayout";
import HeroSection from "./components/HeroSection";
import ImageBackground from "./components/ImageBackground";
import InfoCards from "./components/InfoCards";
import ListProducts from "./components/ListProducts";
import LogoInfo from "./components/LogoInfo";
import Message from "./components/Message";

//import productsData from "../../data/products.json"

function HomePage() {
  // useEffect(() => {
  //   ProductsService.getAll().then((data) => {
  //     console.log(data);
  //   });
  // }, []);

  return (
    <DefaultLayout>
      <div className="w-full h-[calc(100vh-4rem)] flex items-center">
        <ImageBackground />
        <HeroSection />
      </div>
      <LogoInfo />
      <ListProducts />
      <InfoCards />
      <Message />
    </DefaultLayout>
  );
}

export default HomePage;
