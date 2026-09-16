import { useEffect, useState } from "react";
import { ProductsList } from "../components/ProductsList";
import { useProductStore } from "../store/productStore";
import { Button } from "../components/ui/Button";
import { SearchInput } from "../components/ui/SearchInput";
import { Pagination } from "../components/ui/Pagination";
import { NavBar } from "../components/NavBar";
import { PageToolbar } from "../components/ui/PageToolBar";

const ProductsPage = () => {
  const products = useProductStore((state) => state.products);
  const getProducts = useProductStore((state) => state.getProducts);

  const getStartIndex = useProductStore((state) => state.getStartIndex);
  const getEndIndex = useProductStore((state) => state.getEndIndex);

  const page = useProductStore((state) => state.page);
  const setPage = useProductStore((state) => state.setPage);

  const getTotalPages = useProductStore((state) => state.getTotalPages);
  const previousPage = useProductStore((state) => state.previousPage);
  const nextPage = useProductStore((state) => state.nextPage);

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

  const totalPages = getTotalPages(productsFiltered.length);

  const handleInput = (text: string) => {
    setPage(1);
    setSearch(text);
  };

  return (
    <div className="min-h-screen w-full bg-[#f8f6f0] text-gray-700 flex flex-col">
      <div className="bg-white h-32 flex-col">
        <NavBar title="Products" />
        <PageToolbar>
          <Button label="New" />
          <SearchInput initialValue={search} onChangeFunction={handleInput} />
          <Pagination
            currentPage={page}
            maxPage={totalPages}
            onPrevious={previousPage}
            onNext={() => nextPage(totalPages)}
          />
        </PageToolbar>
      </div>

      <ProductsList productsFiltered={productsToShow} />
    </div>
  );
};

export default ProductsPage;
