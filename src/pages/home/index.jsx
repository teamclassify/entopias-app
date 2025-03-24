import { useEffect } from "react";
import { Link } from "wouter";
import DefaultLayout from "@/components/layouts/DefaultLayout";
import ProductsService from "@/services/api/Products";

import productsData from "../../data/products.json"

function HomePage() {

  useEffect(() => {
    ProductsService.getAll().then((data) => {
      console.log(data);
    });
  }, []);

  return (
    <DefaultLayout>
      <h1>Home</h1>
      {productsData.length === 0 ? (
        <p>No hay productos disponibles.</p>
      ) : (
        productsData.map((product) => (
          <div key={product.id}>
            <p>{product.name}</p>
            <Link href={`/producto/${product.id}`}>
              <button>Ver detalles</button>
            </Link>
          </div>
        ))
      )}
    </DefaultLayout>
  );
}

export default HomePage;
