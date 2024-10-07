// inventario/components/CategoryFilter.tsx
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

const CategoryFilter = () => {
  return (
    <div className="mb-6">
      <Select>
        <SelectTrigger className="w-full max-w-xs">
          <SelectValue placeholder="Selecciona una categoría" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="categoria-a">Categoría A</SelectItem>
          <SelectItem value="categoria-b">Categoría B</SelectItem>
          <SelectItem value="categoria-c">Categoría C</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default CategoryFilter;
