import { combineReducers, legacy_createStore as createStore } from "redux";

const initialAccountState = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
};

const initialCustomerState = {
  fullName: "",
  adhaar: "",
  createdAt: "",
};
// Store
function accountReducer(state = initialAccountState, action) {
  switch (action.type) {
    case "account/deposit":
      return { ...state, balance: state.balance + action.payload };
    case "account/withdraw":
      return { ...state, balance: state.balance - action.payload };
    default:
      return state;
  }
}

function customerReducer(state = initialCustomerState, action) {
  switch (action.type) {
    case "customer/createCustomer":
      return {
        ...state,
        fullName: action.payload.fullName,
        adhaar: action.payload.adhaar,
        createdAt: action.payload.createdAt,
      };
    case "account/updateName":
      return { ...state, fullName: action.payload.fullName };

    default:
      return state;
  }
}
// Reducers
const rootReducer = combineReducers({
  account: accountReducer,
  customer: customerReducer,
});
const store = createStore(rootReducer);

// Actions
function deposit(amount) {
  return { type: "account/deposit", payload: amount };
}

function withdraw(amount) {
  return { type: "account/withdraw", payload: amount };
}
function createCustomer(fullName, adhaar, createdAt) {
  return {
    type: "customer/createCustomer",
    payload: { fullName: fullName, adhaar: adhaar, createdAt: createdAt },
  };
}

store.dispatch(deposit(100));
store.dispatch(withdraw(50));

store.dispatch(
  createCustomer("Sandeep Dewangan", "123456789", new Date().toISOString())
);

console.log(store.getState());
