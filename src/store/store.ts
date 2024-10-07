import { configureStore } from '@reduxjs/toolkit';
import clienteReducer from './slices/clienteSlice';
import categoriaReducer from './slices/categoriaSlice';

const store = configureStore({
  reducer: {
    cliente: clienteReducer,
    categoria: categoriaReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
