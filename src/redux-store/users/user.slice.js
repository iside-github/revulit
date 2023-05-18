import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getUsersPfofiles,
  inviteCompanyUser,
  confirmAccount,
} from "api/requests";

const initialState = {
  list: [],
  isLoading: false,
  isUpdateLoading: false,
  isInviteLoading: false,
  isConfirmLoading: false,
};

export const getUsersList = createAsyncThunk(
  "user/getUserListAll",
  getUsersPfofiles
);

export const confirmEmailAddress = createAsyncThunk(
  "user/confirmEmail",
  confirmAccount
);

export const inviteUser = createAsyncThunk(
  "user/inviteUser",
  inviteCompanyUser
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
      state.list = payload?.users;
    },
    [getUsersList.rejected]: (state) => {
      state.isLoading = false;
    },
    //invite user
    [inviteUser.pending]: (state) => {
      state.isInviteLoading = true;
    },
    [inviteUser.fulfilled]: (state, { payload }) => {
      state.isInviteLoading = false;
    },
    [inviteUser.rejected]: (state) => {
      state.isInviteLoading = false;
    },
    //confirm user
    [confirmEmailAddress.pending]: (state) => {
      state.isConfirmLoading = true;
    },
    [confirmEmailAddress.fulfilled]: (state, { payload }) => {
      state.isConfirmLoading = false;
    },
    [confirmEmailAddress.rejected]: (state) => {
      state.isConfirmLoading = false;
    },
  },
});

export default systemUsersReducer.reducer;
