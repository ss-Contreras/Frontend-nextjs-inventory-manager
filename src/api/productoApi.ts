// productoApi.ts

import axios from 'axios';
import { Producto } from '../utils/types';

const apiUrl = 'https://localhost:7069/api/productos';

// Obtener todos los productos
export const fetchProductos = async (): Promise<Producto[]> => {
  const response = await axios.get(apiUrl);
  return response.data;
};

// Crear un nuevo producto
export const createProducto = async (producto: Producto): Promise<Producto> => {
  const formData = new FormData();
  formData.append('nombre', producto.nombre);
  formData.append('categoriaID', producto.categoriaID.toString());
  formData.append('proveedorID', producto.proveedorID.toString());
  formData.append('precioCompra', producto.precioCompra.toString());
  formData.append('precioVenta', producto.precioVenta.toString());
  formData.append('stock', producto.stock.toString());
  formData.append('stockMinimo', producto.stockMinimo.toString());

  if (producto.imagen) {
    formData.append('imagen', producto.imagen);
  }

  const response = await axios.post(apiUrl, formData); // No establecemos headers
  return response.data;
};

// Actualizar un producto existente
export const updateProducto = async (productoID: number, producto: Producto): Promise<void> => {
  const formData = new FormData();
  formData.append('productoID', productoID.toString());
  formData.append('nombre', producto.nombre);
  formData.append('categoriaID', producto.categoriaID.toString());
  formData.append('proveedorID', producto.proveedorID.toString());
  formData.append('precioCompra', producto.precioCompra.toString());
  formData.append('precioVenta', producto.precioVenta.toString());
  formData.append('stock', producto.stock.toString());
  formData.append('stockMinimo', producto.stockMinimo.toString());

  if (producto.imagen) {
    formData.append('imagen', producto.imagen);
  }

  const response = await axios.put(`${apiUrl}/${productoID}`, formData); // No establecemos headers
};

// Eliminar un producto
export const deleteProducto = async (productoID: number): Promise<void> => {
  await axios.delete(`${apiUrl}/${productoID}`);
};
