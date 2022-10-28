const { createSlice } = require("@reduxjs/toolkit");

const slice = createSlice({
  name: "order",
  initialState: {
    selectedOrder: {},
    isOpenOrderDetails: false,
  },
  reducers: {
    setSelectedOrder: (state, action) => {
      const st = state;
      st.selectedOrder = action.payload;
    },
    setOpenOrderDetails: (state, action) => {
      const st = state;
      st.isOpenOrderDetails = action.payload;
    },
  },
});

export const { setSelectedOrder, setOpenOrderDetails } = slice.actions;
export default slice.reducer;
