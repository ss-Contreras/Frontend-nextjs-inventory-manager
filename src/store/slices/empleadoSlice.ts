import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { getEmpleados, createEmpleado, updateEmpleado, deleteEmpleado } from '../../utils/api';

// Tipo de dato para el empleado
type Empleado = {
  empleadoID: number;
  nombre: string;
  telefono: string;
  email: string;
  direccion: string;
  cargo: string;
  fechaContratacion: string;
};

// Definir el estado inicial
interface EmpleadoState {
  empleados: Empleado[];
  loading: boolean;
  error: string | null;
}

const initialState: EmpleadoState = {
  empleados: [],
  loading: false,
  error: null,
};

// Operaciones asincrónicas con `createAsyncThunk`
export const fetchEmpleados = createAsyncThunk('empleado/fetchEmpleados', async (_, { rejectWithValue }) => {
  try {
    const response = await getEmpleados();
    return response;
  } catch (error) {
    return rejectWithValue('Error al cargar empleados');
  }
});

export const addEmpleado = createAsyncThunk('empleado/addEmpleado', async (empleado: Omit<Empleado, 'empleadoID'>, { rejectWithValue }) => {
  try {
    const response = await createEmpleado(empleado);
    return response;
  } catch (error) {
    return rejectWithValue('Error al agregar el empleado');
  }
});

export const editEmpleado = createAsyncThunk('empleado/editEmpleado', async ({ id, empleado }: { id: number; empleado: Omit<Empleado, 'empleadoID'> }, { rejectWithValue }) => {
  try {
    const response = await updateEmpleado(id, empleado);
    return response;
  } catch (error) {
    return rejectWithValue('Error al editar el empleado');
  }
});

export const removeEmpleado = createAsyncThunk('empleado/removeEmpleado', async (id: number, { rejectWithValue }) => {
  try {
    await deleteEmpleado(id);
    return id;
  } catch (error) {
    return rejectWithValue('Error al eliminar el empleado');
  }
});

// Crear el slice de empleado
const empleadoSlice = createSlice({
  name: 'empleado',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmpleados.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchEmpleados.fulfilled, (state, action: PayloadAction<Empleado[]>) => {
        state.loading = false;
        state.empleados = action.payload;
      })
      .addCase(fetchEmpleados.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(addEmpleado.fulfilled, (state, action: PayloadAction<Empleado>) => {
        state.empleados.push(action.payload);
      })
      .addCase(editEmpleado.fulfilled, (state, action: PayloadAction<Empleado>) => {
        const index = state.empleados.findIndex((emp) => emp.empleadoID === action.payload.empleadoID);
        if (index !== -1) {
          state.empleados[index] = action.payload;
        }
      })
      .addCase(removeEmpleado.fulfilled, (state, action: PayloadAction<number>) => {
        state.empleados = state.empleados.filter((emp) => emp.empleadoID !== action.payload);
      });
  },
});

// Exportar el reducer con nombre
export const empleadoReducer = empleadoSlice.reducer;
