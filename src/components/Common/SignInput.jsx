import React, { forwardRef } from "react";

const SignInput = forwardRef(
  (
    {
      label,
      placeholder,
      name,
      type,
      isError,
      errorMessage,
      disabled,
      ...props
    },
    ref
  ) => {
    return (
      <div className="flex flex-col gap-1">
        <label htmlFor={name}>{label}</label>
        <input
          className="border rounded-md w-full h-14 border-[#CBC9CF]"
          placeholder={placeholder}
          name={name}
          type={type}
          ref={ref}
          {...props}
          disabled={disabled}
        />
        {isError && (
          <span className="text-red-400 text-[14px] ">{errorMessage}</span>
        )}
      </div>
    );
  }
);
export default SignInput;
