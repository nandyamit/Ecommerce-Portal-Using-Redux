import { configureStore } from '@reduxjs/toolkit';
import cartReducer, {
  addToCart,
  addMultipleToCart,
  removeFromCart,
  updateCartQuantity,
  clearCart,
  toggleCart
} from '../redux/features/cartSlice';
import categoryReducer, {
  updateCategories,
  updateCurrentCategory
} from '../redux/features/categorySlice';
import productReducer, {
  updateProducts
} from '../redux/features/productSlice';

describe('Cart Slice', () => {
  let store;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        cart: cartReducer
      }
    });
  });

  test('addToCart', () => {
    store.dispatch(addToCart({ _id: '1', name: 'Test Product', purchaseQuantity: 1 }));
    const state = store.getState().cart;
    expect(state.cart.length).toBe(1);
    expect(state.cartOpen).toBe(true);
  });

  test('addMultipleToCart', () => {
    store.dispatch(addMultipleToCart([
      { _id: '1', name: 'Product 1' },
      { _id: '2', name: 'Product 2' }
    ]));
    const state = store.getState().cart;
    expect(state.cart.length).toBe(2);
  });

  test('removeFromCart', () => {
    store.dispatch(addToCart({ _id: '1', name: 'Test Product' }));
    store.dispatch(removeFromCart('1'));
    const state = store.getState().cart;
    expect(state.cart.length).toBe(0);
    expect(state.cartOpen).toBe(false);
  });

  test('updateCartQuantity', () => {
    store.dispatch(addToCart({ _id: '1', name: 'Test Product', purchaseQuantity: 1 }));
    store.dispatch(updateCartQuantity({ _id: '1', purchaseQuantity: 3 }));
    const state = store.getState().cart;
    expect(state.cart[0].purchaseQuantity).toBe(3);
  });

  test('clearCart', () => {
    store.dispatch(addToCart({ _id: '1', name: 'Test Product' }));
    store.dispatch(clearCart());
    const state = store.getState().cart;
    expect(state.cart.length).toBe(0);
    expect(state.cartOpen).toBe(false);
  });

  test('toggleCart', () => {
    store.dispatch(toggleCart());
    let state = store.getState().cart;
    expect(state.cartOpen).toBe(true);

    store.dispatch(toggleCart());
    state = store.getState().cart;
    expect(state.cartOpen).toBe(false);
  });
});

describe('Category Slice', () => {
  let store;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        categories: categoryReducer
      }
    });
  });

  test('updateCategories', () => {
    store.dispatch(updateCategories([{ _id: '1', name: 'Category 1' }]));
    const state = store.getState().categories;
    expect(state.categories.length).toBe(1);
  });

  test('updateCurrentCategory', () => {
    store.dispatch(updateCurrentCategory('1'));
    const state = store.getState().categories;
    expect(state.currentCategory).toBe('1');
  });
});

describe('Product Slice', () => {
  let store;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        products: productReducer
      }
    });
  });

  test('updateProducts', () => {
    store.dispatch(updateProducts([
      { _id: '1', name: 'Product 1' },
      { _id: '2', name: 'Product 2' }
    ]));
    const state = store.getState().products;
    expect(state.products.length).toBe(2);
  });
});