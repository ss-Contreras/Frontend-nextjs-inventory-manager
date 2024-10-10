// productosSlice.ts

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getProductos, createProducto, updateProducto, deleteProducto } from '../../utils/api';
import { Producto } from '../../utils/types';

interface ProductoState {
  productos: Producto[];
  loading: boolean;
  error: string | null;
}

const initialState: ProductoState = {
  productos: [],
  loading: false,
  error: null,
};

export const fetchProductosAsync = createAsyncThunk('productos/fetchProductos', async () => {
  return await getProductos();
});

export const createProductoAsync = createAsyncThunk('productos/createProducto', async (producto: Producto) => {
  return await createProducto(producto);
});

export const updateProductoAsync = createAsyncThunk(
  'productos/updateProducto',
  async ({ id, producto }: { id: number; producto: Producto }) => {
    const updatedProducto = await updateProducto(id, producto);
    return updatedProducto;
  }
);

export const deleteProductoAsync = createAsyncThunk('productos/deleteProducto', async (productoID: number) => {
  await deleteProducto(productoID);
  return productoID;
});

const productosSlice = createSlice({
  name: 'productos',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductosAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProductosAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.productos = action.payload;
      })
      .addCase(fetchProductosAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Error al cargar productos';
      })
      .addCase(createProductoAsync.fulfilled, (state, action) => {
        state.productos.push(action.payload);
      })
      .addCase(updateProductoAsync.fulfilled, (state, action) => {
        const index = state.productos.findIndex((p: Producto) => p.productoID === action.payload.productoID);
        if (index !== -1) {
          state.productos[index] = action.payload;
        }
      })
      .addCase(deleteProductoAsync.fulfilled, (state, action) => {
        state.productos = state.productos.filter((p: Producto) => p.productoID !== action.payload);
      });
  },
});

export default productosSlice.reducer;
