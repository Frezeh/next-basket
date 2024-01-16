import { Product } from "@/lib/utils";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type WistlistType = {
  wishlist: Product[];
};

const initialState: WistlistType = {
  wishlist: [],
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addToWishlist: (state: WistlistType, action: PayloadAction<Product>) => {
      const itemInWishlist = state.wishlist.find(
        (item) => item.id === action.payload.id
      );
      if (itemInWishlist) {
        return;
      } else {
        state.wishlist.push(action.payload);
      }
    },
    removeFromWishlist: (state, action: PayloadAction<number>) => {
      const removeItem = state.wishlist.filter(
        (item) => item.id !== action.payload
      );
      state.wishlist = removeItem;
    },
    clearWishlist: (state) => {
      state.wishlist = [];
    },
  },
});

export const wishlistReducer = wishlistSlice.reducer;
export const { addToWishlist, removeFromWishlist, clearWishlist } =
  wishlistSlice.actions;
