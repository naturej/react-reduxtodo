import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import BasicButton from "@components/Button/Button";
import { toastMessage } from "@components/Toast/toast-message";
import * as S from "@pages/main/components/style";

const SignUpForm = () => {
  const {
    register,
    formState: { isSubmitting, errors },
    handleSubmit,
    watch,
    setError,
    clearErrors,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
      passwordConfirm: "",
    },
  });

  const toastOption = {
    autoClose: 2000,
    theme: "colored",
  };

  const onSubmitSignup = async (data) => {
    if (data.password === "")
      return toastMessage("비밀번호를 입력해 주세요.", toast.error);
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
    } catch (error) {
      toastMessage(error, toast.error);
    }
  };

  // 회원가입 요청(Back-end 통신)을 가정
  const signUpRequest = () => {
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

  const passwordRegister = register("password", {
    required: "비밀번호를 입력해주세요.",
    minLength: {
      value: 8,
      message: "비밀번호는 8글자 이상 입력해주세요.",
    },
    validate: (value) => {
      if (watch("passwordConfirm") && watch("passwordConfirm") !== value) {
        setError("passwordConfirm", {
          message: "비밀번호와 비밀번호 확인이 일치하지 않습니다.",
        });
      }
      if (watch("passwordConfirm") === value) {
        clearErrors("passwordConfirm");
      }
    },
  });

  const passwordConfirmRegister = register("passwordConfirm", {
    required: "비밀번호 확인을 입력해주세요.",
    validate: (value) => {
      if (watch("password") !== value) {
        return "비밀번호와 비밀번호 확인이 일치하지 않습니다.";
      }
    },
  });

  return (
    <S.Form onSubmit={handleSubmit(onSubmitSignup)}>
      <S.InputBox errors={errors.email}>
        <label>이메일</label>
        <input type="email" placeholder="이메일" {...emailRegister} />
      </S.InputBox>
      {errors.email && <S.FailMessage>{errors.email.message}</S.FailMessage>}
      <S.InputBox errors={errors.password}>
        <label>비밀번호</label>
        <input type="password" placeholder="비밀번호" {...passwordRegister} />
      </S.InputBox>
      {errors.password && (
        <S.FailMessage>{errors.password.message}</S.FailMessage>
      )}
      <S.InputBox errors={errors.passwordConfirm}>
        <label>비밀번호 확인</label>
        <input
          type="password"
          placeholder="비밀번호 확인"
          {...passwordConfirmRegister}
        />
      </S.InputBox>
      {errors.passwordConfirm && (
        <S.FailMessage>{errors.passwordConfirm.message}</S.FailMessage>
      )}
      <BasicButton
        size={"full"}
        shape={"default"}
        variant={"primary"}
        cursor={"pointer"}
        disabled={isSubmitting}
      >
        회원가입
      </BasicButton>
    </S.Form>
  );
};

export default SignUpForm;
