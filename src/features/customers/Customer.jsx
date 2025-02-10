import { useSelector } from "react-redux";

const Customer = () => {
  const customerName = useSelector((store) => store.customer.fullName);
  console.log(customerName);

  return <div></div>;
};

export default Customer;
