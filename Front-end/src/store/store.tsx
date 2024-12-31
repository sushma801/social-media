import { configureStore } from "@reduxjs/toolkit";
import AuthUserReducers from "./UserSlice";

export default configureStore({
  reducer: {
    users: AuthUserReducers,
  },
});
