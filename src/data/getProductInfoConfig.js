export function getProductInfoConfig(product) {

  console.log(product)
  return [
    { label: "", value: product.variety.product.name },
    { label: "Gramos", value: `${product.variety.weight} gr`, className: "text-sm" },
    // Agrega más datos si quieres
  ];
}
