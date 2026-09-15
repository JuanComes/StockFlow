import { createBrowserRouter } from "react-router-dom";
import ProductsPage from "./pages/ProductsPage";

export const router = createBrowserRouter([
  {
    path: "/products",
    element: <ProductsPage />,
  },
]);
