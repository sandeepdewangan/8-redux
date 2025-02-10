import { useSelector } from "react-redux";
import CreateCustomer from "./features/customers/CreateCustomer";
import Customer from "./features/customers/Customer";
import Account from "./features/accounts/Account";
import Balance from "./features/accounts/Balance";

function App() {
  const fullName = useSelector((store) => store.customer.fullName);

  return (
    <div className="App">
      {fullName === "" ? (
        <CreateCustomer />
      ) : (
        <>
          <Customer />
          <Balance />
          <Account />
        </>
      )}
    </div>
  );
}

export default App;
