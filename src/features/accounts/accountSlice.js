const initialAccountState = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
  isLoading: false,
};

export default function accountReducer(state = initialAccountState, action) {
  switch (action.type) {
    case "account/deposit":
      return {
        ...state,
        balance: state.balance + Number(action.payload),
        isLoading: false,
      };
    case "account/withdraw":
      return { ...state, balance: state.balance - Number(action.payload) };
    case "account/requestLoan":
      if (state.loan > 0) return state;
      return {
        ...state,
        loan: action.payload.amount,
        loanPurpose: action.payload.purpose,
      };
    case "account/converting":
      return { ...state, isLoading: true };
    default:
      return state;
  }
}

// Actions
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

export function withdraw(amount) {
  return { type: "account/withdraw", payload: amount };
}

export function requestLoan(amount, purpose) {
  return {
    type: "account/requestLoan",
    payload: { amount: amount, purpose: purpose },
  };
}
