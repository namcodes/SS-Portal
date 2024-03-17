import { createSlice } from "@reduxjs/toolkit";

const createPositionSlice = createSlice({
  name: "createPosition",
  initialState: {
    isOpenCreate: false,
  },

  reducers: {
    openCreate: (state, action) => {
      state.isOpenCreate = action.payload;
    },
  },
});

export default createPositionSlice;
