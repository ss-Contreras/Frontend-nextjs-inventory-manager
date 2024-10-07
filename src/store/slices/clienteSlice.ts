import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { getClientes, createCliente, updateCliente, deleteCliente } from '../../utils/api';

// Tipado del cliente
interface Cliente {
  clienteID: number;
  nombre: string;
  direccion: string;
  telefono: string;
}

// Estado inicial
interface ClienteState {
  clientes: Cliente[];
  loading: boolean;
  error: string | null;
}

const initialState: ClienteState = {
  clientes: [],
  loading: false,
  error: null,
};

// Asynchronous Thunks
export const fetchClientes = createAsyncThunk(
  'cliente/fetchClientes',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getClientes();
      return response;
    } catch (error) {
      return rejectWithValue('Error al cargar los clientes');
    }
  }
);

export const addCliente = createAsyncThunk(
  'cliente/addCliente',
  async (cliente: Cliente, { rejectWithValue }) => {
    try {
      const response = await createCliente(cliente);
      return response;
    } catch (error) {
      return rejectWithValue('Error al agregar el cliente');
    }
  }
);

export const editCliente = createAsyncThunk(
  'cliente/editCliente',
  async ({ id, cliente }: { id: number; cliente: Cliente }, { rejectWithValue }) => {
    try {
      const response = await updateCliente(id, cliente);
      return response;
    } catch (error) {
      return rejectWithValue('Error al editar el cliente');
    }
  }
);

export const removeCliente = createAsyncThunk(
  'cliente/removeCliente',
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await deleteCliente(id);
      return response;
    } catch (error) {
      return rejectWithValue('Error al eliminar el cliente');
    }
  }
);

// Slice de cliente
const clienteSlice = createSlice({
  name: 'cliente',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchClientes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchClientes.fulfilled, (state, action: PayloadAction<Cliente[]>) => {
        state.loading = false;
        state.clientes = action.payload;
      })
      .addCase(fetchClientes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(addCliente.fulfilled, (state, action: PayloadAction<Cliente>) => {
        state.clientes.push(action.payload);
      })
      .addCase(editCliente.fulfilled, (state, action: PayloadAction<Cliente>) => {
        const index = state.clientes.findIndex(cliente => cliente.clienteID === action.payload.clienteID);
        if (index !== -1) {
          state.clientes[index] = action.payload;
        }
      })
      .addCase(removeCliente.fulfilled, (state, action: PayloadAction<number>) => {
        state.clientes = state.clientes.filter(cliente => cliente.clienteID !== action.payload);
      });
  },
});

export const clienteReducer = clienteSlice.reducer;
export default clienteReducer;
