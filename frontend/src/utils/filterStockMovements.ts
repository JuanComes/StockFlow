import type { StockMovement } from "../interfaces/StockMovement";

export const filterStockMovements = (
  movements: StockMovement[],
  search: string,
  movementType: "IN" | "OUT" | "ALL",
) => {
  return movements.filter((movement) => {
    const matchesSearch = movement.product_name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesType =
      movementType === "ALL" || movement.type === movementType;

    return matchesSearch && matchesType;
  });
};
