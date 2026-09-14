import {
  ArrowLeftRight,
  PackageSearch,
  TableOfContents,
  XIcon,
} from "lucide-react";
import { MobileMenuItem } from "./MobileMenuItem";

interface MobileMenuProps {
  handleHamburgerMenu: () => void;
}

export const MobileMenu = ({ handleHamburgerMenu }: MobileMenuProps) => {
  return (
    <div className="fixed inset-0 z-50 bg-[#f8f6f0] md:hidden">
      <div className="flex flex-col border-b border-gray-300 bg-white h-28">
        <div className="flex items-center justify-between px-6 py-2">
          <h2 className="text-3xl font-bold text-gray-800">Menu</h2>

          <button
            onClick={handleHamburgerMenu}
            className="flex h-6 w-6 items-center justify-center"
          >
            <XIcon />
          </button>
        </div>
        <div className="w-full h-12 flex justify-between px-6 py-2 items-center text-gray-600">
          StockFlow Inventory Managment
        </div>
      </div>

      <div className="flex flex-col px-6 py-6 gap-6">
        <MobileMenuItem label="Products" icon={PackageSearch} />
        <MobileMenuItem label="Movements" icon={ArrowLeftRight} />
        <MobileMenuItem label="Categories" icon={TableOfContents} />
      </div>
    </div>
  );
};
