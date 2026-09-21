import { useNavigate } from "react-router-dom";
import type { Product } from "../interfaces/Product";

export const useProductNavigation = (
  products: Product[],
  productId: number,
) => {
  const navigate = useNavigate();

  const currentIndex = products.findIndex(
    (product) => product.id === productId,
  );

  const previousProduct = products[currentIndex - 1];
  const nextProduct = products[currentIndex + 1];

  const handlePreviousProduct = () => {
    if (previousProduct) {
      navigate(`/products/${previousProduct.id}`);
    }
  };

  const handleNextProduct = () => {
    if (nextProduct) {
      navigate(`/products/${nextProduct.id}`);
    }
  };

  return {
    currentIndex,
    handlePreviousProduct,
    handleNextProduct,
  };
};
