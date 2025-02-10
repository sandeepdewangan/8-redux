const initialAccountState = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
};

export default function accountReducer(state = initialAccountState, action) {
  switch (action.type) {
    case "account/deposit":
      return { ...state, balance: state.balance + Number(action.payload) };
    case "account/withdraw":
      return { ...state, balance: state.balance - Number(action.payload) };
    case "account/requestLoan":
      if (state.loan > 0) return state;
      return {
        ...state,
        loan: action.payload.amount,
        loanPurpose: action.payload.purpose,
      };
    default:
      return state;
  }
}

// Actions
export function deposit(amount) {
  return { type: "account/deposit", payload: amount };
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
