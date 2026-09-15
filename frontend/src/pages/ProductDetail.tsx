import { useParams } from "react-router-dom";
import type { Product } from "../interfaces/Product";
import { useEffect, useState } from "react";
import { getProductById } from "../services/product";

export const ProductDetail = () => {
  const { id } = useParams();

  const [product, setProduct] = useState<Product>();

  useEffect(() => {
    const loadProduct = async () => {
      const data = await getProductById(Number(id));

      setProduct(data);
    };

    loadProduct();
  }, [id]);

  console.log(product);

  return (
    <div>
      <p>ID: {id}</p>
    </div>
  );
};
