// components/Sidebar.tsx
import {
  HomeIcon,
  UserIcon,
  ShoppingCartIcon,
  TagIcon,
  UsersIcon,
  ChartBarIcon,
} from "@heroicons/react/24/outline";
import { cn } from "@/lib/utils"
import Link from "next/link";
import { buttonVariants } from './ui/button'

const Sidebar = () => {
  const menuItems = [
    { name: "Categorías", icon: TagIcon, link: "./inventario/pages/categorias" },
    { name: "Clientes", icon: UsersIcon, link: "./inventario/pages/clientes"},
    { name: "Empleados", icon: UserIcon },
    { name: "Productos", icon: ShoppingCartIcon },
    { name: "Proveedores", icon: HomeIcon },
    { name: "Ventas", icon: ChartBarIcon },
  ];

  return (
    <aside className="w-64 bg-gradient-to-b from-indigo-700 to-indigo-800 text-white h-full p-6">
      <a href="/inventario">
        <div className="text-2xl font-bold mb-10">Mi Inventario</div>
      </a>
      <ul>
        {menuItems.map((item, index) => (
          <li key={index} className="mb-4">
            <a
              href={item.link}
              className={cn(
                "flex items-center py-2 px-4 rounded-md transition-colors duration-200",
                "hover:bg-indigo-600 hover:shadow-lg"
              )}
            >
              <item.icon className="h-6 w-6 mr-3" />
              {item.name}
            </a>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
