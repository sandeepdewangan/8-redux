import accountReducer from "./features/accounts/accountSlice";
import customerReducer from "./features/customers/customerSlice";
import { configureStore } from "@reduxjs/toolkit";

// no need to wrap with dev tools bez its support is built in.
const store = configureStore({
  reducer: { account: accountReducer, customer: customerReducer },
});

export default store;
