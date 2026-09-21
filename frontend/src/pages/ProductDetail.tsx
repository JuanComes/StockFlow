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
    error,
    setError,
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
  } = useProductEdit(product, loadProduct);

  return (
    <div className="min-h-screen w-full bg-[#f8f6f0] text-gray-700 flex flex-col">
      {addStock && (
        <EditStockCard
          error={error}
          handleAccept={handleAccept}
          purchasePrice={purchasePrice}
          setAddStock={setAddStock}
          setError={setError}
          setPurchasePrice={setPurchasePrice}
          setStockQuantity={setStockQuantity}
          stockQuantity={stockQuantity}
        />
      )}
      <div className="bg-white h-32">
        <NavBar title="Products" />

        <PageToolbar>
          <div className="flex gap-2 items-center">
            <Button label="New" />
            <button onClick={handleSave}>
              <Save className="text-red-800 w-6 h-6 cursor-pointer" />
            </button>
          </div>
          <div className="flex bg-white items-center gap-12">
            <div className="hidden min-[615px]:flex">
              <ProductTopCard
                onHand={product?.stock}
                totalIn={inUnitsMovement}
                totalOut={outUnitsMovement}
              />
            </div>

            <Button
              label="Add Stock"
              width="96px"
              textSize="14px"
              onClickFunction={handleAddStock}
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

      <div className="min-[615px]:hidden bg-white border-b border-gray-300  px-3 py-2 justify-center flex">
        <ProductTopCard
          onHand={product?.stock}
          totalIn={inUnitsMovement}
          totalOut={outUnitsMovement}
        />
      </div>

      <div className="flex flex-col w-full min-h-full px-3 md:px-6 py-4 bg-[#f8f6f0] lg:px-40">
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
      </div>
    </div>
  );
};
