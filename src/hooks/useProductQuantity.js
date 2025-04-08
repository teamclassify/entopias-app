import { useState } from "react";

export function useProductQuantity(stock) {
  const [quantity, setQuantity] = useState(1);

  const increment = () => {
    setQuantity((prev) => (prev < stock ? prev + 1 : prev));
  };

  const decrement = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : prev));
  };

  const reset = () => setQuantity(1);

  return { quantity, increment, decrement, reset };
}
