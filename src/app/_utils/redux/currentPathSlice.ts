import { createSlice } from "@reduxjs/toolkit";

const currentPathSlice = createSlice({
  name: "currentPath",
  initialState: {
    key: "",
  },
  reducers: {
    reroute: (state, action) => {
      state.key = action.payload;
    },
  },
});

export default currentPathSlice;
