import { Separator } from "@/components/ui/separator";

function InfoCards() {
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
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 p-6 border-t border-gray-300 mb-20">
      {features.map((feature, index) => (
        <div className="flex flex-row items-center justify-center">
          <div key={index} className="flex flex-col items-center text-center">
            <div className="text-4xl">{feature.icon}</div>
            <h3 className="font-semibold text-lg text-[#9C5B40] mt-2">
              {feature.title}
            </h3>
            <p className="text-gray-600 mt-1">{feature.description}</p>
          </div>
          {index < 2 ? (
            <Separator orientation="vertical" className="sm:ml-7 hidden sm:inline-flex" />
          ): <div><Separator orientation="vertical" className="sm:ml-7 hidden sm:inline-flex" /></div>
          }
        </div>
      ))}
    </div>
  );
}

export default InfoCards;
