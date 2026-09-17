import { useNavigate, useParams } from "react-router-dom";
import type { Product } from "../interfaces/Product";
import { useEffect, useState } from "react";
import { getProductById } from "../services/product";
import { NavBar } from "../components/NavBar";
import { Button } from "../components/ui/Button";
import { PageToolbar } from "../components/ui/PageToolBar";
import { ProductTopCard } from "../components/ProductTopCard";
import {
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

export const ProductDetail = () => {
  const { id } = useParams();

  const products = useProductStore((state) => state.products);
  const getProducts = useProductStore((state) => state.getProducts);

  const [product, setProduct] = useState<Product>();
  const [inStockMovements, setInStockMovements] = useState<StockMovement[]>([]);
  const [outStockMovements, setOutStockMovements] = useState<StockMovement[]>(
    [],
  );

  useEffect(() => {
    const loadProduct = async () => {
      if (products.length === 0) {
        await getProducts();
      }

      const productId = Number(id);

      const [productData, productInMovements, productOutMovements] =
        await Promise.all([
          getProductById(productId),
          getInStockMovementsOfAProduct(productId),
          getOutStockMovementsOfAProduct(productId),
        ]);

      setProduct(productData);
      setInStockMovements(productInMovements);
      setOutStockMovements(productOutMovements);
    };

    loadProduct();
  }, [id]);

  const currentIndex = products.findIndex(
    (product) => product.id === Number(id),
  );

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

  return (
    <div className="min-h-screen w-full bg-[#f8f6f0] text-gray-700 flex flex-col">
      <div className="bg-white h-32">
        <NavBar title="Products" />

        <PageToolbar>
          <div className="flex gap-2 items-center">
            <Button label="New" />
            <Save className="text-red-800 w-6 h-6" />
          </div>
          <div className="flex bg-white items-center gap-12">
            <div className="hidden min-[615px]:flex">
              <ProductTopCard
                onHand={product?.stock}
                totalIn={inUnitsMovement}
                totalOut={outUnitsMovement}
              />
            </div>

            <Button label="Add Stock" width="96px" textSize="14px" />
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
        <ProductHeader productName={product?.name} productSku={product?.sku} />

        <ProductSummary
          productCategoryId={product?.category_id}
          productMinimumStock={product?.minimum_stock}
          productSalePrice={product?.sale_price}
          productStock={product?.stock}
        />
      </div>
    </div>
  );
};
