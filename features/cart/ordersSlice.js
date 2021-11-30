import {createSlice, nanoid} from '@reduxjs/toolkit';

const initialState = {
  orders: [],
};

const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    addOrder: {
      reducer: (state, action) => {
        state.orders.push(action.payload);
      },
      prepare: (items, total) => ({
        payload: {
          id: nanoid(),
          items,
          total,
          date: new Date().toLocaleDateString('en-EN', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          }),
        },
      }),
    },
  },
});

export const {addOrder} = orderSlice.actions;

export const selectOrders = ({orders}) => orders.orders;

export default orderSlice.reducer;
