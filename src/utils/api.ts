// utils/api.ts
import axios from 'axios';

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
