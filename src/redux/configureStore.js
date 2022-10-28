import { combineReducers, configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  persistStore,
} from "reduxjs-toolkit-persist";

import storage from "reduxjs-toolkit-persist/lib/storage";
import autoMergeLevel1 from "reduxjs-toolkit-persist/lib/stateReconciler/autoMergeLevel1";
import userReducer from "./reducers/userReducer";
import uiReducer from "./reducers/uiReducer";
import productReducer from "./reducers/productReducer";
import orderReducer from "./reducers/orderReducer";

const persistConfig = {
  key: "root",
  storage,
  stateReconciler: autoMergeLevel1,
};

const reducers = combineReducers({
  user: userReducer,
  ui: uiReducer,
  product: productReducer,
  order: orderReducer,
});

const reducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer,
  middleware: getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
});

export const persistor = persistStore(store);

export default store;
