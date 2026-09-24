import { useEffect, useState } from "react";
import { NavBar } from "../components/NavBar";
import { Button } from "../components/ui/Button";
import { PageToolbar } from "../components/ui/PageToolBar";
import { SearchInput } from "../components/ui/SearchInput";
import { Pagination } from "../components/ui/Pagination";

import type { StockMovement } from "../interfaces/StockMovement";
import { getStockMovements } from "../services/stock-movements";

export const StockMovements = () => {
  const [stockMovements, setStockMovements] = useState<StockMovement[]>([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const MOVEMENTS_PER_PAGE = 10;

  const handleInput = (text: string) => {
    setSearch(text);
    setPage(1);
  };

  useEffect(() => {
    const loadStockMovements = async () => {
      const data = await getStockMovements();

      setStockMovements(data);
    };

    loadStockMovements();
  }, []);

  const stockMovementsFiltered = stockMovements.filter((movement) =>
    movement.product_name.toLowerCase().includes(search.toLowerCase()),
  );

  const totalPages = Math.ceil(
    stockMovementsFiltered.length / MOVEMENTS_PER_PAGE,
  );

  const nextPage = () => {
    if (page >= totalPages) return;

    setPage(page + 1);
  };

  const previousPage = () => {
    if (page === 1) return;

    setPage(page - 1);
  };

  const currentPageMovements = stockMovementsFiltered.slice(
    (page - 1) * MOVEMENTS_PER_PAGE,
    page * MOVEMENTS_PER_PAGE,
  );

  return (
    <div className="min-h-screen w-full bg-[#f8f6f0] text-gray-700 flex flex-col">
      <div className="bg-white h-32">
        <NavBar title="Stock-Movements" />

        <PageToolbar>
          <div className="flex gap-2 items-center">
            <Button label="New" />
          </div>

          <SearchInput initialValue={search} onChangeFunction={handleInput} />

          <Pagination
            currentPage={page}
            maxPage={totalPages}
            onNext={nextPage}
            onPrevious={previousPage}
          />
        </PageToolbar>
      </div>

      <div className="flex flex-col w-full bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="grid grid-cols-5 px-6 py-3 bg-gray-50 border-b border-gray-200 text-sm font-semibold">
          <p>ID</p>
          <p>Product</p>
          <p>Purchase Price</p>
          <p>Quantity</p>
          <p>Type</p>
        </div>

        {currentPageMovements.length > 0 ? (
          currentPageMovements.map((mov) => (
            <div
              key={mov.id}
              className="grid grid-cols-5 items-center px-6 py-3 border-b border-gray-200 last:border-b-0 text-sm"
            >
              <p>{mov.id}</p>

              <p className="font-medium">{mov.product_name}</p>

              <p>
                {mov.purchase_price != null ? `$${mov.purchase_price}` : "-"}
              </p>

              <p>{mov.quantity}</p>

              <p>{mov.type}</p>
            </div>
          ))
        ) : (
          <div className="flex justify-center py-8">
            <p className="text-gray-500">No stock movements found</p>
          </div>
        )}
      </div>
    </div>
  );
};
