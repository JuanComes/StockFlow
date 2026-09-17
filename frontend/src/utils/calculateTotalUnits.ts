import type { StockMovement } from "../interfaces/StockMovement";

export const calculateTotalUnits = (movements: StockMovement[]) => {
  return movements.reduce((total, movement) => total + movement.quantity, 0);
};
