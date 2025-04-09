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
      <div>
        <label htmlFor={name}>{label}</label>
        <input
          placeholder={placeholder}
          name={name}
          type={type}
          ref={ref}
          {...props}
          disabled={disabled}
        />
        {isError && <div>{errorMessage}</div>}
      </div>
    );
  }
);
export default SignInput;
