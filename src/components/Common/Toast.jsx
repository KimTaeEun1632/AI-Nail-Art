import React, { useEffect } from "react";

const Toast = ({ onShow, children }) => {
  useEffect(() => {
    const toastTimer = setTimeout(() => {
      onShow();
    }, 3000);

    return () => {
      clearTimeout(toastTimer);
    };
  });

  return (
    <div
      className={`fixed left-1/2 z-50 -translate-x-1/2 -translate-y-1/2 transform whitespace-nowrap rounded-full border bg-gray-950 p-2 text-xs leading-6 text-white tablet:text-sm  mobile:text-xs ${
        window.innerWidth > 768 ? "bottom-8" : "bottom-4"
      }`}
    >
      {children}
    </div>
  );
};

export default Toast;
