// components/Sidebar.tsx
import {
  HomeIcon,
  UserIcon,
  ShoppingCartIcon,
  TagIcon,
  UsersIcon,
  ChartBarIcon,
  XMarkIcon
} from "@heroicons/react/24/outline";
import Link from "next/link";
import React from "react";

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  const menuItems = [
    { name: "Categorías", icon: TagIcon, link: "/inventario/pages/categorias" },
    { name: "Clientes", icon: UsersIcon, link: "/inventario/pages/clientes" },
    { name: "Empleados", icon: UserIcon, link: "/inventario/pages/empleados" },
    { name: "Productos", icon: ShoppingCartIcon, link: "/inventario/pages/productos" },
    { name: "Proveedores", icon: HomeIcon, link: "/inventario/pages/proveedores" },
    { name: "Ventas", icon: ChartBarIcon, link: "/inventario/pages/ventas" },
  ];

  return (
    <>
      {/* Overlay para pantallas pequeñas */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 sm:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
      <aside
        className={`fixed z-50 inset-y-0 left-0 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out sm:relative sm:translate-x-0 w-64 bg-gradient-to-b from-indigo-700 to-indigo-800 text-white h-full p-6`}
      >
        {/* Botón de cerrar en pantallas pequeñas */}
        <div className="flex justify-between items-center mb-6 sm:hidden">
          <Link href="/inventario">
            <div className="text-2xl font-bold">Mi Inventario</div>
          </Link>
          <button onClick={toggleSidebar}>
            <XMarkIcon className="h-6 w-6 text-white" />
          </button>
        </div>
        {/* Logo para pantallas medianas y grandes */}
        <div className="hidden sm:block mb-10">
          <Link href="/inventario">
            <div className="text-2xl font-bold">Mi Inventario</div>
          </Link>
        </div>
        <ul>
          {menuItems.map((item, index) => (
            <li key={index} className="mb-4">
              <Link href={item.link}>
                <div
                  onClick={toggleSidebar} // Cerrar el sidebar al hacer clic en un enlace
                  className="flex items-center py-2 px-4 rounded-md transition-colors duration-200 hover:bg-indigo-600 hover:shadow-lg cursor-pointer"
                >
                  <item.icon className="h-6 w-6 mr-3" />
                  {item.name}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </aside>
    </>
  );
};

export default Sidebar;
