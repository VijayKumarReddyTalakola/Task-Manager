import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./redux/slice.js";
const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

export default store;
