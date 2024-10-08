import { configureStore } from '@reduxjs/toolkit';
import clienteReducer from './slices/clienteSlice';
import categoriaReducer from './slices/categoriaSlice';
import { empleadoReducer } from './slices/empleadoSlice'; // Cambiar a importación con nombre

const store = configureStore({
  reducer: {
    cliente: clienteReducer,
    categoria: categoriaReducer,
    empleado: empleadoReducer, // Asegúrate de importar correctamente
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
