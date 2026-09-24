import { create } from "zustand";
import type { StockMovement } from "../interfaces/StockMovement";

interface StockMovementStore {
  stockMovements: StockMovement[];
}

export const useProductStore = create<StockMovementStore>((set, get) => ({
  stockMovements: [],
}));
