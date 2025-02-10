import { legacy_createStore as createStore } from "redux";

const initialState = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case "account/deposit":
      return { ...state, balance: state.balance + action.payload };
    case "account/withdraw":
      return { ...state, balance: state.balance - action.payload };
    default:
      return state;
  }
}

function deposit(amount) {
  return { type: "account/deposit", payload: amount };
}

function withdraw(amount) {
  return { type: "account/withdraw", payload: amount };
}

const store = createStore(reducer);
// store.dispatch({ type: "account/deposit", payload: 100 });
// store.dispatch({ type: "account/withdraw", payload: 50 });
store.dispatch(deposit(100));
store.dispatch(withdraw(50));

console.log(store.getState());
