import { signIn } from "next-auth/react";

export default function SignIn() {
  return (
    <div className="flex items-center justify-center pt-20">
      <button
        className="w-6 h-6"
        onClick={() =>
          signIn("google", {
            callbackUrl: "http://localhost:3000/test",
          })
        }
      >
        google login
      </button>
      ;
    </div>
  );
}
