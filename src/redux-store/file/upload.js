import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getUploadedFileResults } from "api/requests";

const initialState = {
  data: {},
  isLoading: false,
};

export const uploadFile = createAsyncThunk(
  "user/fileUploadHtml",
  getUploadedFileResults
);

export const fileUploadReducer = createSlice({
  name: "user/uploadFile",
  initialState,
  extraReducers: {
    [uploadFile.pending]: (state) => {
      state.isLoading = true;
    },
    [uploadFile.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.data = payload;
    },
    [uploadFile.rejected]: (state) => {
      state.isLoading = false;
    },
  },
});

export default fileUploadReducer.reducer;
