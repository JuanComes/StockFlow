import { useEffect, useState } from "react";
import { getCategories, getProductById } from "../services/product";
import {
  getInStockMovementsOfAProduct,
  getOutStockMovementsOfAProduct,
} from "../services/stock-movements";
import type { Product } from "../interfaces/Product";
import type { StockMovement } from "../interfaces/StockMovement";
import type { Category } from "../interfaces/Category";

export const useProductDetail = (
  id: number,
  getProducts: () => Promise<void>,
) => {
  const [product, setProduct] = useState<Product>();
  const [inStockMovements, setInStockMovements] = useState<StockMovement[]>([]);

  const [outStockMovements, setOutStockMovements] = useState<StockMovement[]>(
    [],
  );

  const [categories, setCategories] = useState<Category[]>([]);

  const loadProduct = async () => {
    const [
      productData,
      productInMovements,
      productOutMovements,
      categoriesData,
    ] = await Promise.all([
      getProductById(id),
      getInStockMovementsOfAProduct(id),
      getOutStockMovementsOfAProduct(id),
      getCategories(),
    ]);

    setProduct(productData);
    setInStockMovements(productInMovements);
    setOutStockMovements(productOutMovements);
    setCategories(categoriesData);

    await getProducts();
  };

  useEffect(() => {
    loadProduct();
  }, [id]);

  return {
    product,
    inStockMovements,
    outStockMovements,
    categories,
    loadProduct,
  };
};
