'use client'

import { buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card"
import { Table, TableHeader, TableBody, TableRow, TableCell, TableHead } from "@/components/ui/table"
import { useState } from "react";

const InventoryTable = () => {
  const [inventoryData] = useState([
    {
      producto: "Ejemplo Producto 1",
      categoria: "Categoría A",
      precio: "$100",
      stock: 20,
    },
    {
      producto: "Ejemplo Producto 2",
      categoria: "Categoría B",
      precio: "$150",
      stock: 15,
    },
    // Agrega más datos si es necesario
  ]);

  return (
    <Card className="mt-6">
      <Table>
        <TableHeader className="bg-indigo-600">
          <TableRow>
            <TableHead className="text-white text-center">Producto</TableHead>
            <TableHead className="text-white text-center">Categoría</TableHead>
            <TableHead className="text-white text-center">Precio</TableHead>
            <TableHead className="text-white text-center">Stock</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {inventoryData.map((item, index) => (
            <TableRow
              key={index}
              className={index % 2 === 0 ? "bg-white" : "bg-indigo-50"}
            >
              <TableCell className="text-center">{item.producto}</TableCell>
              <TableCell className="text-center">{item.categoria}</TableCell>
              <TableCell className="text-center">{item.precio}</TableCell>
              <TableCell className="text-center">{item.stock}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
};

export default InventoryTable;