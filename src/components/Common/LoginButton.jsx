import React from "react";
import { signIn } from "next-auth/react";

const LoginButton = () => {
  return (
    <>
      <button
        className="flex items-center justify-center gap-2 px-6 py-3 bg-[#dafba6] rounded-full hover:bg-[#edfad9] text-gray-700 font-medium cursor-pointer"
        onClick={() =>
          signIn("google", {
            callbackUrl: "http://localhost:3000/test",
          })
        }
      >
        <svg
          className="w-5 h-5"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12.24 10.32v2.88h4.56c-.18 1.08-.72 1.92-1.44 2.52v2.16h2.88c1.68-1.56 2.64-3.84 2.64-6.48 0-.6-.06-1.2-.18-1.8h-8.46z"
            fill="#4285F4"
          />
          <path
            d="M12 21.6c2.88 0 5.28-1.08 7.2-2.88l-3.36-2.64c-.96.66-2.16 1.08-3.84 1.08-2.94 0-5.4-1.98-6.3-4.68H2.4v2.88C4.32 18.72 7.92 21.6 12 21.6z"
            fill="#34A853"
          />
          <path
            d="M5.7 13.08c-.24-.72-.36-1.5-.36-2.28s.12-1.56.36-2.28V5.64H2.4C1.56 7.32 1 9.12 1 11.04c0 1.92.56 3.72 1.44 5.28l3.26-3.24z"
            fill="#FBBC05"
          />
          <path
            d="M12 4.8c1.56 0 2.94.54 4.02 1.56l3-3C17.04 1.56 14.64.6 12 .6 7.92.6 4.32 3.36 2.4 6.72l3.3 2.64c.9-2.7 3.36-4.56 6.3-4.56z"
            fill="#EA4335"
          />
        </svg>
        <span>Google로 로그인</span>
      </button>
    </>
  );
};

export default LoginButton;
