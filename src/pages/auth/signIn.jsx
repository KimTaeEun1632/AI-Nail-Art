import React from "react";
import LoginButton from "@/components/Common/LoginButton";
import { USER_INPUT_VALIDATION } from "@/constants/user";
import { useForm } from "react-hook-form";
import EmptyLayout from "@/components/Layout/EmptyLayout";

const { email, password } = USER_INPUT_VALIDATION;

const rules = {
  emailRules: {
    required: email.errorMessage.empty,
    pattern: {
      value: email.regex,
      message: email.errorMessage.invalid,
    },
  },
  passwordRules: {
    required: password.errorMessage.empty,
    pattern: {
      value: password.regex,
      message: password.errorMessage.invalid,
    },
    minLength: {
      value: 8,
      message: password.errorMessage.minLength,
    },
    maxLength: {
      value: 16,
      message: password.errorMessage.maxLength,
    },
  },
};

const signin = () => {
  const { fromState, register, handleSubmit } = useForm({
    defaultValues: { email: "", password: "" },
    mode: "onBlur",
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#ededed]">
      <div className="bg-white">
        <form>
          <input
            className="border "
            placeholder="이메일을 입력해 주세요"
            type="email"
            {...register("email", rules.emailRules)}
          />
        </form>
      </div>
    </div>
  );
};

export default signin;

signin.getLayout = function getLayout(page) {
  return <EmptyLayout>{page}</EmptyLayout>;
};
