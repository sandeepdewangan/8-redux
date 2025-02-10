import { useSelector } from "react-redux";

const Balance = () => {
  const balance = useSelector((store) => store.account.balance);
  return (
    <div>
      <h3>Rs. {balance}</h3>
    </div>
  );
};

export default Balance;
