import { useRoute } from "wouter";
import DefaultLayout from "@/components/layouts/DefaultLayout";
import productsData from "@/data/products.json";

import cafeImage from '@/assets/cafe.png'; 

function ProductDetail() {
  const [match, params] = useRoute("/producto/:id");

  if (!match) return <DefaultLayout><h1>Ruta no válida</h1></DefaultLayout>;

  const productId = parseInt(params.id);
  const product = productsData.find((p) => p.id === productId);

  if (!product) return <DefaultLayout><h1>Producto no encontrado</h1></DefaultLayout>;

  return (
    <DefaultLayout>
      <img src={cafeImage} alt={product.name} width={300} />
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p><strong>Precio:</strong> {product.price}</p>
      <p><strong>Sabor:</strong> {product.sabor}</p>
      <p><strong>Tostado:</strong> {product.tostado}</p>
      <p><strong>Presentación:</strong> {product.presentacion}</p>
      <p><strong>Cantidad:</strong> {product.cantidad}</p>
    </DefaultLayout>
  );
}

export default ProductDetail;
