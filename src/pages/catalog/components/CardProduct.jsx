import { Link } from "wouter";
import { IoHeartOutline } from "react-icons/io5";
import { TiShoppingCart } from "react-icons/ti";

import { AspectRatio } from "@/components/ui/aspect-ratio";

function CardProduct() {
  return (
    <Link href={"/producto/1"}>
      <div className="card">
        <AspectRatio ratio={3 / 4}>
          <div className="bg-[#ECECEC] h-full w-full flex justify-center items-center">
            <img
              src="/cafe.png"
              className="card-img-top object-cover h-[95%]"
              alt={"imagen de café entopias"}
            />
          </div>
        </AspectRatio>
        <div className="text-center border-2 border-[#ECECEC]">
          <h5 className="text-md">Cafe especial</h5>
          <p className="text-sm font-bold text-[#F03634]">$40.000</p>
        </div>
      </div>
    </Link>
  );
}

export default CardProduct;
