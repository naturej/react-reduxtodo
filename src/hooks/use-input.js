/**
 * custom hook 이란?
 * 훅을 `사용하고 있는` 재사용 가능한 로직을 모듈화
 *
 * 재사용 가능성이 없는 훅을 커스텀 훅으로 만드는 것은 옳을까? 옳지 않을까?
 */

import { useState } from "react";

const useInput = (initialValue = "") => {
  const [value, setValue] = useState(initialValue);

  const onChange = (e) => {
    setValue(e.target.value);
  };

  return [value, onChange, setValue];
};

export default useInput;

// const [email, onChangeEmail, setEmail] = useInput(); // [value, onChange, setValue];
// const email = useInput();
