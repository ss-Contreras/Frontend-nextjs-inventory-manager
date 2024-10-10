// components/Navbar.tsx
import { Button } from "@/components/ui/button";
import { BellIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import { DropdownMenuIcon } from "@radix-ui/react-icons";
import React from "react";

interface NavbarProps {
  toggleSidebar: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ toggleSidebar }) => {
  return (
    <nav className="bg-white shadow-md px-4 sm:px-6 py-4">
      <div className="flex justify-between items-center">
        {/* Botón de menú en pantallas pequeñas */}
        <div className="flex items-center">
          <Button
            variant="ghost"
            size="icon"
            className="sm:hidden mr-2"
            onClick={toggleSidebar}
          >
            <DropdownMenuIcon className="h-6 w-6 text-indigo-600" />
          </Button>
          <div className="text-xl font-semibold text-indigo-800">
            Panel de Control
          </div>
        </div>
        <div className="flex items-center space-x-2 sm:space-x-4">
          <Button variant="ghost" size="icon">
            <BellIcon className="h-6 w-6 text-indigo-600" />
          </Button>
          <Button variant="ghost" size="icon">
            <UserCircleIcon className="h-6 w-6 text-indigo-600" />
          </Button>
          {/* Ocultar el botón en pantallas pequeñas */}
          <Button variant="outline" className="hidden sm:block">
            Nuevo Producto
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
