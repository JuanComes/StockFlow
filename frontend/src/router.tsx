import { createBrowserRouter } from "react-router-dom";
import { ProductDetail } from "./pages/ProductDetail";
import ProductsPage from "./pages/productsPage";
import { StockMovements } from "./pages/StockMovements";

export const router = createBrowserRouter([
  {
    path: "/products",
    element: <ProductsPage />,
  },
  {
    path: "/products/:id",
    element: <ProductDetail />,
  },
  {
    path: "/stock-movements",
    element: <StockMovements />,
  },
]);
