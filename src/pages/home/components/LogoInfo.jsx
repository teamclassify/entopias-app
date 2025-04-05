import { useTranslation } from "react-i18next";

function LogoInfo() {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col md:flex-row items-center justify-around gap-4 mb-30 w-full pt-5">
      <img
        className="w-[60%] sm:w-[30%]"
        src="/logo-completo.webp"
        alt="logo de la empresa entopias cafe"
      />
      <div className="flex flex-col items-center sm:items-baseline sm:w-[60%] w-full">
        <h2 className="text-2xl font-bold mb-2">
          {t("homePage.about_us.title")}
        </h2>
        <p className="text-[16px] mb-4">{t("homePage.about_us.description")}</p>
      </div>
    </div>
  );
}
export default LogoInfo;
