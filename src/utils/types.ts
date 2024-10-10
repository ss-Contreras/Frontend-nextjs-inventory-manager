// types.ts

export interface Producto {
    productoID?: number;
    nombre: string;
    categoriaID: number;
    proveedorID: number;
    precioCompra: number;
    precioVenta: number;
    stock: number;
    stockMinimo: number;
    fechaIngreso?: string;
    rutaIMagen?: string;
    imagen?: File;
  }
  