import { useEffect, useState } from "react";
import { getProducts } from "../services/product";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const loadProducts = async () => {
      const data = await getProducts();
      setProducts(data);
    };

    loadProducts();
  }, []);

  console.log(products);

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {products.map((product: any) => (
          <div key={product.id} className="border rounded-lg p-4">
            <h2>{product.name}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsPage;
