const { createSlice } = require("@reduxjs/toolkit");

const slice = createSlice({
  name: "ui",
  initialState: {
    isSuccess: false,
    isError: false,
    isInfo: false,
    notiContent: "",
    notiTitle: "",
  },
  reducers: {
    setOpenSuccessSnackbar: (state, action) => {
      const st = state;
      st.isSuccess = action.payload;
    },
    setOpenErrorSnackbar: (state, action) => {
      const st = state;
      st.isError = action.payload;
    },
    setOpenInfoSnackbar: (state, action) => {
      const st = state;
      st.isInfo = action.payload;
    },
    setNotiContent: (state, action) => {
      const st = state;
      st.notiContent = action.payload;
    },
    setNotiTitle: (state, action) => {
      const st = state;
      st.notiTitle = action.payload;
    },
    setNotiInfo: (state, action) => {
      const st = state;
      st.notiContent = action.payload.notiContent;
      st.notiTitle = action.payload.notiTitle;
    },
  },
});

export const {
  setOpenSuccessSnackbar,
  setOpenErrorSnackbar,
  setOpenInfoSnackbar,
  setNotiContent,
  setNotiTitle,
  setNotiInfo,
} = slice.actions;
export default slice.reducer;
