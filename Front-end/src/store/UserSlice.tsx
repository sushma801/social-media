import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loggedInUser: null,
};

const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setAuthUser: (state, action) => {
      const authUser = localStorage.getItem("authUser");
      if (authUser) {
        state.loggedInUser = authUser;
      }
      state.loggedInUser = action.payload;
    },
  },
});

export const { setAuthUser } = UserSlice.actions;
export default UserSlice.reducer;
