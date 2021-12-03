import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';

const initialState = {
  orders: [],
  status: 'idle',
  error: null,
};

export const fetchOrders = createAsyncThunk('orders/fetchOrders', async () => {
  const response = await fetch(
    'https://shop-f673f-default-rtdb.firebaseio.com/orders.json',
    {
      method: 'GET',
    },
  );
  const responseData = await response.json();
  return responseData;
});

export const addOrder = createAsyncThunk(
  'orders/addOrder',
  async ({items, total}) => {
    const itemsList = items.map(([id, item]) => item);
    const response = await fetch(
      'https://shop-f673f-default-rtdb.firebaseio.com/orders.json',
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
