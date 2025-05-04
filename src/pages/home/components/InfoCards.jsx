import { Separator } from "@/components/ui/separator";
import { useTranslation } from "react-i18next";

function InfoCards() {
  const { t } = useTranslation();

  const features = [
    {
      icon: "👥",
      title: t("homePage.services.customer_service.title"),
      description: t("homePage.services.customer_service.description"),
    },
    {
      icon: "🚚",
      title: t("homePage.services.delivery.title"),
      description: t("homePage.services.delivery.description"),
    },
    {
      icon: "💬",
      title: t("homePage.services.chatbot.title"),
      description: t("homePage.services.chatbot.description"),
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
            <Separator
              orientation="vertical"
              className="sm:ml-7 hidden sm:inline-flex"
            />
          ) : (
            <div>
              <Separator
                orientation="vertical"
                className="sm:ml-7 hidden sm:inline-flex"
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default InfoCards;
