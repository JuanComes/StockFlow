import { useState } from "react";
import { createStockMovement } from "../services/stock-movements";

export const useStockMovement = (
  id: number,
  loadProduct: () => Promise<void>,
) => {
  const [stockQuantity, setStockQuantity] = useState("");
  const [addStock, setAddStock] = useState(false);
  const [error, setError] = useState("");
  const [purchasePrice, setPurchasePrice] = useState("");

  const handleAccept = async () => {
    const quantity = Number(stockQuantity);

    if (!quantity) return;

    try {
      let type: "IN" | "OUT";
      let purchasePriceValue: number | undefined;

      if (quantity > 0) {
        type = "IN";
        purchasePriceValue = purchasePrice ? Number(purchasePrice) : 0;
      } else {
        type = "OUT";
        purchasePriceValue = undefined;
      }

      await createStockMovement(
        id,
        type,
        Math.abs(quantity),
        purchasePriceValue,
      );

      await loadProduct();

      setAddStock(false);
      setStockQuantity("");
      setPurchasePrice("");
      setError("");
    } catch (error) {
      setError(error instanceof Error ? error.message : "Something went wrong");
    }
  };

  const handleAddStock = () => {
    setAddStock(true);
  };

  return {
    stockQuantity,
    setStockQuantity,
    addStock,
    setAddStock,
    error,
    setError,
    purchasePrice,
    setPurchasePrice,
    handleAddStock,
    handleAccept,
  };
};
