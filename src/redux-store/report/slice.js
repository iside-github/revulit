import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getAllCompanyReports,
  getCategoryData,
  getRecentUploads,
} from "api/requests";

const initialState = {
  list: [],
  recentList: [],
  isRecentLoading: false,
  category: "",
  isLoading: false,
  isCategoryLoading: false,
};

export const getCompanyReports = createAsyncThunk(
  "get/allreports",
  getAllCompanyReports
);

export const getCategoryHTML = createAsyncThunk(
  "get/categoryHTML",
  getCategoryData
);

export const getRecentlyUploadedReports = createAsyncThunk(
  "get/recentReports",
  getRecentUploads
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
      state.isCategoryLoading = true;
    },
    [getCategoryHTML.fulfilled]: (state, { payload }) => {
      state.isCategoryLoading = false;
      state.category = payload;
    },
    [getCategoryHTML.rejected]: (state) => {
      state.isCategoryLoading = false;
    },
    //recently uploaded reports
    [getRecentlyUploadedReports.pending]: (state) => {
      state.isRecentLoading = true;
    },
    [getRecentlyUploadedReports.fulfilled]: (state, { payload }) => {
      state.isRecentLoading = false;
      state.recentList = payload?.last_uploads;
    },
    [getRecentlyUploadedReports.rejected]: (state) => {
      state.isRecentLoading = false;
    },
  },
});

export default reportsReducer.reducer;
