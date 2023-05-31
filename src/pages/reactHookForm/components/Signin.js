import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import BasicButton from "@components/Button/Button";
import { toastMessage } from "@components/Toast/toast-message";
import * as S from "@pages/main/components/style";

const SignInForm = () => {
  const {
    register,
    formState: { isSubmitting, errors },
    handleSubmit,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const toastOption = {
    autoClose: 2000,
    theme: "colored",
  };

  const onSubmitSignin = async (data) => {
    if (data.password === "")
      return toastMessage("비밀번호를 입력해 주세요.", toast.error);

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
    } catch (error) {
      toastMessage(error, toast.error);
    }
  };

  // 로그인 요청(Back-end 통신)을 가정
  const signInRequest = () => {
    return new Promise((resolve) => setTimeout(resolve, 2000));
  };

  const emailRegister = register("email", {
    required: "이메일을 입력해주세요.",
    pattern: {
      value:
        /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i,
      message: "이메일 양식을 확인해주세요.",
    },
  });

  const passwordRegister = register("password");

  return (
    <S.Form onSubmit={handleSubmit(onSubmitSignin)}>
      <S.InputBox errors={errors.email}>
        <label>이메일</label>
        <input
          type="email"
          name="email"
          placeholder="이메일"
          {...emailRegister}
        />
      </S.InputBox>
      {errors.email && <S.FailMessage>{errors.email.message}</S.FailMessage>}
      <S.InputBox>
        <label>비밀번호</label>
        <input
          type="password"
          name="password"
          placeholder="비밀번호"
          {...passwordRegister}
        />
      </S.InputBox>
      <BasicButton
        size={"full"}
        shape={"default"}
        variant={"primary"}
        cursor={"pointer"}
        disabled={isSubmitting}
      >
        로그인
      </BasicButton>
    </S.Form>
  );
};

export default SignInForm;
