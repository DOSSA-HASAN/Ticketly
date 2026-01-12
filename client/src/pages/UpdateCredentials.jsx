import { useState } from "react";
import InputField from "../components/InputField.jsx";
import VerifyCurrentEmail from "../components/VerifyCurrentEmail.jsx";

function ChangeEmail() {
  const [newEmail, setNewEmail] = useState("");

  const handleInputChange = (value) => {
    setNewEmail(value);
  };

  const handleSubmit = async (credential) => {
    // send to backend
    console.log(`This is the new credential value: ${credential}`);
  };
  return (
    <>
      <VerifyCurrentEmail />
      <InputField
        placeholder={"Enter your new email"}
        type="email"
        handleChange={handleInputChange}
        value={newEmail}
        handleSubmit={handleSubmit}
      />
    </>
  );
}

export default ChangeEmail;
