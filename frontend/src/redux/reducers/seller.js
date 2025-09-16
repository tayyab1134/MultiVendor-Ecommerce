import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isSeller: false,   // true if seller is logged in
  isLoading: true,  // true while fetching seller data
  seller:null,      // seller object { _id, name, avatar, ... }
  error: null,       // error message if any
};

export const sellerReducer = createReducer(initialState, (builder) => {
  builder
    .addCase("LoadSellerRequest", (state) => {
      state.isLoading = true;
      state.error = null;
    })
    .addCase("LoadSellerSuccess", (state, action) => {
      state.isSeller = true;
      state.isLoading = false;
      state.seller = action.payload;
    })
    .addCase("LoadSellerFail", (state, action) => {
      state.isLoading = false;
      state.isSeller = false;
      state.seller = null;
      state.error = action.payload;
    })
    .addCase("clearErrors", (state) => {
      state.error = null;
    });
});