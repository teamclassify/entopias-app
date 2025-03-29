import { useEffect } from "react";

import DefaultLayout from "@/components/layouts/DefaultLayout";
import ProductsService from "@/services/api/Products";
import ImageBackground from "./components/ImageBackground";
import HeroSection from "./components/HeroSection";
import LogoInfo from "./components/LogoInfo";
import ListProducts from "./components/ListProducts";
import InfoCards from "./components/InfoCards";
import Message from "./components/Message";

function HomePage() {
  useEffect(() => {
    ProductsService.getAll().then((data) => {
      console.log(data);
    });
  }, []);

  return (
    <DefaultLayout>
      <div className="flex justify-center items-center pb-40">
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
