import { useState } from "react";
import { useDispatch } from "react-redux";
import { createCustomer } from "./customerSlice";

const CreateCustomer = () => {
  const [fullName, setFullName] = useState();
  const [adhaar, setAdhaar] = useState();

  const dispatch = useDispatch();

  function onCreateCustomer() {
    if (!fullName || !adhaar) return;
    dispatch(createCustomer(fullName, adhaar));
  }

  return (
    <>
      <div>
        <input
          type="text"
          placeholder="Full name"
          onChange={(e) => setFullName(e.target.value)}
        />
      </div>
      <div>
        <input
          type="text"
          placeholder="Adhaar no."
          onChange={(e) => setAdhaar(e.target.value)}
        />
      </div>
      <div>
        <button onClick={onCreateCustomer}>Create User</button>
      </div>
    </>
  );
};

export default CreateCustomer;
