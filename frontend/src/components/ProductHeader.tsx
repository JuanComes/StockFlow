interface DetailProductHeaderProps {
  productName: string | undefined;
  productSku: string | undefined;
  isEditing: boolean;
  editName: string;
  handleEdit: () => void;
  setEditName: (name: string) => void;
}

export const ProductHeader = ({
  productName,
  productSku,
  isEditing,
  editName,
  handleEdit,
  setEditName,
}: DetailProductHeaderProps) => {
  return (
    <section className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
      <p className="text-sm text-gray-500">Product</p>

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
        <div>
          {isEditing ? (
            <input
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              autoFocus
              className="text-2xl font-bold text-gray-800 border-b border-gray-400 outline-none"
            />
          ) : (
            <h1
              className="text-2xl font-bold text-gray-800 cursor-pointer"
              onDoubleClick={handleEdit}
            >
              {productName}
            </h1>
          )}

          <p className="text-sm text-gray-500">SKU: {productSku}</p>
        </div>
      </div>
    </section>
  );
};
