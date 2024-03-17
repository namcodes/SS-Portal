import { createSlice } from "@reduxjs/toolkit";

const incidentReportSlice = createSlice({
  name: "incidentReport",
  initialState: {
    report: {
      header: "Header",
      subheader: "Subheader",
      incidentTextColor: "ffffff",
    },
  },
  reducers: {
    incidentReport: (state, action) => {
      state.report = { ...state.report, ...action.payload };
    },
  },
});

export default incidentReportSlice;
