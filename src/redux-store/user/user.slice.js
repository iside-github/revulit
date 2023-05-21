import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  editUserProfile,
  getUserProfile,
  updateUserOldPassword,
} from "api/requests";

const initialState = {
  data: null,
  isLoading: false,
  isUpdateLoading: false,
  isPasswordLoading: false,
};

export const getUser = createAsyncThunk(
  "user/getUserDataAsync",
  getUserProfile
);

export const editUser = createAsyncThunk(
  "user/editUserDataAsync",
  editUserProfile
);

export const updatePassword = createAsyncThunk(
  "user/updatePassword",
  updateUserOldPassword
);

export const userProfileReducer = createSlice({
  name: "user/getUserData",
  initialState,
  extraReducers: {
    [getUser.pending]: (state) => {
      state.isLoading = true;
    },
    [getUser.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.data = payload;
    },
    [getUser.rejected]: (state) => {
      state.isLoading = false;
    },
    [editUser.pending]: (state) => {
      state.isUpdateLoading = true;
    },
    [editUser.fulfilled]: (state, { payload }) => {
      state.isUpdateLoading = false;
    },
    [editUser.rejected]: (state, { payload }) => {
      state.isUpdateLoading = false;
    },
    // update user password
    [updatePassword.pending]: (state) => {
      state.isPasswordLoading = true;
    },
    [updatePassword.fulfilled]: (state, { payload }) => {
      state.isPasswordLoading = false;
    },
    [updatePassword.rejected]: (state, { payload }) => {
      state.isPasswordLoading = false;
    },
  },
});

export default userProfileReducer.reducer;
