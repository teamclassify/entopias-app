import { useState, useCallback, useRef, useEffect } from "react";
import { toast } from "sonner";
import useCart from "./useCart";

export function useProductQuantity(
  quantity,
  setQuantity,
  stock,
  varietyId,
  isCartPage
) {
  const { handleUpdateData } = useCart();
  const [isUpdating, setIsUpdating] = useState(false);
  const changeAccumulator = useRef(0);
  const debounceRef = useRef(null);

  const debouncedUpdate = useCallback(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(() => {
      if (changeAccumulator.current !== 0) {
        setIsUpdating(true);
        handleUpdateData(varietyId, changeAccumulator.current, isCartPage);
        changeAccumulator.current = 0;

        setTimeout(() => {
          setIsUpdating(false);
        }, 5000); 
      }
    }, 800);

  }, [handleUpdateData, varietyId, isCartPage]);

  const handleDecrementQuantity = () => {
    const newQuantity = quantity - 1;
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
      if (!isCartPage) return;
      changeAccumulator.current -= 1;
      debouncedUpdate();
    } else {
      toast.error("Has alcanzado el mínimo permitido");
    }
  };

  const handleIncrementQuantity = () => {
    if (quantity < stock) {
      const newQuantity = quantity + 1;
      setQuantity(newQuantity);
      if (!isCartPage) return;
      changeAccumulator.current += 1;
      debouncedUpdate();
    } else {
      toast.error("Has alcanzado el límite disponible de este producto");
    }
  };

  const resetQuantity = useCallback(
    (value = 1) => {
      setQuantity(value);
    },
    [setQuantity]
  );

  useEffect(() => {
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [varietyId]);

  return {
    quantity,
    handleDecrementQuantity,
    handleIncrementQuantity,
    resetQuantity,
    isUpdating,
  };
}
