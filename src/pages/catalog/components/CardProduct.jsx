import { Link } from "wouter";
import { AspectRatio } from "@/components/ui/aspect-ratio";

function CardProduct({ infoProduct }) {
  return (
    <Link href={`/producto/${infoProduct.id}`}>
      <div className="card">
        <AspectRatio ratio={3 / 4}>
          <div className="bg-[#ECECEC] h-full w-full flex justify-center items-center">
            <img
              src={infoProduct.photos[0].url}
              className="card-img-top object-cover h-[95%]"
              alt={"imagen de café entopias"}
            />
          </div>
        </AspectRatio>
        <div className="text-center border-2 border-[#ECECEC]">
          <h5 className="text-md">{infoProduct.name}</h5>
          <p className="text-sm font-bold text-[#F03634]">${infoProduct.precio.toLocaleString("es-CO")}</p>
        </div>
      </div>
    </Link>
  );
}

export default CardProduct;
