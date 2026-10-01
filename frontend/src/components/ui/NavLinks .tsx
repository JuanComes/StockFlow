import { Link } from "react-router-dom";

export const NavLinks = () => {
  return (
    <div className="hidden md:flex gap-6">
      <Link to="/products">Products</Link>
      <Link to="/stock-movements">Movements</Link>
      <a href="#">Categories</a>
    </div>
  );
};
