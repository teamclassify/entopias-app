import DefaultLayout from "@/components/layouts/DefaultLayout";
import { useTranslation } from "react-i18next";
import HeroSection from "./components/HeroSection";
import ImageBackground from "./components/ImageBackground";
import InfoCards from "./components/InfoCards";
import ListProducts from "@/pages/catalog/components/ListProducts";
import LogoInfo from "./components/LogoInfo";
import Message from "./components/Message";
import ErrorProduct from "@/components/base/ErrorProducts";
import useProduct from "../../hooks/useProducts";

function HomePage() {
  const { t } = useTranslation();
  const { data, isError} = useProduct();

  return (
    <DefaultLayout>
      <div className="w-full h-auto min-h-[calc(100vh-4rem)] flex items-center">
        <ImageBackground />
        <HeroSection />
      </div>
      <LogoInfo />
      <div className="flex flex-col items-center mb-20">
        <h2 className="text-2xl font-bold pb-8">
          {t("homePage.our_products.title")}
        </h2>
        <div className="w-full">
          {isError || data?.error ? (
            <ErrorProduct />
          ):
          <ListProducts />
          }
        </div>
      </div>
      <InfoCards />
      <Message />
    </DefaultLayout>
  );
}

export default HomePage;
