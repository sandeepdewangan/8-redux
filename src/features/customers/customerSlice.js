const initialCustomerState = {
  fullName: "",
  adhaar: "",
  createdAt: "",
};

export default function customerReducer(state = initialCustomerState, action) {
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
// Actions

export function createCustomer(fullName, adhaar, createdAt) {
  return {
    type: "customer/createCustomer",
    payload: { fullName: fullName, adhaar: adhaar, createdAt: createdAt },
  };
}
