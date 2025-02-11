import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
  isLoading: false,
};

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    deposit(state, action) {
      // here we can write the mutating logic.
      state.balance = state.balance + Number(action.payload);
      state.isLoading = false;
    },
    withdraw(state, action) {
      state.balance = state.balance - Number(action.payload);
    },
    // by default RTK does not accept action as multiple arguments.
    // to solve this use prepare method.
    requestLoan: {
      prepare(amount, purpose) {
        return { payload: { amount, purpose } };
      },
      reducer(state, action) {
        if (state.loan > 0) return;
        state.loan = action.payload.amount;
        state.loanPurpose = action.payload.purpose;
        state.balance = state.balance + action.payload.amount;
      },
    },
    payLoan(state, action) {
      state.loan = 0;
      state.loanPurpose = "";
      state.balance = state.balance - state.loan;
    },
    converting(state) {
      state.isLoading = true;
    },
  },
});

// export actions
export const { withdraw, requestLoan, payLoan } = accountSlice.actions;

// API call.
// Not a react toolkit way.
export function deposit(amount, currency) {
  if (currency === "INR") return { type: "account/deposit", payload: amount };
  // thunk will execute. if it returns a function than it means it is a async operation.
  return async function (dispatch, getState) {
    // Set loading indicator on
    dispatch({ type: "account/converting" });
    // API Calls
    const res = await fetch(
      `https://api.frankfurter.dev/v1/latest?base=${currency}&symbols=INR`
    );
    const data = await res.json();
    const convertedAmount = (amount * data.rates["INR"]).toFixed(2);
    // Return Action
    dispatch({ type: "account/deposit", payload: convertedAmount });
  };
}

// export reducer
export default accountSlice.reducer;
