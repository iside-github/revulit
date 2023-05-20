import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getCompaniesListAll, adminCreateCompany } from "api/requests";

const initialState = {
  list: [],
  isListLoading: false,
  isCreateLoading: false,
};

export const getCompaniesList = createAsyncThunk(
  "company/listCompanies",
  getCompaniesListAll
);

export const createCompany = createAsyncThunk(
  "company/createCompany",
  adminCreateCompany
);

export const companyReducer = createSlice({
  name: "company/companyActions",
  initialState,
  extraReducers: {
    [getCompaniesList.pending]: (state) => {
      state.isListLoading = true;
    },
    [getCompaniesList.fulfilled]: (state, { payload }) => {
      state.isListLoading = false;
      state.list = payload?.companies;
    },
    [getCompaniesList.rejected]: (state) => {
      state.isListLoading = false;
    },
    //create company
    [createCompany.pending]: (state) => {
      state.isCreateLoading = true;
    },
    [createCompany.fulfilled]: (state, { payload }) => {
      state.isCreateLoading = false;
    },
    [createCompany.rejected]: (state) => {
      state.isCreateLoading = false;
    },
  },
});

export default companyReducer.reducer;
