export async function getInStockMovementsOfAProduct(id: number) {
  const response = await fetch(
    `http://localhost:3000/api/stock-movements/product/${id}/in`,
  );

  const data = await response.json();

  return data;
}

export async function getOutStockMovementsOfAProduct(id: number) {
  const response = await fetch(
    `http://localhost:3000/api/stock-movements/product/${id}/out`,
  );

  const data = await response.json();

  return data;
}

export async function getStockMovementsOfAProduct(id: number) {
  const response = await fetch(
    `http://localhost:3000/api/stock-movements/product/${id}`,
  );

  const data = await response.json();

  return data;
}
