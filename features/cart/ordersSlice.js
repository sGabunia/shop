import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';

const initialState = {
  orders: [],
  status: 'idle',
  error: null,
};

export const fetchOrders = createAsyncThunk(
  'orders/fetchOrders',
  async (a, {getState}) => {
    const {userId} = getState().users;
    console.log(userId);
    const response = await fetch(
      `https://shop-f673f-default-rtdb.firebaseio.com/orders/${userId}.json`,
      {
        method: 'GET',
      },
    );
    const responseData = await response.json();
    console.log(responseData);
    return responseData;
  },
);

export const addOrder = createAsyncThunk(
  'orders/addOrder',
  async ({items, total}, {getState}) => {
    const {userId, token} = getState().users;

    const itemsList = items.map(([id, item]) => item);
    const response = await fetch(
      `https://shop-f673f-default-rtdb.firebaseio.com/orders/${userId}.json?auth=${token}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: itemsList,
          total,
          date: new Date().toLocaleDateString('en-EN', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          }),
        }),
      },
    );

    const {name} = await response.json();
    console.log(name);

    return {
      id: name,
      items: itemsList,
      total,
      date: new Date().toLocaleDateString('en-EN', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
    };
  },
);

const orderSlice = createSlice({
  name: 'orders',
  initialState,
  extraReducers: builder => {
    builder
      .addCase(addOrder.fulfilled, (state, action) => {
        state.orders.push(action.payload);
      })
      .addCase(fetchOrders.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        if (action.payload === null) {
          state.orders = [];
          state.status = 'succeeded';
          return;
        }
        const newArr = Object.entries(action.payload).map(([id, order]) => ({
          id,
          ...order,
        }));

        state.orders = newArr || [];
        state.status = 'succeeded';
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const selectOrders = ({orders}) => orders.orders;
export const selectOrdersStatus = ({orders}) => orders.status;
export const selectOrdersError = ({orders}) => orders.error;

export default orderSlice.reducer;
