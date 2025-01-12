import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cart: [],
  cartOpen: false
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      state.cartOpen = true;
      state.cart.push(action.payload);
    },
    addMultipleToCart: (state, action) => {
      state.cart = [...state.cart, ...action.payload];
    },
    removeFromCart: (state, action) => {
      const newCart = state.cart.filter(product => product._id !== action.payload);
      state.cartOpen = newCart.length > 0;
      state.cart = newCart;
    },
    updateCartQuantity: (state, action) => {
      state.cartOpen = true;
      state.cart = state.cart.map(product => {
        if (action.payload._id === product._id) {
          product.purchaseQuantity = action.payload.purchaseQuantity;
        }
        return product;
      });
    },
    clearCart: (state) => {
      state.cart = [];
      state.cartOpen = false;
    },
    toggleCart: (state) => {
      state.cartOpen = !state.cartOpen;
    }
  }
});

export const {
  addToCart,
  addMultipleToCart,
  removeFromCart,
  updateCartQuantity,
  clearCart,
  toggleCart
} = cartSlice.actions;

export default cartSlice.reducer;