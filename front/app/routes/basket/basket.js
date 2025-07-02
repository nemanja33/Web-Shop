import { createSlice } from "@reduxjs/toolkit";

export const basket = createSlice({
  name: "basket",
  initialState: {
    value: 0
  },
  reducers: {
   addItem: state => {
    state.value += 1
   },
   removeItem: state => {
    state.value -= 1
   }
  },
});

export const { addItem, removeItem } = basket.actions
export default basket.reducer;