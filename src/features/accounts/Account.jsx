import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { deposit, requestLoan, withdraw } from "./accountSlice";

const Account = () => {
  const [depositAmount, setDepositAmount] = useState(0);
  const [withdrawAmount, setWithdrawAmount] = useState(0);
  const [loanAmount, setLoanAmount] = useState(0);
  const [loanPurpose, setLoanPurpose] = useState("");
  const [currency, setCurrency] = useState("INR");

  const { loan, isLoading } = useSelector((store) => store.account);

  const dispatch = useDispatch();

  function onDeposit() {
    if (depositAmount === 0) return;
    dispatch(deposit(depositAmount, currency));
    setDepositAmount(0);
  }

  function onWithdraw() {
    if (withdrawAmount === 0) return;
    dispatch(withdraw(withdrawAmount));
    setWithdrawAmount(0);
  }

  function onLoanRequest() {
    if (loanAmount === 0 || loanPurpose === "") return;
    dispatch(requestLoan(loanAmount, loanPurpose));
    setLoanAmount(0);
    setLoanPurpose("");
  }

  return (
    <div>
      <p>🏦 Account operations </p>
      <div>
        <label>Deposit Amount</label>
        <input
          type="number"
          value={depositAmount}
          onChange={(e) => setDepositAmount(e.target.value)}
        />
        <select value={currency} onChange={(e) => setCurrency(e.target.value)}>
          <option value="INR">INR</option>
          <option value="USD">US Dollar</option>
          <option value="THB">THB</option>
          <option value="PHP">Phillipino Pesso</option>
        </select>
        <button onClick={onDeposit} disabled={isLoading}>
          {isLoading ? "Converting..." : "Deposit"}
        </button>
      </div>

      <div>
        <label>Withdraw Amount</label>
        <input
          type="number"
          value={withdrawAmount}
          onChange={(e) => setWithdrawAmount(e.target.value)}
        />
        <button onClick={onWithdraw}>Withdraw</button>
      </div>

      <div>
        <label>Request Loan</label>
        <input
          type="number"
          placeholder="Loan Amount"
          value={loanAmount}
          onChange={(e) => setLoanAmount(e.target.value)}
        />
        <input
          type="text"
          placeholder="Loan Purpose"
          value={loanPurpose}
          onChange={(e) => setLoanPurpose(e.target.value)}
        />
        <button onClick={onLoanRequest}>Request Loan</button>
      </div>

      <div>
        <label>Payback Loan amount of Rs. {loan} </label>
        <button>Payback Loan</button>
      </div>
    </div>
  );
};

export default Account;
