import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getAllCompanyReports,
  getCategoryData,
  getRecentUploads,
  getTotalStats,
} from "api/requests";

const initialState = {
  list: [],
  recentList: [],
  statistics: [],
  isStatsLoading: false,
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

export const getTotalStatistics = createAsyncThunk(
  "get/totalStatistics",
  getTotalStats
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
    //total statistics
    [getTotalStatistics.pending]: (state) => {
      state.isStatsLoading = true;
    },
    [getTotalStatistics.fulfilled]: (state, { payload }) => {
      state.isStatsLoading = false;
      state.statistics = payload;
    },
    [getTotalStatistics.rejected]: (state) => {
      state.isStatsLoading = false;
    },
  },
});

export default reportsReducer.reducer;
