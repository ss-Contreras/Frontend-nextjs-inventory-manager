// components/Sidebar.tsx
import {
  HomeIcon,
  UserIcon,
  ShoppingCartIcon,
  TagIcon,
  UsersIcon,
  ChartBarIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";

const Sidebar = () => {
  const menuItems = [
    { name: "Categorías", icon: TagIcon, link: "/inventario/pages/categorias" },
    { name: "Clientes", icon: UsersIcon, link: "/inventario/pages/clientes" },
    { name: "Empleados", icon: UserIcon, link: "/inventario/pages/empleados" },
    { name: "Productos", icon: ShoppingCartIcon, link: "/inventario/pages/productos" },
    { name: "Proveedores", icon: HomeIcon, link: "/inventario/pages/proveedores" },
    { name: "Ventas", icon: ChartBarIcon, link: "/inventario/pages/ventas" },
  ];

  return (
    <aside className="w-64 bg-gradient-to-b from-indigo-700 to-indigo-800 text-white h-full p-6">
      <Link href="/inventario">
        <div className="text-2xl font-bold mb-10">Mi Inventario</div>
      </Link>
      <ul>
        {menuItems.map((item, index) => (
          <li key={index} className="mb-4">
            <Link href={item.link} className="flex items-center py-2 px-4 rounded-md transition-colors duration-200 hover:bg-indigo-600 hover:shadow-lg">
              <item.icon className="h-6 w-6 mr-3" />
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
