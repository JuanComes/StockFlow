import { useNavigate, useParams } from "react-router-dom";
import type { Product } from "../interfaces/Product";
import { useEffect, useState } from "react";
import {
  getCategories,
  getProductById,
  updateProduct,
} from "../services/product";
import { NavBar } from "../components/NavBar";
import { Button } from "../components/ui/Button";
import { PageToolbar } from "../components/ui/PageToolBar";
import { ProductTopCard } from "../components/ProductTopCard";
import {
  createStockMovement,
  getInStockMovementsOfAProduct,
  getOutStockMovementsOfAProduct,
} from "../services/stock-movements";
import type { StockMovement } from "../interfaces/StockMovement";
import { calculateTotalUnits } from "../utils/calculateTotalUnits";
import { Pagination } from "../components/ui/Pagination";
import { useProductStore } from "../store/productStore";
import { ProductSummary } from "../components/ProductSummary";
import { Save } from "lucide-react";
import { ProductHeader } from "../components/ProductHeader";
import { EditStockCard } from "../components/EditStockCard";

export const ProductDetail = () => {
  const { id } = useParams();

  const products = useProductStore((state) => state.products);
  const getProducts = useProductStore((state) => state.getProducts);

  const [product, setProduct] = useState<Product>();
  const [inStockMovements, setInStockMovements] = useState<StockMovement[]>([]);
  const [outStockMovements, setOutStockMovements] = useState<StockMovement[]>(
    [],
  );
  const [stockQuantity, setStockQuantity] = useState("");
  const [addStock, setAddStock] = useState(false);
  const [purchasePrice, setPurchasePrice] = useState("");

  const [isEditing, setIsEditing] = useState(false);

  const [editName, setEditName] = useState("");
  const [editSalePrice, setEditSalePrice] = useState(0);
  const [editMinimumStock, setEditMinimumStock] = useState(0);
  const [categories, setCategories] = useState([]);

  const handleEdit = () => {
    if (!product) return;

    setEditName(product.name);
    setEditSalePrice(product.sale_price);
    setEditCategoryId(product.category_id);
    setEditMinimumStock(product.minimum_stock);

    setIsEditing(true);
  };
  const handleAddStock = () => {
    setAddStock(true);
  };
  const [error, setError] = useState("");

  const handleAccept = async (purchasePrice: number) => {
    const quantity = Number(stockQuantity);

    if (!product || !quantity) return;

    try {
      let type: "IN" | "OUT";
      let purchasePriceValue: number | undefined;

      if (quantity > 0) {
        type = "IN";

        if (purchasePrice) {
          purchasePriceValue = Number(purchasePrice);
        } else {
          purchasePriceValue = 0;
        }
      } else {
        type = "OUT";
        purchasePriceValue = undefined;
      }

      await createStockMovement(
        Number(id),
        type,
        Math.abs(quantity),
        purchasePriceValue,
      );

      await loadProduct();

      setAddStock(false);
      setStockQuantity("");
      setPurchasePrice("");
      setError("");
    } catch (error) {
      setError(error instanceof Error ? error.message : "Something went wrong");
    }
  };

  const loadProduct = async () => {
    const productId = Number(id);

    const [
      productData,
      productInMovements,
      productOutMovements,
      categoriesData,
    ] = await Promise.all([
      getProductById(productId),
      getInStockMovementsOfAProduct(productId),
      getOutStockMovementsOfAProduct(productId),
      getCategories(),
    ]);

    setProduct(productData);
    setInStockMovements(productInMovements);
    setOutStockMovements(productOutMovements);
    setCategories(categoriesData);

    getProducts();
  };

  useEffect(() => {
    loadProduct();
  }, [id]);
  const currentIndex = products.findIndex(
    (product) => product.id === Number(id),
  );

  const [editCategoryId, setEditCategoryId] = useState<number>();

  const inUnitsMovement = calculateTotalUnits(inStockMovements);
  const outUnitsMovement = calculateTotalUnits(outStockMovements);

  const previousProduct = products[currentIndex - 1];
  const nextProduct = products[currentIndex + 1];

  const navigate = useNavigate();

  const handlePreviousProduct = () => {
    if (previousProduct) {
      navigate(`/products/${previousProduct.id}`);
    }
  };

  const handleNextProduct = () => {
    if (nextProduct) {
      navigate(`/products/${nextProduct.id}`);
    }
  };

  const handleSave = async () => {
    if (!product) return;

    await updateProduct(product.id, {
      name: editName,
      description: product.description,
      sku: product.sku,
      sale_price: editSalePrice,
      stock: product.stock,
      minimum_stock: editMinimumStock,
      category_id: editCategoryId!,
    });

    setIsEditing(false);
    loadProduct();
  };

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
