import { useState } from "react";

/**
 * useState hook을 사용하여 폼 입력값과 에러, 성공 메세지를 관리하는 custom hook
 * @param {Object} initialValue - 폼 필드의 초기값을 담은 객체
 * @returns {[Object, Function, Object, Object]} - 현재 폼 필드 값, 값 변경 핸들러 함수, 에러 메시지 객체, 성공 메시지 객체를 포함한 배열을 반환
 * 1. values: 폼 필드들의 현재 값이 담긴 객체
 * 2. onChange: 폼 필드 값이 변경될 때마다 해당 값을 업데이트하는 함수
 * 3. errors: 폼 필드별로 에러 메시지가 담긴 객체. 에러가 없는 필드는 빈 문자열("")을 값으로 가짐
 * 4. successes: 폼 필드별로 성공 메시지가 담긴 객체. 성공 메시지가 없는 필드는 빈 문자열("")을 값으로 가짐
 */
const useInputs = (initialValue) => {
  // 폼 입력값을 관리하는 state 변수
  const [values, setValues] = useState(initialValue);
  // 에러 메세지를 관리하는 state 변수
  const [errors, setErrors] = useState({});
  // 성공 메세지를 관리하는 state 변수
  const [successes, setSuccesses] = useState({});

  const onChange = (event) => {
    const { name, value } = event.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    validValues(name, value);
  };

  const setFieldError = (name, message) => {
    setErrors((prev) => ({ ...prev, [name]: message }));
    setSuccesses((prev) => ({ ...prev, [name]: "" }));
  };

  const setFieldSuccess = (name, message) => {
    setErrors((prev) => ({ ...prev, [name]: "" }));
    setSuccesses((prev) => ({ ...prev, [name]: message }));
  };

  const validValues = (name, value) => {
    switch (name) {
      // 이메일 유효성 검사
      case "email":
        if (value === "")
          return setFieldError("email", "이메일을 입력해주세요.");
        if (!value.includes("@"))
          return setFieldError("email", "이메일 양식을 확인해주세요.");
        setFieldSuccess("email", "좋습니다! :)");
        break;
      // 비밀번호 유효성 검사
      case "password":
        if (value === "")
          return setFieldError("password", "비밀번호를 입력해주세요.");
        if (value.length < 8)
          return setFieldError(
            "password",
            "비밀번호는 8글자 이상 입력해주세요."
          );
        if (values.passwordConfirm && value !== values.passwordConfirm)
          setFieldError(
            "passwordConfirm",
            "비밀번호와 비밀번호 확인이 일치하지 않습니다."
          );
        if (value === values.passwordConfirm)
          setFieldSuccess("passwordConfirm", "좋습니다! :)");
        setFieldSuccess("password", "좋습니다! :)");
        break;
      // 비밀번호 확인 유효성 검사
      case "passwordConfirm":
        if (value === "")
          return setFieldError(
            "passwordConfirm",
            "비밀번호 확인을 입력해주세요."
          );
        if (value !== values.password)
          return setFieldError(
            "passwordConfirm",
            "비밀번호와 비밀번호 확인이 일치하지 않습니다."
          );
        setFieldSuccess("passwordConfirm", "좋습니다! :)");
        break;
      // 디폴트
      default:
        break;
    }
  };

  return [values, onChange, errors, successes];
};

export default useInputs;
