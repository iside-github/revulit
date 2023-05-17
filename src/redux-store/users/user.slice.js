import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getUsersPfofiles } from "api/requests";

const initialState = {
  list: null,
  isLoading: false,
  isUpdateLoading: false,
};

export const getUsersList = createAsyncThunk(
  "user/getUserListAll",
  getUsersPfofiles
);

export const systemUsersReducer = createSlice({
  name: "user/getUsersList",
  initialState,
  extraReducers: {
    [getUsersList.pending]: (state) => {
      state.isLoading = true;
    },
    [getUsersList.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.list = payload;
    },
    [getUsersList.rejected]: (state) => {
      state.isLoading = false;
    },
  },
});

export default systemUsersReducer.reducer;
