// redux/store.js
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { userReducer } from "./reducers/user.js";
import { sellerReducer } from "./reducers/seller.js";
import { productReducer } from "./reducers/product.js";
import { eventReducer } from "./reducers/event.js";
import { cartReducer } from "./reducers/cart.js";
import { wishlistReducer } from "./reducers/wishlist.js";
import { orderReducer } from "./reducers/order.js";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // localStorage
const rootReducer = combineReducers({
  user: userReducer,
  seller: sellerReducer,
  products: productReducer,
  events: eventReducer,
  cart: cartReducer,
  wishlist: wishlistReducer,
  order: orderReducer,
});

// config for persist
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user", "cart", "wishlist"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
});

export const persistor = persistStore(store);
