import { Link } from "wouter";
import { AspectRatio } from "@/components/ui/aspect-ratio";

function CardProduct() {
  return (
    <Link href={"/"}>
      <div className="card">
        <AspectRatio ratio={9 / 16}>
          <img
            src={""}
            className="card-img-top object-cover h-full w-full rounded-md"
            alt={""}
          />
        </AspectRatio>

        <div className="text-center mt-4">
          <h5 className="text-md">{""}</h5>
          <p className="text-sm font-bold">$40.000</p>
        </div>
      </div>
    </Link>
  );
}

export default CardProduct;
