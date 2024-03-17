import { createSlice } from "@reduxjs/toolkit";

const sideNavSlice = createSlice({
  name: "sidenav",
  initialState: {
    collapsed: true,
  },
  reducers: {
    collapsable: (state, action) => {
      state.collapsed = action.payload;
    },
  },
});

export default sideNavSlice;
