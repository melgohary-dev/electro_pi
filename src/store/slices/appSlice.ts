import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Locale, Theme } from "@/config/constants";

interface AppState {
  locale: Locale;
  theme: Theme;
}

const initialState: AppState = {
  locale: "en",
  theme: "light",
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setLocale(state, action: PayloadAction<Locale>) {
      state.locale = action.payload;
    },
    setTheme(state, action: PayloadAction<Theme>) {
      state.theme = action.payload;
    },
    toggleTheme(state) {
      state.theme = state.theme === "light" ? "dark" : "light";
    },
  },
});

export const { setLocale, setTheme, toggleTheme } = appSlice.actions;
export default appSlice.reducer;
