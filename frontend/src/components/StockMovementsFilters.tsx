import { MovementTypeFilter } from "./MovementTypeFilter";

interface StockMovementFiltersProps {
  movementType: "IN" | "OUT" | "ALL";
  handleMovementTypeFilter: (type: "IN" | "OUT" | "ALL") => void;
  onClose: () => void;
}

export const StockMovementFilters = ({
  movementType,
  handleMovementTypeFilter,
  onClose,
}: StockMovementFiltersProps) => {
  return (
    <div className="fixed inset-0 z-50 bg-white">
      <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
        <h2 className="text-3xl font-semibold">Filters</h2>

        <button onClick={onClose} className="text-xl">
          ✕
        </button>
      </div>

      <div className="p-4">
        <div>
          <h3 className="font-semibold text-gray-700 mb-2">Movement Type</h3>

          <MovementTypeFilter
            handleMovementTypeFilter={handleMovementTypeFilter}
            movementType={movementType}
          />
        </div>
      </div>
    </div>
  );
};
