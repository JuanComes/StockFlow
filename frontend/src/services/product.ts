export async function getProducts() {
  const response = await fetch("http://localhost:3000/api/products");

  const data = await response.json();

  return data;
}

export async function getProductById(id: number) {
  const response = await fetch(`http://localhost:3000/api/products/${id}`);

  const data = await response.json();

  return data;
}
