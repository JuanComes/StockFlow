import { useEffect, useState } from "react";
import { ProductsNav } from "../components/ProductsNav";
import { ProductsList } from "../components/ProductsList";
import { useProductStore } from "../store/productStore";

const ProductsPage = () => {
  const products = useProductStore((state) => state.products);
  const getProducts = useProductStore((state) => state.getProducts);
  const getStartIndex = useProductStore((state) => state.getStartIndex);
  const getEndIndex = useProductStore((state) => state.getEndIndex);
  const page = useProductStore((state) => state.page);

  console.log(page);

  const [search, setSearch] = useState("");

  useEffect(() => {
    getProducts();
  }, []);

  const productsFiltered = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase()),
  );

  const start = getStartIndex();
  const end = getEndIndex();

  const productsToShow = productsFiltered.slice(start, end);
  return (
    <div className="min-h-screen w-full bg-[#f8f6f0] text-gray-700 flex flex-col">
      <ProductsNav
        search={search}
        setSearch={setSearch}
        amountOfProducts={productsFiltered.length}
      />

      <ProductsList productsFiltered={productsToShow} />
    </div>
  );
};

export default ProductsPage;
