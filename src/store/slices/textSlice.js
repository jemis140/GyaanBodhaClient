// textSlice.js

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  questionCount: 0,
};

const textSlice = createSlice({
  name: "text",
  initialState,
  reducers: {
    incrementQuestionCount: (state) => {
      state.questionCount += 1;
    },
  },
});

export const { incrementQuestionCount } = textSlice.actions;
export const selectQuestionCount = (state) => state.text.questionCount;
export default textSlice.reducer;
