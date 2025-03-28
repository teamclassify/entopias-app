import { useEffect } from "react";

import DefaultLayout from "@/components/layouts/DefaultLayout";
import ProductsService from "@/services/api/Products";
import CardProduct from "../catalog/components/CardProduct";

function HomePage() {
  useEffect(() => {
    ProductsService.getAll().then((data) => {
      console.log(data);
    });
  }, []);

  const features = [
    {
      icon: "👥",
      title: "Atención al cliente",
      description:
        "Contamos con una alta calidad de servicio a nuestros clientes",
    },
    {
      icon: "🚚",
      title: "Envíos nacionales e internacionales",
      description: "Enviamos nuestro café por el mundo",
    },
    {
      icon: "💬",
      title: "Interactúa con nuestro chatbot",
      description: "Descubre cual es el café ideal para ti",
    },
  ];

  return (
    <DefaultLayout>
      <div className="w-screen relative left-1/2 -translate-x-1/2 bg-cover bg-center -mt-8 flex justify-center items-center mb-30">
        <div className="absolute inset-0 h-[90svh]">
          <img
            className="h-[90svh] w-full object-cover"
            src="/imagen-cafe-fondo.jpg"
          />
          <div className="absolute inset-0 bg-[#b76e49] opacity-[.27]"></div>
        </div>
        <div className="text-white w-[80%] relative">
          <div className="flex flex-row justify-between w-full h-[80%]">
            <div className="w-[50%]">
              <img
                className="h-[600px] w-auto"
                src="/cafes-inicio.png"
                alt=""
              />
            </div>
            <div className="flex flex-col h-[500px] w-[50%] justify-center items-start">
              <div>
                <div>
                  <h1 className="text-5xl font-bold">
                    Un café premium para momento únicos
                  </h1>
                </div>
                <hr className="my-7 " />
                <div>
                  <h3 className="text-2xl w-[80%] font-medium">
                    Saborea experiencias inolvidables con cada taza
                  </h3>
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
            <h2 className="text-2xl font-bold mb-2">Sobre Nosotros</h2>
          </div>
          <div>
            <p className="text-[16px] mb-4">
              En Entopias Café, vivimos la pasión por el buen café.
              Seleccionamos granos de alta calidad directamente de productores,
              asegurando autenticidad y sabor en cada taza. Nos enfocamos en
              resaltar las mejores características de cada cosecha a través de
              un proceso cuidadoso que garantiza frescura y excelencia.
            </p>
            <p className="text-[16px]">
              Más que una marca, somos una comunidad que celebra la tradición
              cafetera, conectando a los amantes del café con experiencias
              únicas y auténticas.
            </p>
          </div>
        </div>
      </div>
      <div className="w-full flex flex-col mb-20 items-center">
        <h2 className="text-2xl font-bold mb-2">Nuestros Productos</h2>
        <div className="w-full">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {[...Array(4)].map((_, i) => (
              <CardProduct className="h-20" key={i} />
            ))}
          </div>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-10 p-6 border-t border-gray-300 mb-40">
        {features.map((feature, index) => (
          <div className="flex flex-row items-center">
            <div key={index} className="flex flex-col items-center text-center">
              <div className="text-4xl">{feature.icon}</div>
              <h3 className="font-semibold text-lg text-[#9C5B40] mt-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 mt-1">{feature.description}</p>
            </div>
            <div>
              {index < features.length - 1 && (
                <div className="hidden md:block border-l border-gray-300 h-36 mx-6"></div>
              )}
            </div>
          </div>
        ))}
      </div>
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
