// components/Navbar.tsx
import { Button } from "@/components/ui/button";
import { BellIcon, UserCircleIcon } from "@heroicons/react/24/outline";

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md px-6 py-4">
      <div className="flex justify-between items-center">
        <div className="text-xl font-semibold text-indigo-800">Panel de Control</div>
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon">
            <BellIcon className="h-6 w-6 text-indigo-600" />
          </Button>
          <Button variant="ghost" size="icon">
            <UserCircleIcon className="h-6 w-6 text-indigo-600" />
          </Button>
          <Button variant="outline">
            Nuevo Producto
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
