import { Link } from "wouter";
import { AspectRatio } from "@/components/ui/aspect-ratio";

function CardProduct({ infoProduct }) {

  const { name, photos, id, varieties } = infoProduct;

  const url = photos.length > 0 ? photos[0].url : "/cafe.webp";
  const price = varieties.length > 0 ? varieties[0].price : 0;

  return (
    <Link href={`/producto/${id}`}>
      <div className="card">
        <AspectRatio ratio={3 / 4}>
          <div className="bg-sidebar h-full w-full flex justify-center items-center">
            <img
              src={url}
              className="card-img-top object-cover h-[95%]"
              alt={"imagen de café entopias"}
            />
          </div>
        </AspectRatio>
        <div className="text-center border-2 border-[#ECECEC]">
          <h5 className="text-md">{name}</h5>
          <p className="text-sm font-bold text-[#F03634]">
            ${price.toLocaleString("es-CO")}
          </p>
        </div>
      </div>
    </Link>
  );
}

export default CardProduct;
