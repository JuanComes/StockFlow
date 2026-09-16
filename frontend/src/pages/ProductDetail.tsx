import { useParams } from "react-router-dom";
import type { Product } from "../interfaces/Product";
import { useEffect, useState } from "react";
import { getProductById } from "../services/product";
import { NavBar } from "../components/NavBar";
import { Button } from "../components/ui/Button";
import { PageToolbar } from "../components/ui/PageToolBar";
import { ProductTopCard } from "../components/ProductTopCard";

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
    <div className="min-h-screen w-full bg-[#f8f6f0] text-gray-700 flex flex-col">
      <div className="bg-white h-32 flex-col">
        <NavBar title="Products" />
        <PageToolbar>
          <Button label="New" />
          <ProductTopCard onHand={product?.stock} />
        </PageToolbar>
      </div>
      <div className="flex px-3 md:px-6 w-full h-full flex-col py-4">
        <p className="text-gray-500">Product</p>
        <h1 className="text-2xl font-bold">{product?.name}</h1>
        <div>
          <h3 className="text-lg font-semibold">General Information</h3>
          <div>
            <span>On Stock: {}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
