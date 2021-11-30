import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  items: {},
  totalAmount: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload.title;
      const price = action.payload.price;
      const quantity = 1;

      if (state.items[action.payload.id]) {
        state.items = {
          ...state.items,
          [action.payload.id]: {
            ...state.items[action.payload.id],
            sum: (state.items[action.payload.id].sum += price),
            quantity: state.items[action.payload.id].quantity + 1,
          },
        };
        state.totalAmount += price;
        return;
      }
      state.items = {
        ...state.items,
        [action.payload.id]: {
          product,
          price,
          sum: price,
          quantity,
        },
      };
      state.totalAmount += price;
    },
    removeFromCart: (state, action) => {
      const quantity = state.items[action.payload].quantity;
      if (quantity > 1) {
        state.items[action.payload] = {
          ...state.items[action.payload],
          quantity: state.items[action.payload].quantity - 1,
          sum:
            state.items[action.payload].sum - state.items[action.payload].price,
        };
        state.totalAmount -= state.items[action.payload].price;
        return;
      }
      state.totalAmount -= state.items[action.payload].price;
      delete state.items[action.payload];
    },
    clearCart: state => {
      state.items = {};
      state.totalAmount = 0;
    },
    deleteProductInCart: (state, action) => {
      if (!state.items[action.payload]) {
        return;
      }
      state.totalAmount -= state.items[action.payload].sum;
      delete state.items[action.payload];
    },
  },
});

export const {addToCart, removeFromCart, clearCart, deleteProductInCart} =
  cartSlice.actions;

export const selectCart = ({cart}) => cart;

export default cartSlice.reducer;
