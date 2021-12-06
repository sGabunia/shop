import {configureStore} from '@reduxjs/toolkit';
import productsSlice from '../features/products/productsSlice';
import cartSlice from '../features/cart/cartSlice';
import ordersSlice from '../features/cart/ordersSlice';
import authSlice from '../features/user/authSlice';

const store = configureStore({
  reducer: {
    products: productsSlice,
    cart: cartSlice,
    orders: ordersSlice,
    users: authSlice,
  },
});

export default store;
