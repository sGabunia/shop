import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';

import PRODUCTS from '../../dummy-data';

const initialState = {
  availableProducts: [],
  userProducts: [],
  status: 'idle',
  error: null,
};

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    const response = await fetch(
      'https://shop-f673f-default-rtdb.firebaseio.com/products.json',
      {method: 'GET'},
    );
    const responseData = await response.json();
    return responseData;
  },
);

export const addNewProduct = createAsyncThunk(
  'products/addNewProduct',
  async ({title, imageUrl, price, description}) => {
    const response = await fetch(
      'https://shop-f673f-default-rtdb.firebaseio.com/products.json',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          ownerId: 'u1',
          price,
          imageUrl,
          description,
        }),
      },
    );
    const {name} = await response.json();
    return {
      id: name,
      ownerId: 'u1',
      title,
      price,
      imageUrl,
      description,
    };
  },
);

export const updateProduct = createAsyncThunk(
  'products/updateProduct',
  async ({id, title, imageUrl, price, description}) => {
    await fetch(
      `https://shop-f673f-default-rtdb.firebaseio.com/products/${id}.json`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          price,
          imageUrl,
          description,
        }),
      },
    );

    return {
      id,
      title,
      imageUrl,
      price,
      description,
    };
  },
);

export const deleteProduct = createAsyncThunk(
  'products/deteleProduct',
  async id => {
    await fetch(
      `https://shop-f673f-default-rtdb.firebaseio.com/products/${id}.json`,
      {
        method: 'DELETE',
      },
    );
    return id;
  },
);

const productsSlice = createSlice({
  name: 'products',
  initialState,
  extraReducers: builder => {
    builder
      .addCase(addNewProduct.fulfilled, (state, action) => {
        state.availableProducts.unshift(action.payload);
        state.userProducts.unshift(action.payload);
      })
      .addCase(fetchProducts.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        const newArr = Object.entries(action.payload).map(([id, data]) => ({
          id,
          ...data,
        }));
        state.status = 'succeeded';
        state.availableProducts = newArr;
        state.userProducts = newArr.filter(product => product.ownerId === 'u1');
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        const {id, title, imageUrl, price, description} = action.payload;

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
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        const id = action.payload;
        const newProducts = state.availableProducts.filter(
          product => product.id !== id,
        );
        const newUserProducts = state.userProducts.filter(
          product => product.id !== id,
        );
        state.availableProducts = newProducts;
        state.userProducts = newUserProducts;
      });
  },
});

export const selectAllProducts = ({products}) => products.availableProducts;
export const selectUserProducts = ({products}) => products.userProducts;
export const selectProduct = id => console.log(id);
export const selectProductsStatus = ({products}) => products.status;
export const selectProductsError = ({products}) => products.error;

export default productsSlice.reducer;
