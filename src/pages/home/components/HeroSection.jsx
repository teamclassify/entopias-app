import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

function HeroSection() {
  return (
    <div className="flex flex-col items-center md:flex-row justify-between relative z-10 gap-9 text-white">
      <img
        className="w-[80%] sm:w-[50%]"
        src="/cafes-inicio.png"
        alt="imagenes de dos cafés entopias"
      />

      <div className="flex flex-col justify-center items-start">
        <div>
          <div className="text-4xl font-bold">
            <h1 className="lg:text-6xl">Un café premium para momento únicos</h1>
          </div>
          <Separator className="mt-8 mb-8" />
          <div className="text-2xl font-medium">
            <h3>Saborea experiencias inolvidables con cada taza</h3>
          </div>

          <div className="mt-8">
            <Button asChild size="lg">
              <Link href="/tienda">
                <span className="text-white">Ver productos</span>
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default HeroSection;
