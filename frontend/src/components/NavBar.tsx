import { ArrowLeft, MenuIcon } from "lucide-react";
import { useState } from "react";
import { MobileMenu } from "./MobileMenu";
import { Title } from "./ui/Title";
import { NavLinks } from "./ui/NavLinks ";

type NavBarProps = {
  title: string;
};

export const NavBar = ({ title }: NavBarProps) => {
  const [hamburgerMenu, setHamburgerMenu] = useState(false);
  const handleHamburgerMenu = () => {
    setHamburgerMenu((prev) => !prev);
  };

  return (
    <nav className="h-16">
      <div className="h-full flex items-center gap-12 lg:gap-16 px-3 md:px-6 justify-between md:justify-normal">
        <button onClick={() => window.history.back()}>
          <ArrowLeft className="h-7 w-7" />
        </button>
        <div className="flex items-center gap-6 lg:gap-12">
          <Title label={title} />
          <NavLinks />
        </div>

        <MenuIcon
          className="md:hidden h-6 w-6 text-gray-700"
          onClick={() => {
            handleHamburgerMenu();
          }}
        />
      </div>

      {hamburgerMenu && (
        <MobileMenu handleHamburgerMenu={handleHamburgerMenu} />
      )}
    </nav>
  );
};
