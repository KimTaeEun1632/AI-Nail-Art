import { auth } from "@/apis/auth/auth";
import GoogleLoinButton from "@/components/Common/LoginButton";
import SignInput from "@/components/Common/SignInput";
import EmptyLayout from "@/components/Layout/EmptyLayout";
import { USER_INPUT_VALIDATION } from "@/constants/user";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useForm } from "react-hook-form";

const { email, password, passwordConfirm, nickname } = USER_INPUT_VALIDATION;

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
  nicknameRules: {
    required: nickname.errorMessage.empty,
    pattern: {
      value: nickname.regex,
      message: nickname.errorMessage.invalid,
    },
  },
};
const signup = () => {
  const { formState, register, handleSubmit, getValues } = useForm({
    mode: "onBlur",
  });

  const router = useRouter();

  const signMutation = useMutation({
    mutationFn: (data) => auth.signUp(data),
    mutationKey: ["signUp"],
    onSuccess: () => {
      router.push("/auth/signin");
    },
    onError: (error) => {
      alert(error.response?.data.message);
    },
  });

  const { isValid, errors } = formState;

  const onsubmit = (data) => {
    signMutation.mutate(data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center gap-10 w-full max-w-md">
        <Link href="/" className="text-5xl font-bold">
          NailX
        </Link>
        <div className="flex flex-col items-center gap-6 w-full">
          <form
            onSubmit={handleSubmit(onsubmit)}
            className="flex flex-col gap-6 w-full"
          >
            <SignInput
              label="이메일"
              type="email"
              placeholder="이메일을 입력해 주세요"
              isError={errors.email}
              errorMessage={errors.email?.message}
              {...register("email", rules.emailRules)}
            />
            <SignInput
              label="닉네임"
              type="text"
              placeholder="닉네임을 입력해 주세요"
              isError={errors.nickname}
              errorMessage={errors.nickname?.message}
              {...register("nickname", rules.nicknameRules)}
            />
            <SignInput
              label="비밀번호"
              type="password"
              placeholder="비밀번호를 입력해 주세요"
              isError={errors.password}
              errorMessage={errors.password?.message}
              {...register("password", rules.passwordRules)}
            />
            <SignInput
              label="비밀번호 확인"
              type="password"
              placeholder="비밀번호를 한번 더 입력해 주세요"
              isError={errors.passwordConfirm}
              errorMessage={errors.passwordConfirm?.message}
              {...register("passwordConfirm", {
                validate: {
                  notMatch: (value) => {
                    const { password } = getValues();
                    return (
                      password === value ||
                      passwordConfirm?.errorMessage.confirm
                    );
                  },
                },
              })}
            />
            <button
              type="submit"
              disabled={!isValid}
              className="bg-[#c3b1ff] w-full rounded-md h-11 font-bold"
            >
              회원가입
            </button>
          </form>
        </div>
        <div className="flex gap-2">
          <span>이미 가압하셨나요?</span>
          <Link href="/auth/signup" className="underline text-blue-600">
            로그인
          </Link>
        </div>
        <div className="w-full">
          <GoogleLoinButton className="w-full flex items-center justify-center gap-2 px-6 py-3 border rounded-md hover:bg-gray-200" />
        </div>
      </div>
    </div>
  );
};

export default signup;

signup.getLayout = function getLayout(page) {
  return <EmptyLayout>{page}</EmptyLayout>;
};
