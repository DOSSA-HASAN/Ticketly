import React from "react";

function InputField({
  placeholder,
  value,
  type = "text",
  handleChange,
  handleSubmit,
  btnText = "Submit",
}) {
  return (
    <>
      <input
        type={type}
        placeholder={placeholder}
        onChange={(e) => handleChange(e.target.value)}
        value={value}
      />
      <button onClick={() => handleSubmit(value)}>{btnText}</button>
    </>
  );
}

export default InputField;
