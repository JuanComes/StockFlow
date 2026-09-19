export interface Product {
  id: number;
  name: string;
  sku: string;
  stock: number;
  sale_price: number;
  description: string;
  category_id: number;
  category: string;
  minimum_stock: number;
}
