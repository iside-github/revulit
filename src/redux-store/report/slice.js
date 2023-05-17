import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllCompanyReports } from "api/requests";

const initialState = {
  list: [],
  isLoading: false,
};

export const getCompanyReports = createAsyncThunk(
  "get/allreports",
  getAllCompanyReports
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
  },
});

export default reportsReducer.reducer;
