// Icons
import { Save } from "lucide-react";

// Use
import { useParams } from "react-router-dom";

// UI
import { NavBar } from "../components/NavBar";
import { Button } from "../components/ui/Button";
import { PageToolbar } from "../components/ui/PageToolBar";

// Hooks
import { useProductDetail } from "../hooks/useProductDetail";
import { useStockMovement } from "../hooks/useStockMovement";
import { useProductNavigation } from "../hooks/useProductNavigation";

// Components
import { ProductHeader } from "../components/ProductHeader";
import { ProductTopCard } from "../components/ProductTopCard";
import { EditStockCard } from "../components/EditStockCard";
import { Pagination } from "../components/ui/Pagination";
import { ProductSummary } from "../components/ProductSummary";

// Store
import { useProductStore } from "../store/productStore";

// Utils
import { calculateTotalUnits } from "../utils/calculateTotalUnits";
import { useProductEdit } from "../hooks/useProductEdit";
import { Alert } from "../components/ui/Alert";

export const ProductDetail = () => {
  const { id } = useParams();
  const productId = Number(id);
  const getProducts = useProductStore((state) => state.getProducts);

  const products = useProductStore((state) => state.products);

  const {
    categories,
    inStockMovements,
    outStockMovements,
    product,
    loadProduct,
    loading,
    error,
  } = useProductDetail(productId, getProducts);

  const inUnitsMovement = calculateTotalUnits(inStockMovements);
  const outUnitsMovement = calculateTotalUnits(outStockMovements);

  const { currentIndex, handlePreviousProduct, handleNextProduct } =
    useProductNavigation(products, productId);
  const {
    stockQuantity,
    setStockQuantity,
    addStock,
    setAddStock,
    error: stockError,
    setError: setStockError,
    purchasePrice,
    setPurchasePrice,
    handleAddStock,
    handleAccept,
  } = useStockMovement(productId, loadProduct);

  const {
    handleEdit,
    handleSave,
    isEditing,
    editCategoryId,
    editMinimumStock,
    editName,
    editSalePrice,
    setEditCategoryId,
    setEditMinimumStock,
    setEditName,
    setEditSalePrice,
    error: editError,
    success: editSuccess,
    loading: editLoading,
  } = useProductEdit(product, loadProduct);

  return (
    <div className="min-h-screen w-full bg-[#f8f6f0] text-gray-700 flex flex-col">
      <div className="bg-white h-32">
        <NavBar title="Products" />

        <PageToolbar>
          <div className="flex gap-2 items-center">
            <Button label="New" />

            <button onClick={handleSave} disabled={editLoading}>
              <Save className="text-red-800 w-6 h-6 cursor-pointer" />
            </button>
          </div>

          <div className="flex bg-white items-center gap-12">
            <div className="hidden min-[615px]:flex">
              {!loading && (
                <ProductTopCard
                  onHand={product?.stock}
                  totalIn={inUnitsMovement}
                  totalOut={outUnitsMovement}
                />
              )}
            </div>

            <Button
              label="Add Stock"
              width="96px"
              textSize="14px"
              onClickFunction={handleAddStock}
              disabled={loading}
            />
          </div>

          <Pagination
            currentPage={currentIndex + 1}
            maxPage={products.length}
            onNext={handleNextProduct}
            onPrevious={handlePreviousProduct}
          />
        </PageToolbar>
      </div>

      <div className="min-[615px]:hidden bg-white border-b border-gray-300 px-3 py-2 justify-center flex">
        {!loading && (
          <ProductTopCard
            onHand={product?.stock}
            totalIn={inUnitsMovement}
            totalOut={outUnitsMovement}
          />
        )}
      </div>

      <div className="flex flex-col w-full min-h-full px-3 md:px-6 py-4 bg-[#f8f6f0] lg:px-40">
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <p className="text-gray-500">Loading product...</p>
          </div>
        ) : error ? (
          <section className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-600">{error}</p>
          </section>
        ) : (
          <>
            <ProductHeader
              productName={product?.name}
              productSku={product?.sku}
              isEditing={isEditing}
              editName={editName}
              handleEdit={handleEdit}
              setEditName={setEditName}
            />

            <ProductSummary
              productStock={product?.stock}
              productSalePrice={product?.sale_price}
              productCategory={product?.category}
              productMinimumStock={product?.minimum_stock}
              isEditing={isEditing}
              editCategoryId={editCategoryId}
              setEditCategoryId={setEditCategoryId}
              editSalePrice={editSalePrice}
              setEditSalePrice={setEditSalePrice}
              editMinimumStock={editMinimumStock}
              setEditMinimumStock={setEditMinimumStock}
              categories={categories}
              handleEdit={handleEdit}
            />

            {editError && <Alert type="error" message={editError} />}

            {editSuccess && <Alert type="success" message={editSuccess} />}
          </>
        )}
      </div>

      {addStock && (
        <EditStockCard
          error={stockError}
          handleAccept={handleAccept}
          purchasePrice={purchasePrice}
          setAddStock={setAddStock}
          setError={setStockError}
          setPurchasePrice={setPurchasePrice}
          setStockQuantity={setStockQuantity}
          stockQuantity={stockQuantity}
        />
      )}
    </div>
  );
};
