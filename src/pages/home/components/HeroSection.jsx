import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useTranslation } from "react-i18next";
import { Link } from "wouter";

function HeroSection() {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center md:flex-row justify-between relative z-10 gap-9 text-white">
      <img
        className="w-[80%] sm:w-[50%]"
        src="/cafes-inicio.webp"
        alt="imagenes de dos cafés entopias"
      />

      <div className="flex flex-col justify-center items-start">
        <div>
          <div className="text-4xl font-bold">
            <h1 className="lg:text-6xl">{t("homePage.title")}</h1>
          </div>
          <Separator className="mt-8 mb-8" />
          <div className="text-2xl font-medium">
            <h3>{t("homePage.description")}</h3>
          </div>

          <div className="mt-4">
            <Button asChild size="lg">
              <Link href="/tienda">
                <span className="text-white">{t("homePage.our_products.button")}</span>
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default HeroSection;
