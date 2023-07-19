import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: [] as any,
  reducers: {
    addItem: (state, action) => {
      const item = action.payload;
      const existingItem:any = state.find((i:any) => i.uuid === item.uuid);
      if (existingItem) {
        existingItem.quantity++;
      } else {
        state.push({ ...item, quantity: 1 });
      }
    },
    removeItem: (state, action) => {
      const item = action.payload;
      const existingItem:any = state.find((i:any) => item.uuid === item.uuid);
      if (existingItem) {
        if (existingItem.quantity === 1) {
          return state.filter((item:any) => item.uuid !== item.uuid);
        } else {
          existingItem.quantity--;
        }
      }
    },
    clearCart: () => [],
  },
});

export const { addItem, removeItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
