import {createSlice} from '@reduxjs/toolkit';

import PRODUCTS from '../../dummy-data';

const initialState = {
  availableProducts: PRODUCTS,
  userProducts: PRODUCTS.filter(product => product.ownerId === 'u1'),
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    deleteProduct: (state, action) => {
      const id = action.payload;
      const newProducts = state.availableProducts.filter(
        product => product.id !== id,
      );
      const newUserProducts = state.userProducts.filter(
        product => product.id !== id,
      );
      state.availableProducts = newProducts;
      state.userProducts = newUserProducts;
    },
  },
});

export const selectAllProducts = ({products}) => products.availableProducts;
export const selectUserProducts = ({products}) => products.userProducts;
export const selectProduct = id => console.log(id);

export const {deleteProduct} = productsSlice.actions;

export default productsSlice.reducer;
