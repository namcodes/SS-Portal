import { createSlice } from "@reduxjs/toolkit";

const unlockSlice = createSlice({
  name: "unlockAccount",
  initialState: {
    isOpenOtp: false,
    activeKey: "1",
    verificationFailed: false,
  },

  reducers: {
    openOTPModal: (state, action) => {
      state.isOpenOtp = action.payload;
    },
    setVerificationFailed: (state, action) => {
      state.verificationFailed = action.payload;
    },
    setActiveKey: (state, action) => {
      state.activeKey = action.payload;
    },
  },
});

export default unlockSlice;
