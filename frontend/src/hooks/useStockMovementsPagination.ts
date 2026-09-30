import { useState } from "react";
import type { StockMovement } from "../interfaces/StockMovement";

interface useStockMovementsPaginationProps {
  stockMovementsFiltered: StockMovement[];
  setMovementType: (type: "IN" | "OUT" | "ALL") => void;
}

export const useStockMovementsPagination = ({
  stockMovementsFiltered,
  setMovementType,
}: useStockMovementsPaginationProps) => {
  const [page, setPage] = useState(1);

  const MOVEMENTS_PER_PAGE = 10;

  const totalPages = Math.max(
    1,
    Math.ceil(stockMovementsFiltered.length / MOVEMENTS_PER_PAGE),
  );

  const nextPage = () => {
    if (page >= totalPages) return;

    setPage(page + 1);
  };

  const previousPage = () => {
    if (page === 1) return;

    setPage(page - 1);
  };

  const handleMovementTypeFilter = (type: "IN" | "OUT" | "ALL") => {
    setMovementType(type);
    setPage(1);
  };

  const currentPageMovements = stockMovementsFiltered.slice(
    (page - 1) * MOVEMENTS_PER_PAGE,
    page * MOVEMENTS_PER_PAGE,
  );

  return {
    previousPage,
    nextPage,
    handleMovementTypeFilter,
    totalPages,
    currentPageMovements,
    page,
    setPage,
  };
};
