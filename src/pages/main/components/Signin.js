import { useState } from "react";
import { toast } from "react-toastify";
import BasicButton from "@components/Button/Button";
import { toastMessage } from "@components/Toast/toast-message";
import useInputs from "@hooks/use-inputs";
import * as S from "./style";

const SignInForm = () => {
  const [{ email }, onChangeForm, errors] = useInputs({
    email: "",
  });
  const [isValid, setIsValid] = useState(true);
  const [cursor, setCursor] = useState("pointer");

  const toastOption = {
    autoClose: 2000,
    theme: "colored",
  };

  const onSubmitSignin = async (e) => {
    e.preventDefault();
    const { password } = e.target;
    if (email === "" || password.value === "")
      return toastMessage("이메일 비밀번호를 입력해주세요", toast.error);
    setIsValid(false);
    setCursor("wait");
    try {
      await toast.promise(signInRequest, {
        pending: {
          render() {
            return "처리 중 ...";
          },
          ...toastOption,
        },
        success: {
          render() {
            return "로그인 성공";
          },
          icon: "😄",
          ...toastOption,
        },
        error: {
          render() {
            return "로그인 실패. 잠시 후 다시 시도해 주세요.";
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

  // 로그인 요청(Back-end 통신)을 가정
  const signInRequest = () => {
    return new Promise((resolve) => setTimeout(resolve, 2000));
  };

  return (
    <S.Form onSubmit={onSubmitSignin}>
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
      <S.InputBox>
        <label>비밀번호</label>
        <input type="password" name="password" placeholder="비밀번호" />
      </S.InputBox>
      <BasicButton
        size={"full"}
        shape={"default"}
        variant={"primary"}
        cursor={cursor}
        disabled={!isValid}
      >
        로그인
      </BasicButton>
    </S.Form>
  );
};

export default SignInForm;
