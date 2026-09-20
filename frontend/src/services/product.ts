import type { Product } from "../interfaces/Product";

export async function getProducts() {
  const response = await fetch("http://localhost:3000/api/products");

  const data = await response.json();

  return data.sort((a: Product, b: Product) => a.id - b.id);
}

export async function getProductById(id: number) {
  const response = await fetch(`http://localhost:3000/api/products/${id}`);

  const data = await response.json();

  return data;
}

export async function updateProduct(
  id: number,
  product: {
    name: string;
    description: string;
    sku: string;
    sale_price: number;
    stock: number;
    minimum_stock: number;
    category_id: number;
  },
) {
  const response = await fetch(`http://localhost:3000/api/products/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  });

  const data = await response.json();

  return data;
}

export async function getCategories() {
  const response = await fetch("http://localhost:3000/api/categories");

  const data = await response.json();

  return data;
}
