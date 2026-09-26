type MovementType = "IN" | "OUT" | "ALL";

interface MovementTypeFilter {
  movementType: MovementType;
  handleMovementTypeFilter: (type: MovementType) => void;
}

export const MovementTypeFilter = ({
  movementType,
  handleMovementTypeFilter,
}: MovementTypeFilter) => {
  return (
    <div className="flex h-10 w-full items-center overflow-hidden rounded-md border-2 border-red-800">
      <button
        className={`h-full flex-1 border-r border-red-800 cursor-pointer ${
          movementType === "IN" ? "bg-red-700 text-white" : ""
        }`}
        onClick={() => handleMovementTypeFilter("IN")}
      >
        IN
      </button>

      <button
        className={`h-full flex-1 border-r border-red-800 cursor-pointer ${
          movementType === "OUT" ? "bg-red-700 text-white" : ""
        }`}
        onClick={() => handleMovementTypeFilter("OUT")}
      >
        OUT
      </button>

      <button
        className={`h-full flex-1 cursor-pointer ${
          movementType === "ALL" ? "bg-red-700 text-white" : ""
        }`}
        onClick={() => handleMovementTypeFilter("ALL")}
      >
        ALL
      </button>
    </div>
  );
};
