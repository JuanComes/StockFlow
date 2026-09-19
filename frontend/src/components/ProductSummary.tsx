interface ProductSummaryProps {
  productStock: number | undefined;
  productSalePrice: number | undefined;
  productCategory: string | undefined;
  productMinimumStock: number | undefined;
}

export const ProductSummary = ({
  productStock,
  productSalePrice,
  productCategory,
  productMinimumStock,
}: ProductSummaryProps) => {
  return (
    <section className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm my-5">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        General Information
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <p className="text-sm text-gray-500">Stock</p>
          <p className="text-lg font-semibold text-gray-800">
            {productStock} Units
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Sale Price</p>
          <p className="text-lg font-semibold text-gray-800">
            ${productSalePrice}
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Category</p>
          <p className="text-lg font-semibold text-gray-800">
            {productCategory}
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Minimum Stock</p>
          <p className="text-lg font-semibold text-gray-800">
            {productMinimumStock} Units
          </p>
        </div>
      </div>
    </section>
  );
};
