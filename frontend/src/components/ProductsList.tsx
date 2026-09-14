import type { Product } from "../interfaces/Product";

interface ProductsListProps {
  productsFiltered: Product[];
}

export const ProductsList = ({ productsFiltered }: ProductsListProps) => {
  return (
    <main className="w-full px-6 py-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full">
        {productsFiltered.map((product: Product) => (
          <div
            key={product.id}
            className="flex flex-row font-semibold border-gray-300 p-2 transition bg-white shadow-md"
          >
            <div className="text-gray-700  flex w-3/5 flex-col gap-1">
              <div>
                <h2 className="text-black font-semibold text-lg truncate">
                  {product.name}
                </h2>
                <span className="text-sm text-black">SKU: #{product.sku}</span>
              </div>

              <div className="flex gap-2 text-sm">
                <span>On stock:</span>

                <p>{product.stock}</p>
              </div>

              <div>
                <p className="text-sm">Price: ${product.sale_price}</p>
              </div>
            </div>

            <div className="flex w-2/5 justify-end">
              <div className="h-25 w-25 items-center flex justify-center bg-red-200 text-center">
                Imagen
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};
