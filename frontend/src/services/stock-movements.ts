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

export async function createStockMovement(
  product_id: number,
  type: "IN" | "OUT",
  quantity: number,
  purchase_price: number | undefined,
) {
  const response = await fetch("http://localhost:3000/api/stock-movements", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      product_id,
      type,
      quantity,
      purchase_price,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error);
  }

  return data;
}
