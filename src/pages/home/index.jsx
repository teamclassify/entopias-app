import { useEffect } from "react";

import DefaultLayout from "@/components/layouts/DefaultLayout";
import ProductsService from "@/services/api/Products";
import ImageBackground from "./components/ImageBackground";
import HeroSection from "./components/HeroSection";
import LogoInfo from "./components/LogoInfo";
import ListProducts from "./components/ListProducts";
import InfoCards from "./components/InfoCards";

function HomePage() {
  useEffect(() => {
    ProductsService.getAll().then((data) => {
      console.log(data);
    });
  }, []);

  return (
    <DefaultLayout>
      <div className="flex justify-center items-center">
        <ImageBackground />
        <HeroSection />
      </div>
      <LogoInfo />
      <ListProducts />
      <InfoCards />
      <div className="relative flex justify-center items-center py-20 my-30">
        {/* Imagen */}
        <div className="absolute left-[30%] top-[40%] translate-x-[-60%] translate-y-[-40%] w-[470px] z-10">
          <img
            src="/taza-de-cafe.jpg"
            alt="Café"
            className="w-full shadow-2xl"
          />
        </div>
        {/* Cuadro */}
        <div
          className="absolute bg-[#9C5B40] text-white p-6 w-[600px] h-[300px] shadow-lg 
                     left-[50%] top-[50%] translate-x-[-18%] translate-y-[-60%]"
        >
          <div className="pl-20 flex flex-col justify-center items-center h-full">
            <p className="text-lg">
              Nuestro café especial es un viaje sensorial que despierta los
              sentidos con sabores y aromas únicos.
            </p>
            <p className="mt-10 text-lg">
              Cada sorbo es un abrazo matutino que ilumina el día con notas
              dulces y tostadas, creando un ritual reconfortante que llena de
              energía y alegría desde el primer aroma hasta el último sorbo.
            </p>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
}

export default HomePage;
