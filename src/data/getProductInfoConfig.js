export function getProductInfoConfig(product) {
  return [
    { label: "", value: product.name },
    { label: "Gramos", value: `${product.varieties[0].weight} gr`, className: "text-sm" },
    // Agrega más datos si quieres
  ];
}
