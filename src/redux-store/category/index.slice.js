import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getCategoriesList } from "api/requests";

const initialState = {
  list: [],
  isLoading: false,
};

export const getCategories = createAsyncThunk(
  "category/getCategories",
  getCategoriesList
);

export const categoryReducer = createSlice({
  name: "category/categoriesAction",
  initialState,
  extraReducers: {
    [getCategories.pending]: (state) => {
      state.isLoading = true;
    },
    [getCategories.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.list = payload?.categories;
    },
    [getCategories.rejected]: (state) => {
      state.isLoading = false;
    },
  },
});

export default categoryReducer.reducer;
