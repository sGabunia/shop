import {createSlice, nanoid} from '@reduxjs/toolkit';

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
    addProduct: {
      reducer: (state, action) => {
        state.availableProducts.unshift(action.payload);
        state.userProducts.unshift(action.payload);
      },
      prepare: (title, imageUrl, productPrice, description) => {
        const id = nanoid();
        const ownerId = 'u1';
        const price = Number(productPrice);
        return {
          payload: {
            id,
            title,
            ownerId,
            imageUrl,
            price,
            description,
          },
        };
      },
    },
    updateProduct: (state, action) => {
      const id = action.payload.id;
      const title = action.payload.title;
      const imageUrl = action.payload.imageUrl;
      const price = Number(action.payload.price);
      const description = action.payload.description;

      const oldProduct = state.availableProducts.find(
        product => product.id === id,
      );
      const newProduct = {
        id,
        title,
        imageUrl,
        price,
        description,
        ownerId: oldProduct.ownerId,
      };

      state.availableProducts = state.availableProducts.map(product =>
        product.id !== id ? product : newProduct,
      );
      state.userProducts = state.userProducts.map(product =>
        product.id !== id ? product : newProduct,
      );
    },
  },
});

export const selectAllProducts = ({products}) => products.availableProducts;
export const selectUserProducts = ({products}) => products.userProducts;
export const selectProduct = id => console.log(id);

export const {deleteProduct, addProduct, updateProduct} = productsSlice.actions;

export default productsSlice.reducer;
