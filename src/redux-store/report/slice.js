import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllCompanyReports, getCategoryData } from "api/requests";

const initialState = {
  list: [],
  category: "",
  isLoading: false,
};

export const getCompanyReports = createAsyncThunk(
  "get/allreports",
  getAllCompanyReports
);

export const getCategoryHTML = createAsyncThunk(
  "get/categoryHTML",
  getCategoryData
);

export const reportsReducer = createSlice({
  name: "report/reportsActions",
  initialState,
  extraReducers: {
    [getCompanyReports.pending]: (state) => {
      state.isLoading = true;
    },
    [getCompanyReports.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.list = payload?.reports;
    },
    [getCompanyReports.rejected]: (state) => {
      state.isLoading = false;
    },
    //category
    [getCategoryHTML.pending]: (state) => {
      state.isLoading = true;
    },
    [getCategoryHTML.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.category = payload;
    },
    [getCategoryHTML.rejected]: (state) => {
      state.isLoading = false;
    },
  },
});

export default reportsReducer.reducer;
