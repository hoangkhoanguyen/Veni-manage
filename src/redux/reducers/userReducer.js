import { createSlice } from "@reduxjs/toolkit";

const defaultState = {
  isLogin: false,
  userInfo: {},
};

const slice = createSlice({
  name: "user",
  initialState: defaultState,
  reducers: {
    setLogin: (state, action) => {
      const st = state;
      st.isLogin = action.payload;
    },
    setUserInfo: (state, action) => {
      const st = state;
      st.userInfo = action.payload;
    },
  },
});

export const { setLogin, setUserInfo } = slice.actions;

export default slice.reducer;
