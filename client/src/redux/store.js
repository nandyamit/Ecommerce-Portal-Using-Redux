import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './features/cartSlice';
import categoryReducer from './features/categorySlice';
import productReducer from './features/productSlice';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    categories: categoryReducer,
    products: productReducer,
  },
  devTools: true // Enable Redux DevTools
});