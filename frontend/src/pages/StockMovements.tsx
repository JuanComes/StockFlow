// React
import { useEffect, useState } from "react";

// UI
import { NavBar } from "../components/NavBar";
import { Button } from "../components/ui/Button";
import { PageToolbar } from "../components/ui/PageToolBar";
import { SearchInput } from "../components/ui/SearchInput";
import { Pagination } from "../components/ui/Pagination";

// Hooks
import { useStockMovementsPagination } from "../hooks/useStockMovementsPagination";

// Services
import { getStockMovements } from "../services/stock-movements";

// Components
import { MovementTypeFilter } from "../components/MovementTypeFilter";
import { StockMovementList } from "../components/StockMovementList";
import { StockMovementFilters } from "../components/StockMovementsFilters";

// Interfaces
import type { StockMovement } from "../interfaces/StockMovement";

// Utils
import { filterStockMovements } from "../utils/filterStockMovements";

export const StockMovements = () => {
  const [stockMovements, setStockMovements] = useState<StockMovement[]>([]);
  const [search, setSearch] = useState("");
  const [movementType, setMovementType] = useState<"IN" | "OUT" | "ALL">("ALL");
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const loadStockMovements = async () => {
      const data = await getStockMovements();

      setStockMovements(data);
    };

    loadStockMovements();
  }, []);

  const stockMovementsFiltered = filterStockMovements(
    stockMovements,
    search,
    movementType,
  );

  const {
    nextPage,
    previousPage,
    totalPages,
    currentPageMovements,
    handleMovementTypeFilter,
    setPage,
    page,
  } = useStockMovementsPagination({
    stockMovementsFiltered,
    setMovementType,
  });

  const handleInput = (text: string) => {
    setSearch(text);
    setPage(1);
  };

  return (
    <div className="min-h-screen w-full bg-[#f8f6f0] text-gray-700 flex flex-col">
      {/* Desktop */}
      <div className="hidden md:block bg-white h-32">
        <NavBar title="Stock-Movements" />

        <PageToolbar>
          <div className="flex gap-2 items-center">
            <Button label="New" />
          </div>

          <div className="flex gap-5">
            <SearchInput initialValue={search} onChangeFunction={handleInput} />

            <MovementTypeFilter
              handleMovementTypeFilter={handleMovementTypeFilter}
              movementType={movementType}
            />
          </div>

          <Pagination
            currentPage={page}
            maxPage={totalPages}
            onNext={nextPage}
            onPrevious={previousPage}
          />
        </PageToolbar>
      </div>

      {/* Mobile */}
      <div className="md:hidden bg-white h-48">
        <NavBar title="Stock-Movements" />

        <PageToolbar>
          <div className="flex gap-2 items-center">
            <Button label="New" />
          </div>

          <SearchInput initialValue={search} onChangeFunction={handleInput} />

          <Button
            label="Filters"
            onClickFunction={() => setShowFilters((prev) => !prev)}
            variant="outline"
            width="5rem"
          />
        </PageToolbar>

        <div className="flex items-center justify-center text-center h-16">
          <Pagination
            currentPage={page}
            maxPage={totalPages}
            onNext={nextPage}
            onPrevious={previousPage}
          />
        </div>
      </div>

      <StockMovementList movements={currentPageMovements} />

      {showFilters && (
        <StockMovementFilters
          movementType={movementType}
          handleMovementTypeFilter={handleMovementTypeFilter}
          onClose={() => setShowFilters(false)}
        />
      )}
    </div>
  );
};
