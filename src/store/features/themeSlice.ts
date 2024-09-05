import { createSlice } from "@reduxjs/toolkit";

const themeSlice = createSlice({
  name: "theme",
  initialState: "dark",
  reducers: {
    setTheme: (state) => {
      return state === "dark" ? "light" : "dark";
    },
  },
});

export default themeSlice;
