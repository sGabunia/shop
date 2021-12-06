import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';

const initialState = {
  token: null,
  userId: null,
  loadingStatus: false,
  error: null,
  isSignedIn: false,
};

export const signUp = createAsyncThunk(
  'user/signUp',
  async ({email, password}) => {
    const response = await fetch(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBI1H_Ja6t3ttL_bN_1FKDBecM4KKJU5hE',
      {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          email,
          password,
          returnSecureToken: true,
        }),
      },
    );
    const responseData = await response.json();
    return {
      token: responseData.idToken,
      userId: responseData.localId,
    };
  },
);

export const signIn = createAsyncThunk(
  'user/signIn',
  async ({email, password}) => {
    const response = await fetch(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBI1H_Ja6t3ttL_bN_1FKDBecM4KKJU5hE',
      {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          email,
          password,
          returnSecureToken: true,
        }),
      },
    );
    const responseData = await response.json();
    console.log(responseData);
    return {
      token: responseData.idToken,
      userId: responseData.localId,
      error: responseData.error,
    };
  },
);

const authSlice = createSlice({
  name: 'user',
  initialState,
  extraReducers: builder =>
    builder
      .addCase(signUp.fulfilled, (state, action) => {
        const {token, userId} = action.payload;
        state.token = token;
        state.userId = userId;
      })
      .addCase(signIn.fulfilled, (state, action) => {
        const {token, userId, error} = action.payload;
        console.log(action.payload);
        if (error) {
          state.error = action.payload.error.message;
          state.loadingStatus = false;

          return;
        }
        state.token = token;
        state.userId = userId;
        state.loadingStatus = false;
        state.isSignedIn = true;
      })
      .addCase(signIn.pending, state => {
        state.loadingStatus = true;
      })
      .addCase(signIn.rejected, (state, action) => {
        console.log('error');
      }),
});

export const selectLoadingStatus = ({users}) => users.loadingStatus;
export const selectErrorMessage = ({users}) => users.error;
export const selectIsSignedIn = ({users}) => users.isSignedIn;
export const selectUserId = ({users}) => users.userId;

export default authSlice.reducer;
