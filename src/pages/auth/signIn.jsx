import React from "react";
import GoogleLoinButton from "@/components/Common/LoginButton";
import { USER_INPUT_VALIDATION } from "@/constants/user";
import { useForm } from "react-hook-form";
import EmptyLayout from "@/components/Layout/EmptyLayout";
import SignInput from "@/components/Common/SignInput";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import Link from "next/link";

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
      router.push("/create-image");
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center gap-10 w-full max-w-md">
        <Link href="/" className="text-5xl font-bold">
          NailX
        </Link>
        <div className="flex flex-col items-center gap-6 w-full">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-6 w-full"
          >
            <SignInput
              label="이메일"
              placeholder="이메일을 입력해 주세요"
              type="email"
              isError={errors.email}
              errorMessage={errors.email?.message}
              {...register("email", rules.emailRules)}
            />
            <SignInput
              label="비밀번호"
              placeholder="비밀번호을 입력해 주세요"
              type="password"
              isError={errors.password}
              errorMessage={errors.password?.message}
              {...register("password", rules.passwordRules)}
            />
            <button
              type="submit"
              disabled={!isValid}
              className="bg-[#c3b1ff] w-full rounded-md h-11 font-bold"
            >
              로그인
            </button>
          </form>
        </div>
        <div className="flex gap-2">
          <span>회원이 아닌신가요?</span>
          <Link href="/auth/signup" className="underline text-blue-600">
            회원가입
          </Link>
        </div>
        <div className="w-full">
          <GoogleLoinButton className="w-full flex items-center justify-center gap-2 px-6 py-3 border rounded-md hover:bg-gray-200" />
        </div>
      </div>
    </div>
  );
};

export default signin;

signin.getLayout = function getLayout(page) {
  return <EmptyLayout>{page}</EmptyLayout>;
};
