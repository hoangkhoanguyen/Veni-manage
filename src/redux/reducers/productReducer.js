const { createSlice } = require("@reduxjs/toolkit");

const slice = createSlice({
  name: "product",
  initialState: {
    reloadProductFromStore: false,
  },
  reducers: {
    setReloadProductFromStore: (state, action) => {
      const st = state;
      st.reloadProductFromStore = action.payload;
    },
  },
});

export const { setReloadProductFromStore } = slice.actions;
export default slice.reducer;
