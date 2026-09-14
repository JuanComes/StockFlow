import { ArrowLeft, MenuIcon, Search } from "lucide-react";
import { useState } from "react";
import { MobileMenu } from "./MobileMenu";

type ProductsNavProps = {
  search: string;
  setSearch: (value: string) => void;
};

export const ProductsNav = ({ search, setSearch }: ProductsNavProps) => {
  const [hamburgerMenu, setHamburgerMenu] = useState(false);

  const handleHamburgerMenu = () => {
    console.log("click in hamburgerMenu");
    setHamburgerMenu(!hamburgerMenu);
  };

  return (
    <nav className="bg-white border-b border-gray-300 h-28">
      <div className="flex items-center gap-12 lg:gap-16 px-6 py-2 justify-between md:justify-normal">
        <button onClick={() => window.history.back()}>
          <ArrowLeft className="h-7 w-7" />
        </button>
        <div className="flex items-center gap-6 lg:gap-12">
          <h1 className="text-3xl font-bold text-center">Products</h1>

          <div className="hidden md:flex gap-6">
            <a href="#">Products</a>
            <a href="#">Movements</a>
            <a href="#">Categories</a>
          </div>
        </div>

        <MenuIcon
          className="md:hidden h-6 w-6 text-gray-700"
          onClick={() => {
            handleHamburgerMenu();
          }}
        />
      </div>
      <div className="w-full h-12 flex justify-between px-6 py-2 items-center">
        <button
          className="bg-[#1b1372] text-white px-4 py-1.5 rounded-md"
          onClick={() => {
            console.log("click in NewProduct");
          }}
        >
          New
        </button>
        <div className="flex h-10 md:w-80 w-50 items-center rounded-md border border-gray-400 bg-white px-3">
          <Search className="mr-2 h-5 w-5 text-gray-500" />

          <input
            className="w-full bg-transparent outline-none"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="bg-red-400">INDEX</div>
      </div>

      {hamburgerMenu && (
        <MobileMenu handleHamburgerMenu={handleHamburgerMenu} />
      )}
    </nav>
  );
};
