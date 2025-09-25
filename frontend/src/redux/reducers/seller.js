import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isSeller: false, // true if seller is logged in
  isLoading: true, // true while fetching seller data
  seller: null, // seller object { _id, name, avatar, ... }
  error: null,
  sellers: [], // error message if any
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

    //get all sellers Admin
    .addCase("getAllSellerRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("getAllSellerSuccess", (state, action) => {
      state.isLoading = false;
      state.sellers = action.payload;
    })
    .addCase("getAllSellerFailed", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.isSeller = false;
    })

    .addCase("clearErrors", (state) => {
      state.error = null;
    });
});
