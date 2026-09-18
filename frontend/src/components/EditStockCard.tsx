import { Button } from "./ui/Button";

interface EditStockCardProps {
  stockQuantity: string;
  setStockQuantity: (stockQuantity: string) => void;
  purchasePrice: string;
  setPurchasePrice: (purchasePrice: string) => void;
  error: string;
  setError: (error: string) => void;
  handleAccept: (purchasePrice: number) => void;
  setAddStock: (addStock: boolean) => void;
}

export const EditStockCard = ({
  stockQuantity,
  error,
  purchasePrice,
  setError,
  setPurchasePrice,
  setStockQuantity,
  handleAccept,
  setAddStock,
}: EditStockCardProps) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div className="w-100 rounded-xl bg-white p-6 shadow-xl">
        <h2 className="mb-1 text-xl font-semibold text-gray-900">Add Stock</h2>

        <p className="mb-6 text-sm text-gray-500">
          Enter the quantity you want to add or remove from stock.
        </p>

        <div className="space-y-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">
              Quantity
            </label>

            <input
              type="number"
              value={stockQuantity}
              onChange={(e) => setStockQuantity(e.target.value)}
              placeholder="Enter quantity"
              className="w-full rounded-md border border-gray-300 px-3 py-2.5 outline-none transition focus:border-gray-500 focus:ring-1 focus:ring-gray-300"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">
              Purchase price
              <span className="ml-1 font-normal text-gray-400">(optional)</span>
            </label>

            <input
              type="number"
              min="0"
              step="0.01"
              value={purchasePrice}
              onChange={(e) => setPurchasePrice(e.target.value)}
              placeholder="Enter purchase price"
              disabled={Number(stockQuantity) < 0}
              className="w-full rounded-md border border-gray-300 px-3 py-2.5 outline-none transition focus:border-gray-500 focus:ring-1 focus:ring-gray-300 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-400"
            />
          </div>

          {error && (
            <div className="rounded-md border border-red-200 bg-red-50 px-3 py-2.5">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <Button
            label="Cancel"
            width="90px"
            textSize="14px"
            onClickFunction={() => {
              setAddStock(false);
              setStockQuantity("");
              setPurchasePrice("");
              setError("");
            }}
          />

          <Button
            label="Accept"
            width="90px"
            textSize="14px"
            onClickFunction={() => {
              handleAccept(Number(purchasePrice));
            }}
          />
        </div>
      </div>
    </div>
  );
};
