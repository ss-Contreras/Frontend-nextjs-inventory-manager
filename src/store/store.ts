import { configureStore } from '@reduxjs/toolkit';
import clienteReducer from './slices/clienteSlice';
import categoriaReducer from './slices/categoriaSlice';
import {empleadoReducer} from './slices/empleadoSlice';
import productoReducer from './slices/productosSlice';

const store = configureStore({
  reducer: {
    cliente: clienteReducer,
    categoria: categoriaReducer,
    empleado: empleadoReducer,
    producto: productoReducer, 
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
