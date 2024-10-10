import axios from 'axios';
import { Producto } from '../utils/types';

// Configurar una instancia de Axios para categorías
const categoriaApi = axios.create({
  baseURL: 'https://localhost:7069/api/categorias', // Base de todos los endpoints de categorías
  headers: {
    'Content-Type': 'application/json',
  },
  httpsAgent: new (require('https').Agent)({
    rejectUnauthorized: false, // Dependiendo si estás usando certificados autofirmados
  }),
});

// Configurar una instancia de Axios para clientes
const clienteApi = axios.create({
  baseURL: 'https://localhost:7069/api/clientes', // Base de todos los endpoints de clientes (cambiado a minúsculas para consistencia)
  headers: {
    'Content-Type': 'application/json',
  },
  httpsAgent: new (require('https').Agent)({
    rejectUnauthorized: false, // Dependiendo si estás usando certificados autofirmados
  }),
});

// Configurar una instancia de Axios para empleados
const empleadoApi = axios.create({
  baseURL: 'https://localhost:7069/api/empleados', // Base de todos los endpoints de empleados
  headers: {
    'Content-Type': 'application/json',
  },
  httpsAgent: new (require('https').Agent)({
    rejectUnauthorized: false, // Dependiendo si estás usando certificados autofirmados
  }),
});

// Obtener categorías (GET)
export const getCategorias = async () => {
  try {
    const response = await categoriaApi.get('/');
    return response.data;
  } catch (error) {
    console.error('Error al obtener las categorías:', error);
    throw error;
  }
};

// Crear una nueva categoría (POST)
export const createCategoria = async (categoria: { nombre: string; descripcion: string }) => {
  try {
    const response = await categoriaApi.post('/', categoria);
    return response.data;
  } catch (error) {
    console.error('Error al crear la categoría:', error);
    throw error;
  }
};

// Editar una categoría (PATCH)
export const updateCategoria = async (id: number, categoria: { nombre: string; descripcion: string }) => {
  try {
    // El backend requiere el ID en el cuerpo de la solicitud.
    const categoriaConId = {
      categoriaID: id, // Incluyendo el ID en el cuerpo, tal como requiere el backend
      ...categoria,
    };
    const response = await categoriaApi.patch(`/${id}`, categoriaConId);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(`Error al editar la categoría con ID ${id}: ${error.response?.status} - ${error.response?.statusText}`);
      console.error('Detalles del error:', error.response?.data);
    } else {
      console.error('Error desconocido al editar la categoría:', error);
    }
    throw error;
  }
};

// Eliminar una categoría (DELETE)
export const deleteCategoria = async (id: number) => {
  try {
    const response = await categoriaApi.delete(`/${id}`);
    return response.data; // Aun si el backend devuelve un 204, manejar los datos de respuesta
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(`Error al eliminar la categoría con ID ${id}: ${error.response?.status} - ${error.response?.statusText}`);
      console.error('Detalles del error:', error.response?.data);
    } else {
      console.error('Error desconocido al eliminar la categoría:', error);
    }
    throw error;
  }
};

// Obtener clientes (GET)
export const getClientes = async () => {
  try {
    const response = await clienteApi.get('/');
    return response.data;
  } catch (error) {
    console.error('Error al obtener los clientes:', error);
    throw error;
  }
};

// Crear un nuevo cliente (POST)
export const createCliente = async (cliente: { nombre: string; direccion: string; telefono: string }) => {
  try {
    const response = await clienteApi.post('/', cliente);
    return response.data;
  } catch (error) {
    console.error('Error al crear el cliente:', error);
    throw error;
  }
};

// Editar un cliente (PUT)
export const updateCliente = async (id: number, cliente: { nombre: string; direccion: string; telefono: string }) => {
  try {
    const response = await clienteApi.put(`/${id}`, cliente);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(`Error al editar el cliente con ID ${id}: ${error.response?.status} - ${error.response?.statusText}`);
      console.error('Detalles del error:', error.response?.data);
    } else {
      console.error('Error desconocido al editar el cliente:', error);
    }
    throw error;
  }
};

// Eliminar un cliente (DELETE)
export const deleteCliente = async (id: number) => {
  try {
    const response = await clienteApi.delete(`/${id}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(`Error al eliminar el cliente con ID ${id}: ${error.response?.status} - ${error.response?.statusText}`);
      console.error('Detalles del error:', error.response?.data);
    } else {
      console.error('Error desconocido al eliminar el cliente:', error);
    }
    throw error;
  }
};

// Obtener empleados (GET)
export const getEmpleados = async () => {
  try {
    const response = await empleadoApi.get('/');
    return response.data;
  } catch (error) {
    console.error('Error al obtener los empleados:', error);
    throw error;
  }
};

// Crear un nuevo empleado (POST)
export const createEmpleado = async (empleado: {
  nombre: string;
  telefono: string;
  email: string;
  direccion: string;
  cargo: string;
  fechaContratacion: string;
}) => {
  try {
    const response = await empleadoApi.post('/', empleado);
    return response.data;
  } catch (error) {
    console.error('Error al crear el empleado:', error);
    throw error;
  }
};

// Editar un empleado (PUT)
export const updateEmpleado = async (
  id: number,
  empleado: {
    nombre: string;
    telefono: string;
    email: string;
    direccion: string;
    cargo: string;
    fechaContratacion: string;
  }
) => {
  try {
    const response = await empleadoApi.put(`/${id}`, empleado);
    return response.data;
  } catch (error) {
    console.error('Error al editar el empleado:', error);
    throw error;
  }
};

// Eliminar un empleado (DELETE)
export const deleteEmpleado = async (id: number) => {
  try {
    const response = await empleadoApi.delete(`/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error al eliminar el empleado:', error);
    throw error;
  }
};

const productoApi = axios.create({
  baseURL: 'https://localhost:7069/api/productos',
});

export const getProductos = async (): Promise<Producto[]> => {
  const response = await productoApi.get('/');
  return response.data;
};

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

  const response = await productoApi.post('/', formData);
  return response.data;
};

export const updateProducto = async (productoID: number, producto: Producto): Promise<Producto> => {
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

  const response = await productoApi.put(`/${productoID}`, formData);
  return response.data;
};

export const deleteProducto = async (productoID: number): Promise<void> => {
  await productoApi.delete(`/${productoID}`);
};

export const clienteApiActions = {
  getClientes,
  createCliente,
  updateCliente,
  deleteCliente,
};

export const categoriaApiActions = {
  getCategorias,
  createCategoria,
  updateCategoria,
  deleteCategoria,
};
