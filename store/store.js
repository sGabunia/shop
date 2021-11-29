import {configureStore} from '@reduxjs/toolkit';
import productsSlice from '../features/products/productsSlice';
import cartSlice from '../features/cart/cartSlice';
import ordersSlice from '../features/cart/ordersSlice';

const store = configureStore({
  reducer: {
    products: productsSlice,
    cart: cartSlice,
    orders: ordersSlice,
  },
});

export default store;
