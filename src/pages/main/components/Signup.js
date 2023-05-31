import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import BasicButton from "@components/Button/Button";
import { toastMessage } from "@components/Toast/toast-message";
import useInputs from "@hooks/use-inputs";
import * as S from "./style";

const SignUpForm = () => {
  const [
    { email, password, passwordConfirm },
    onChangeForm,
    errors,
    successes,
  ] = useInputs({
    email: "",
    password: "",
    passwordConfirm: "",
  });
  const [isValid, setIsValid] = useState(false);
  const [cursor, setCursor] = useState("not-allowed");

  const toastOption = {
    autoClose: 2000,
    theme: "colored",
  };

  useEffect(() => {
    if (successes.email && successes.password && successes.passwordConfirm) {
      setIsValid(true);
      setCursor("pointer");
    } else {
      setIsValid(false);
      setCursor("not-allowed");
    }
  }, [successes]);

  const onSubmitSignup = async (e) => {
    e.preventDefault();
    setIsValid(false);
    setCursor("wait");

    try {
      await toast.promise(signUpRequest, {
        pending: {
          render() {
            return "처리 중 ...";
          },
          ...toastOption,
        },
        success: {
          render() {
            return "회원가입 성공!";
          },
          icon: "🥳",
          ...toastOption,
        },
        error: {
          render() {
            return "회원가입 실패. 잠시 후 다시 시도해 주세요.";
          },
          icon: "😢",
          ...toastOption,
        },
      });
      setIsValid(true);
      setCursor("pointer");
    } catch (error) {
      toastMessage(error, toast.error);
    }
  };

  // 회원가입 요청(Back-end 통신)을 가정
  const signUpRequest = () => {
    return new Promise((resolve) => setTimeout(resolve, 2000));
  };

  return (
    <S.Form onSubmit={onSubmitSignup}>
      <S.InputBox errors={errors.email}>
        <label>이메일</label>
        <input
          type="email"
          name="email"
          onChange={onChangeForm}
          placeholder="이메일"
        />
      </S.InputBox>
      {errors.email && <S.FailMessage>{errors.email}</S.FailMessage>}
      {successes.email && (
        <S.SuccessMessage>{successes.email}</S.SuccessMessage>
      )}
      <S.InputBox errors={errors.password}>
        <label>비밀번호</label>
        <input
          type="password"
          name="password"
          onChange={onChangeForm}
          placeholder="비밀번호"
        />
      </S.InputBox>
      {errors.password && <S.FailMessage>{errors.password}</S.FailMessage>}
      {successes.password && (
        <S.SuccessMessage>{successes.password}</S.SuccessMessage>
      )}
      <S.InputBox errors={errors.passwordConfirm}>
        <label>비밀번호 확인</label>
        <input
          type="password"
          name="passwordConfirm"
          onChange={onChangeForm}
          placeholder="비밀번호 확인"
        />
      </S.InputBox>
      {errors.passwordConfirm && (
        <S.FailMessage>{errors.passwordConfirm}</S.FailMessage>
      )}
      {successes.passwordConfirm && (
        <S.SuccessMessage>{successes.passwordConfirm}</S.SuccessMessage>
      )}
      <BasicButton
        size={"full"}
        shape={"default"}
        variant={"primary"}
        cursor={cursor}
        disabled={!isValid}
      >
        회원가입
      </BasicButton>
    </S.Form>
  );
};

export default SignUpForm;
