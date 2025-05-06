import { useTranslation } from "react-i18next";

function Message() {
  const { t } = useTranslation();

  return (
    <div className="relative flex flex-col lg:flex-row justify-center items-center lg:pb-100">
      <div className="relative top-auto left-auto transform-none lg:absolute lg:left-[30%] lg:top-[40%] lg:translate-x-[-60%] lg:translate-y-[-40%] w-full lg:w-[50%] z-10">
        <img
          src="/taza-de-cafe.webp"
          alt="Café"
          className="w-full shadow-2xl"
        />
      </div>
      <div className="w-full lg:absolute lg:bg-[#9C5B40] lg:text-white lg:p-6 lg:w-[600px] lg:h-[300px] lg:shadow-lg lg:left-[50%] lg:top-[50%] lg:translate-x-[-18%] lg:translate-y-[-60%]">
        <div className="text-center sm:text-left sm:pl-24 flex flex-col justify-center items-center p-2">
          <p className="text-lg">{t("homePage.us_coffee_1")}</p>
          <p className="mt-10 text-lg">{t("homePage.us_coffee_2")}</p>
        </div>
      </div>
    </div>
  );
}
export default Message;
