import { useEffect } from "react";

import DefaultLayout from "@/components/layouts/DefaultLayout";
import ProductsService from "@/services/api/Products";

function HomePage() {
  useEffect(() => {
    ProductsService.getAll().then((data) => {
      console.log(data);
    });
  }, []);

  return (
    <DefaultLayout>
      <div className="h-[650px] w-screen relative left-1/2 -translate-x-1/2 bg-cover bg-center -mt-8 flex justify-center items-center mb-30"
        style={{ backgroundImage: `url("/imagen-cafe-fondo.jpg")` }}>
        <div className="text-white w-[80%]">
          <div className="flex flex-row justify-between w-full h-[80%]">
            <div className="w-[50%]">
              <img className="h-[600px] w-auto" src="/cafes-inicio.png" alt="" />
            </div>
            <div className="flex flex-col h-[500px] w-[50%] justify-center items-start">
              <div  >
                <div>
                  <h1 className="text-5xl font-bold" >Un café premium para momento únicos</h1>
                </div>
                <hr className="my-7 " />
                <div>
                  <h3 className="text-2xl w-[80%] font-medium">Saborea experiencias inolvidables con cada taza</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full flex flex-row mb-30">
        <div className="w-[40%] h-[260px] bg-[#ECECEC] flex justify-center p-3">
          <img className="h-full w-auto" src="/logo-completo.png" alt="" />
        </div>
        <div className="flex flex-col w-[60%] items-start pl-16">
          <div>
            <h2 className="text-2xl font-bold mb-2" >Sobre Nosotros</h2>
          </div>
          <div>
            <p className="text-[16px] mb-4">
              En Entopias Café, vivimos la pasión por el buen café. Seleccionamos granos de alta calidad directamente
              de productores, asegurando autenticidad y sabor en cada taza. Nos enfocamos en resaltar las mejores
              características de cada cosecha a través de un proceso cuidadoso que garantiza frescura y excelencia.

            </p>
            <p className="text-[16px]">
              Más que una marca, somos una comunidad que celebra la tradición cafetera, conectando a los amantes del
              café con experiencias únicas y auténticas.
            </p>
          </div>
        </div>
      </div>
      <div className="w-full flex flex-col mb-20 items-center">
        <h2 className="text-2xl font-bold mb-2">Nuestros Productos</h2>
        <div>
        </div>
      </div>
    </DefaultLayout>
  );
}

export default HomePage;
