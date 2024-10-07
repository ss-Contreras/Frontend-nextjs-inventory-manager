// store/slices/categoriaSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getCategorias, createCategoria, updateCategoria, deleteCategoria } from '../../utils/api';

type Categoria = {
  id: number;
  nombre: string;
  descripcion: string;
};

interface CategoriaState {
  categorias: Categoria[];
  loading: boolean;
  error: string | null;
}

const initialState: CategoriaState = {
  categorias: [],
  loading: false,
  error: null,
};

// Thunks para operaciones asíncronas
export const fetchCategorias = createAsyncThunk('categoria/fetchCategorias', async () => {
  const response = await getCategorias();
  return response;
});

export const addCategoria = createAsyncThunk('categoria/addCategoria', async (newCategoria: { nombre: string; descripcion: string }) => {
  const response = await createCategoria(newCategoria);
  return response;
});

export const editCategoria = createAsyncThunk('categoria/editCategoria', async ({ id, categoria }: { id: number; categoria: { nombre: string; descripcion: string } }) => {
  const response = await updateCategoria(id, categoria);
  return response;
});

export const removeCategoria = createAsyncThunk('categoria/removeCategoria', async (id: number) => {
  await deleteCategoria(id);
  return id;
});

// Slice de categorías
const categoriaSlice = createSlice({
  name: 'categoria',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategorias.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCategorias.fulfilled, (state, action) => {
        state.loading = false;
        state.categorias = action.payload;
        state.error = null;
      })
      .addCase(fetchCategorias.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Error al cargar las categorías';
      })
      .addCase(addCategoria.pending, (state) => {
        state.loading = true;
      })
      .addCase(addCategoria.fulfilled, (state, action) => {
        state.loading = false;
        state.categorias.push(action.payload);
        state.error = null;
      })
      .addCase(addCategoria.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Error al agregar la categoría';
      })
      .addCase(editCategoria.pending, (state) => {
        state.loading = true;
      })
      .addCase(editCategoria.fulfilled, (state, action) => {
        state.loading = false;
        state.categorias = state.categorias.map((cat) =>
          cat.id === action.payload.id ? action.payload : cat
        );
        state.error = null;
      })
      .addCase(editCategoria.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Error al editar la categoría';
      })
      .addCase(removeCategoria.pending, (state) => {
        state.loading = true;
      })
      .addCase(removeCategoria.fulfilled, (state, action) => {
        state.loading = false;
        state.categorias = state.categorias.filter((cat) => cat.id !== action.payload);
        state.error = null;
      })
      .addCase(removeCategoria.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Error al eliminar la categoría';
      });
  },
});

export default categoriaSlice.reducer;
