import { Link } from "wouter";
import { AspectRatio } from "@/components/ui/aspect-ratio";

function CardProduct() {
  return (
    <Link href={"/producto/1"}>
      <div className="card">
        <AspectRatio ratio={9 / 16}>
          <img
            src="/entopias_cafe.png"
            className="card-img-top object-cover h-full w-full rounded-md"
            alt={"imagen de café entopias"}
          />
        </AspectRatio>

        <div className="text-center mt-4">
          <h5 className="text-md">Cafe especial</h5>
          <p className="text-sm font-bold">$40.000</p>
        </div>
      </div>
    </Link>
  );
}

export default CardProduct;
