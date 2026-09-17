interface DetailProductHeader {
  productName: string | undefined;
  productSku: string | undefined;
}

export const ProductHeader = ({
  productName,
  productSku,
}: DetailProductHeader) => {
  return (
    <section className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
      <p className="text-sm text-gray-500">Product</p>

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">{productName}</h1>

          <p className="text-sm text-gray-500">SKU: {productSku}</p>
        </div>
      </div>
    </section>
  );
};
