import type { Category } from "../interfaces/Category";

interface ProductSummaryProps {
  productStock: number | undefined;
  productSalePrice: number | undefined;
  productCategory: string | undefined;
  productMinimumStock: number | undefined;

  isEditing: boolean;

  editCategoryId: number | undefined;
  setEditCategoryId: (id: number) => void;

  editSalePrice: number | undefined;
  setEditSalePrice: (price: number) => void;

  editMinimumStock: number | undefined;
  setEditMinimumStock: (stock: number) => void;

  handleEdit: () => void;

  categories: Category[];
}

export const ProductSummary = ({
  productStock,
  productSalePrice,
  productCategory,
  productMinimumStock,
  isEditing,
  editCategoryId,
  setEditCategoryId,
  editSalePrice,
  setEditSalePrice,
  editMinimumStock,
  setEditMinimumStock,
  categories,
  handleEdit,
}: ProductSummaryProps) => {
  return (
    <section className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm my-5">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        General Information
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <p className="text-sm text-gray-500">Stock</p>
          <p
            className="text-lg font-semibold text-gray-800"
            onDoubleClick={handleEdit}
          >
            {productStock} Units
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Sale Price</p>

          {isEditing ? (
            <input
              type="number"
              value={editSalePrice}
              onChange={(e) => setEditSalePrice(Number(e.target.value))}
              className="text-lg font-semibold text-gray-800 border-b border-gray-400 outline-none w-full"
            />
          ) : (
            <p
              className="text-lg font-semibold text-gray-800 "
              onDoubleClick={handleEdit}
            >
              ${productSalePrice}
            </p>
          )}
        </div>

        <div>
          <p className="text-sm text-gray-500">Category</p>

          {isEditing ? (
            <select
              value={editCategoryId}
              onChange={(e) => setEditCategoryId(Number(e.target.value))}
              className="text-lg font-semibold text-gray-800 border-b border-gray-400 outline-none"
            >
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          ) : (
            <p
              className="text-lg font-semibold text-gray-800"
              onDoubleClick={handleEdit}
            >
              {productCategory}
            </p>
          )}
        </div>

        <div>
          <p className="text-sm text-gray-500">Minimum Stock</p>

          {isEditing ? (
            <input
              type="number"
              value={editMinimumStock}
              onChange={(e) => setEditMinimumStock(Number(e.target.value))}
              className="text-lg font-semibold text-gray-800 border-b border-gray-400 outline-none w-full"
            />
          ) : (
            <p
              className="text-lg font-semibold text-gray-800"
              onDoubleClick={handleEdit}
            >
              {productMinimumStock} Units
            </p>
          )}
        </div>
      </div>
    </section>
  );
};
