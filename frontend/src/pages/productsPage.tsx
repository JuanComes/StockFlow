import { useEffect, useState } from "react";
import { getProducts } from "../services/product";
import { ProductsNav } from "../components/ProductsNav";
import { ProductsList } from "../components/ProductsList";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const loadProducts = async () => {
      const data = await getProducts();
      setProducts(data);
    };

    loadProducts();
  }, []);

  const productsFiltered = products.filter((product: any) =>
    product.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="min-h-screen w-full bg-[#f8f6f0] text-gray-700 flex flex-col">
      <ProductsNav search={search} setSearch={setSearch} />

      <ProductsList productsFiltered={productsFiltered} />
    </div>
  );
};

export default ProductsPage;
