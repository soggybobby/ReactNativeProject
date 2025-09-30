// store/themeSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type ThemeState = {
  mode: "light" | "dark";
  accent: string;
};

const initialState: ThemeState = {
  mode: "light",
  accent: "#1DB954", // Spotify green by default
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    setAccent: (state, action: PayloadAction<string>) => {
      state.accent = action.payload;
    },
  },
});

export const { toggleTheme, setAccent } = themeSlice.actions;
export default themeSlice.reducer;
