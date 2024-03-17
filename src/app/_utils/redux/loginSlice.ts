import { createSlice } from "@reduxjs/toolkit";

const loginSlice = createSlice({
  name: "login",
  initialState: {
    user: {},
    isOpenOtp: false,
  },
  reducers: {
    login: (state, action) => {
      state.user = { ...action.payload };
    },
    openOTPModal: (state, action) => {
      state.isOpenOtp = action.payload;
    },
  },
});

export default loginSlice;
