import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./states/auth/slice";
import usersSlice from "./states/users/slice";
import productsSlice from "./states/products/slice";
import categoriesSlice from "./states/categories/slice";
import clientsSlice from "./states/clients/slice";
import ordersSlice from "./states/orders/slice";

interface AuthState {
  user: any;
  error: string;
  userInfo: any;
  loading: boolean;
  success: boolean;
}
export interface AppStore {
  auth: AuthState;
  users: any;
  products: any;
  categories: any;
  clients: any;
  orders: any;
}

export default configureStore<AppStore>({
  reducer: {
    auth: authSlice.reducer,
    users: usersSlice.reducer,
    products: productsSlice.reducer,
    categories: categoriesSlice.reducer,
    clients: clientsSlice.reducer,
    orders: ordersSlice.reducer,
  },
});
