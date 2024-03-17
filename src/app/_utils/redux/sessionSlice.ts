import { createSlice } from "@reduxjs/toolkit";

const sessionSlice = createSlice({
  name: "session",
  initialState: {
    isLoggedIn: false,
  },
  reducers: {},
});

export default sessionSlice;
