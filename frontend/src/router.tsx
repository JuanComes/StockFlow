import { createBrowserRouter } from "react-router-dom";
import ProductsPage from "./pages/ProductsPage";
import { ProductDetail } from "./pages/ProductDetail";

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
