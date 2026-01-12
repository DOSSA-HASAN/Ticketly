import React, { useCallback, useMemo, useRef, useState } from "react";
import Logo from "./Logo.jsx";

function VerifyCurrentEmail() {
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [isValid, setIsValid] = useState(false);
  const inputRefs = useRef([]);
  const fullOtp = useMemo(() => otp.join(""), [otp]);

  const handleChange = useCallback(
    (index, value) => {
      const digit = value.replace(/[^0-9]/g, "").slice(-1);

      if (!digit) return;

      const newOtp = [...otp];
      newOtp[index] = digit;
      setOtp(newOtp);

      const newOtpFull = newOtp.join("");
      if (newOtpFull.length === 6) {
        setIsValid(true);
      } else {
        setIsValid(false);
      }

      if (index < 6 - 1) {
        inputRefs.current[index + 1]?.focus();
      } else {
        inputRefs.current[index].blur();
      }
    },
    [otp]
  );

  return (
    <section className="w-full bg-gray-100">
      <div className="w-full max-w-[1440px] m-auto flex flex-col justify-center items-center h-screen">
        <Logo />
        <form className="flex flex-col justify-center items-center bg-white shadow-md rounded-md p-5 mt-15">
          <h1 className="text-dark text-2xl font-bold">Verify Your Email</h1>
          <p className="text-gray-500">
            Please enter the 6-digit code sent to your email address
          </p>
          <div className={"flex justify-items-center mt-10"}>
            {otp.map((field, index) => (
              <input
                maxLength={1}
                onChange={(e) => handleChange(index, e.target.value)}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                key={index}
                className={
                  "border-1 border-gray-200 rounded-md w-15 h-15 ml-5 focus:outline-blue-500"
                }
              />
            ))}
          </div>
          <button className="p-3 rounded-md bg-purple text-white font-bold hover:cursor-pointer mt-10">
            Submit
          </button>
        </form>
      </div>
    </section>
  );
}

export default VerifyCurrentEmail;
