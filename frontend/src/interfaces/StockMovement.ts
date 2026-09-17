export interface StockMovement {
  id: number;
  product_id: number;
  type: "IN" | "OUT";
  quantity: number;
  purchase_price?: number;
}
