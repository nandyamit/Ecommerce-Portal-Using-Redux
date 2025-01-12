import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  products: []
};

export const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    updateProducts: (state, action) => {
      state.products = action.payload;
    }
  }
});

export const { updateProducts } = productSlice.actions;
export default productSlice.reducer;