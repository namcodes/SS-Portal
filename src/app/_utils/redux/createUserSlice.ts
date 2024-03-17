import { createSlice } from "@reduxjs/toolkit";

interface DataType {
  user: any;
  isModalOpen: boolean;
  isBulkModalOpen: boolean;
  isUserSubmitted: boolean;
  pdfUrl: string;
  activeKey: string;
  singleUser: any;
  isUserCreated: boolean;
}
const createUserSlice = createSlice({
  name: "createUser",
  initialState: {
    singleUser: {},
    user: {},
    isModalOpen: false,
    isBulkModalOpen: false,
    isUserSubmitted: false,
    isUserCreated: false,
    pdfUrl: "",
    activeKey: "1",
  } as DataType,
  reducers: {
    setActiveKey: (state, action) => {
      state.activeKey = action.payload;
    },
    setIsUserSubmitted: (state, action) => {
      state.isUserSubmitted = action.payload;
    },
    setIsUserCreated: (state, action) => {
      state.isUserCreated = action.payload;
    },
    setPdfUrl: (state, action) => {
      state.pdfUrl = action.payload;
    },
    openBulkModal: (state, action) => {
      state.isBulkModalOpen = action.payload;
    },
    openCreateModal: (state, action) => {
      state.isModalOpen = action.payload;
    },
    setSingleUser: (state, action) => {
      state.singleUser = action.payload;
    },
    submitCreate: (state, action) => {
      state.user = JSON.parse(action.payload);
    },
  },
});

export default createUserSlice;
