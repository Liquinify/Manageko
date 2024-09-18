import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  boardType: "Kanban",
  search: "",
};

const controlsSlice = createSlice({
  name: "controls",
  initialState: initialState,
  reducers: {
    setBoardType: (state, action) => {
      state.boardType = action.payload;
    },
    setSearchTask: (state, action) => {
      state.search = action.payload;
    },
  },
});

export default controlsSlice;
