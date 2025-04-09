import React from "react";
import LoginButton from "@/components/Common/LoginButton";
import { USER_INPUT_VALIDATION } from "@/constants/user";
import { useForm } from "react-hook-form";
import EmptyLayout from "@/components/Layout/EmptyLayout";
import SignInput from "@/components/Common/SignInput";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";

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
  const { formState, register, handleSubmit } = useForm({
    defaultValues: { email: "", password: "" },
    mode: "onBlur",
  });

  const router = useRouter();

  const { isValid, errors } = formState;

  const onSubmit = async (data) => {
    const { email, password } = data;
    const res = await signIn("credentials", {
      redirect: false,
      email: email,
      password: password,
    });

    if (res?.error) {
      alert("로그인에 실패했습니다.");
    } else {
      router.push("/test");
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#ededed]">
      <div className="bg-white">
        로그인페이지
        <form onSubmit={handleSubmit(onSubmit)}>
          <SignInput
            className="border "
            label="이메일"
            placeholder="이메일을 입력해 주세요"
            type="email"
            isError={errors.email}
            errorMessage={errors.email?.message}
            {...register("email", rules.emailRules)}
          />
          <SignInput
            className="border "
            label="비밀번호"
            placeholder="비밀번호을 입력해 주세요"
            type="password"
            isError={errors.password}
            errorMessage={errors.password?.message}
            {...register("password", rules.passwordRules)}
          />
          <button type="submit" disabled={!isValid}>
            로그인
          </button>
        </form>
      </div>
    </div>
  );
};

export default signin;

signin.getLayout = function getLayout(page) {
  return <EmptyLayout>{page}</EmptyLayout>;
};
