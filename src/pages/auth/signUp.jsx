import { auth } from "@/apis/auth/auth";
import SignInput from "@/components/Common/SignInput";
import EmptyLayout from "@/components/Layout/EmptyLayout";
import { USER_INPUT_VALIDATION } from "@/constants/user";
import { useMutation } from "@tanstack/react-query";
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
    <div>
      회원가입 페이지
      <form onSubmit={handleSubmit(onsubmit)}>
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
                  password === value || passwordConfirm?.errorMessage.confirm
                );
              },
            },
          })}
        />
        <button type="submit" disabled={!isValid}>
          회원가입
        </button>
      </form>
    </div>
  );
};

export default signup;

signup.getLayout = function getLayout(page) {
  return <EmptyLayout>{page}</EmptyLayout>;
};
