export interface StockMovement {
  id: number;
  product_id: number;
  product_name: string;
  type: "IN" | "OUT";
  quantity: number;
  purchase_price: number;
}
