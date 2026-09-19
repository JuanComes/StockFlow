export async function getCatogoryById(id: number) {
  const response = await fetch(`http://localhost:3000/api/categories/${id}`);

  const data = await response.json();

  return data;
}
