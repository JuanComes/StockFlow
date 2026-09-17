import { createBrowserRouter } from "react-router-dom";
import { ProductDetail } from "./pages/ProductDetail";
import ProductsPage from "./pages/ProductsPage";

export const router = createBrowserRouter([
  {
    path: "/products",
    element: <ProductsPage />,
  },
  {
    path: "/products/:id",
    element: <ProductDetail />,
  },
]);
