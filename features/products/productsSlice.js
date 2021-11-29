import {createSlice} from '@reduxjs/toolkit';

import PRODUCTS from '../../dummy-data';

const initialState = {
  availableProducts: PRODUCTS,
  userProducts: PRODUCTS.filter(product => product.ownerId === 'u1'),
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
});

export const selectAllProducts = ({products}) => products.availableProducts;
export const selectProduct = id => console.log(id);

export default productsSlice.reducer;
