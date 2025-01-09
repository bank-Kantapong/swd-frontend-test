import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export enum LANGUAGE {
  TH = "th",
  EN = "en",
}

interface LanguageState {
  language: LANGUAGE;
}

const initialState: LanguageState = {
  language: LANGUAGE.EN,
};

const languageSlice = createSlice({
  name: "language",
  initialState,
  reducers: {
    changeLanguage: (state, action: PayloadAction<LANGUAGE>) => {
      state.language = action.payload;
    },
  },
});

export const { changeLanguage } = languageSlice.actions;

export default languageSlice.reducer;
