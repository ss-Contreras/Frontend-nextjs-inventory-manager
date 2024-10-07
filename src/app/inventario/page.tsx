// Inventario/page.tsx

import InventoryTable from './components/InventoryTable';
import CategoryFilter from './components/CategoryFilter';

const InventoryPage = () => {
  return (
    <main className="p-6 flex-1 overflow-auto">
      <h1 className="text-3xl font-bold mb-6 text-indigo-800">Gestor de Inventario</h1>
      <CategoryFilter />
      <InventoryTable />
    </main>
  );
};

export default InventoryPage;
