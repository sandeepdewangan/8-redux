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

const store = createStore(reducer);
store.dispatch({ type: "account/deposit", payload: 100 });

console.log(store.getState());
