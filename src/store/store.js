// frontend/src/redux/store.js
import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./modules/authentication/authReducer";
import pdfReducer from "./modules/pdf/pdfReducer";
import articleReducer from "./modules/article/articleReducer";
import youtubeReducer from "./modules/youtube/youtubeReducer";
import textReducer from "./modules/text/textReducer";

const store = configureStore({
  reducer: {
    auth: authReducer,
    pdf: pdfReducer,
    youtube: youtubeReducer,
    article: articleReducer,
    textReducer: textReducer,
  },
});

export default store;
