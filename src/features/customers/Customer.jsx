import { useSelector } from "react-redux";

const Customer = () => {
  const customerName = useSelector((store) => store.customer.fullName);

  return (
    <div>
      <p>Welcome 🙏 {customerName}</p>
    </div>
  );
};

export default Customer;
