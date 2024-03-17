import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "./loginSlice";
import createUserSlice from "./createUserSlice";
import currentPathSlice from "./currentPathSlice";
import incidentReportSlice from "./incidentReportSlice";
import sideNavSlice from "./sideNavSlice";
import bulkSlice from "./userBulkSlice";
import unlockSlice from "./unlockAccountSlice";
import createPositionSlice from "./createPositionSlice";
const store = configureStore({
  reducer: {
    login: loginSlice.reducer,
    createUser: createUserSlice.reducer,
    reroute: currentPathSlice.reducer,
    incidentReport: incidentReportSlice.reducer,
    sidenav: sideNavSlice.reducer,
    bulkUser: bulkSlice.reducer,
    unlockUser: unlockSlice.reducer,
    createPosition: createPositionSlice.reducer,
  },
});

export default store;
