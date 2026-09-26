import type { StockMovement } from "../interfaces/StockMovement";

interface StockMovementListProps {
  movements: StockMovement[];
}

export const StockMovementList = ({ movements }: StockMovementListProps) => {
  return (
    <div className="flex flex-col w-full bg-white rounded-lg border border-gray-200 overflow-hidden">
      <div className="grid grid-cols-5 px-3 md:px-6 py-3 bg-gray-50 border-b border-gray-200 text-sm font-semibold text-center">
        <p>ID</p>
        <p>Product</p>
        <p>Purchase Price</p>
        <p>Quantity</p>
        <p>Type</p>
      </div>

      {movements.length > 0 ? (
        movements.map((mov) => (
          <div
            key={mov.id}
            className="grid grid-cols-5 items-center px-3 md:px-6 py-3 border-b border-gray-200 last:border-b-0 text-sm text-center"
          >
            <p>{mov.id}</p>

            <p className="font-medium">{mov.product_name}</p>

            <p>{mov.purchase_price != null ? `$${mov.purchase_price}` : "-"}</p>

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
  );
};
