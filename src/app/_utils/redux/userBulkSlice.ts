import { createSlice } from "@reduxjs/toolkit";

const userBulkSlice = createSlice({
  name: "userBulk",
  initialState: {
    usersBulk: [],
    isUploaded: false,
    csvUrl: null,
    noOfTrainees: 0,
  },
  reducers: {
    setCsvUrl: (state, action) => {
      state.csvUrl = action.payload;
    },
    setNumberOfTrainees: (state, action) => {
      state.noOfTrainees = action.payload;
    },
    setIsUploaded: (state, action) => {
      state.isUploaded = action.payload;
    },
    submitCreate: (state, action) => {
      state.usersBulk = action.payload;
    },
  },
});

export default userBulkSlice;
