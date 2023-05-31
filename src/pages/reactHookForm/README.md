# React Hook Form
react-hook-form은 React에서 `form`을 `Uncontrolled` 방식으로 쉽게 다룰 수 있도록 지원하는 라이브러리이다.  

`Uncontrolled` 방식이란?

## 🤷‍ Controlled ? Uncontrolled ?
React의 컴포넌트를 설명할 때 Uncontrolled Component와 Controlled Component라는 개념이 있다.
- React는 내부의 상태(state)를 '신뢰 가능한 단일 소스([Single Source of Truth](https://react.dev/learn/sharing-state-between-components#a-single-source-of-truth-for-each-state))'로 관리하려는 설계 원칙을 가지고 있다.
- 즉 자식 컴포넌트가 data가 필요할 경우, 해당 data는 가장 가까운 공통 부모 컴포넌트에게서만 `props`의 형태로 전달받아서 사용해야 한다.
- 대부분의 HTML 엘리먼트들(ex. `<div>` 등)은 엘리먼트가 내부적으로 어떤 데이터를 가지지 않기 때문에 문제될 것이 없다.

하지만 HTML 엘리멘트 중 자체적으로 특정 data를 가지는 엘리먼트들이 있다. 

바로 `<form>` 태그의 엘리먼트들이다.(`<input>`, `<textarea>`, `<select>` 등)

이들은 user가 DOM에서 어떤 정보를 입력하거나 선택할 경우, 해당 정보를 HTML 엘리먼트가 직접 보관하게 되는데, 이는 위에서 언급한 리액트의 핵심 설계원리인 '신뢰 가능한 단일 소스' 원칙에 위배되는 상황이다.
따라서 이를 해결하기 위해서 React에서 Controlled 컴포넌트의 개념이 나온 것이다.  
  
## 🧩 Controlled Component의 특징  
Form Element의 `value` 변경을 `state`와 `handler`를 이용하여 `push`하는 방식이기 때문에 data(state)와 UI(input)가 항상 동기화되고, 이로 인해 input의 value 값을 바로 참조할 수 있다.

### 장점
- state는 React 시스템 안에서 렌더링과 함께 유지되는 값이기 때문에 어떤 시점에서도 `동일한 값을 보장`받는다.
- `실시간 작업 처리`가 가능하다. 실시간으로 field validation을 체크하거나, 조건에 따라 submit button을 disabling하는 등 실시간으로 user에게 정보를 일러줘야 할 때에 사용하기 좋다.

### 단점
- 필드 개수가 늘어나고 복잡해 질수록 필요한 코드 양이 늘어나며 상태를 공유하기 위한 `state lifting`도 많아진다. 이 경우 상위 컴포넌트에 상태가 집중되며 하위 컴포넌트들은 필연적으로 handler와 state를 주입받아야 하는 형태가 되기 때문에 `컴포넌트 단위 재사용`이 어려워진다.
- 모든 값이 state 로 연결되어 있으며 하나의 값이 변할때 마다 여러개의 자식 컴포넌트 들에서 무수히 많은 `리랜더링`이 발생한다.

이러한 Controlled Component의 단점을 보완하여 React Hook Form 라이브러리는 `Uncontrolled` 방식으로 폼 요소를 관리한다.
  
## ⚛ React Hook Form
공식사이트 : [https://react-hook-form.com/](https://react-hook-form.com/)

### 장점
- `코드 간소화`
- 불필요한 `리렌더링 방지`
- Uncontrolled Component 기반으로 빠른 컴포넌트 `마운트 속도`
- ref를 기반으로 하여 다른 UI 라이브러리와 `호환성`이 좋다

### 단점
- 라이브러리이므로 `외부 의존도`가 높아진다.
- 사용법을 익히는 `시간`이 필요하다.

## 🙌 프로젝트에 적용 시 이점
Controlled 방식과 react-hook-form 방식 비교

### 1. 필드 등록 & 실시간 작업 처리
- Controlled : useState 사용  
   
  Controlled 방식을 사용했을 때 필요한 state 목록 :
    - `values` : 폼 입력값을 관리하는 state 변수 ( Object : { email: "", password: "", passwordConfirm: "" } )
    - `erros` : 에러 메세지를 관리하는 state 변수 ( Object )
    - `successes` : 성공 메세지를 관리하는 state 변수 ( Object )
    - `isValid` : 유효한 폼인지 판단하는 state 변수 ( Boolean )
    - `cursor` : 커서 상태를 관리하는 state 변수 ( String : "not-allowed"|"pointer"|"wait" )
- react-hook-form : `register`, `watch` 함수 사용
  - `register` 함수로 관리할 필드 등록
  - `useForm`의 옵션 `mode: "onChange"` 와 `watch` 함수 이용하여 실시간 작업 처리

### 2. input 이벤트 핸들러
- Controlled : 이벤트 핸들러 등록하고 input 태그에 연결  
    ```jsx
    const onChange = (event) => {
        const { name, value } = event.target;
        setValues((prev) => ({ ...prev, [name]: value }));
        validValues(name, value);
    };

    <input type="email" name="email" onChange={onChangeForm} placeholder="이메일" />
      ```
- react-hook-form : `register` 함수 사용 (필드 등록과 이벤트 핸들러 연결, 유효성 검사까지 한 번에!)  
    ```jsx
    const emailRegister = register("email", {
      required: "이메일을 입력해주세요.",
      pattern: {
        value:
          /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i,
        message: "이메일 양식을 확인해주세요.",
      },
    });

    <input type="email" placeholder="이메일" {...emailRegister} />
    ```


### 3. 유효성 검사 ( + 에러 메세지, 성공 메세지 )
- Controlled : 유효성 검사 함수 작성하고 에러, 성공 메세지 state 변수 깂 update  
    ```jsx
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
         // 생략...
      }
    };
    ```
- react-hook-form : `register` 에 유효성 검사와 에러 메세지도 포함 (위 코드 참고)
 
 
### 4. 버튼 활성화 변경
#### case 1 : 유효성 검사에 따른 버튼 활성화
- Controlled : 버튼 활성화 상태를 관리하는 state 변수 사용, 성공 메세지가 모두 있어야 (유효성 검사가 완료되어야) 버튼 활성화
    ```jsx
    const [isValid, setIsValid] = useState(false);

    useEffect(() => {
      if (successes.email && successes.password && successes.passwordConfirm) {
        setIsValid(true);
        setCursor("pointer");
      } else {
        setIsValid(false);
        setCursor("not-allowed");
      }
    }, [successes]);

    <BasicButton size={"full"} shape={"default"} variant={"primary"} cursor={cursor} disabled={!isValid}>회원가입</BasicButton>
    ```
- react-hook-form : '제출' 버튼 클릭 시 등록 된 요소들을 유효성 검사 후 통과하지 못한 요소에 focus, 유효성 검사를 통과하지 못하면 onSubmit 실행 안함

#### case 2 : 폼 제출 시 버튼 비활성화
폼 제출 시에는 중복 제출을 막기 위해 버튼 비활성화
- Controlled : 폼 전송 시작 시점에 비활성으로 상태 변경, 백엔드 통신 처리 완료 후 활성으로 상태 변경  

    ```jsx
    const onSubmitSignup = async (e) => {
      e.preventDefault();
      setIsValid(false);
      setCursor("wait");
      try {
        // ...
        // 통신 부분 생략 
        // ...
        setIsValid(true);
        setCursor("pointer");
      } catch (error) {
        toastMessage(error, toast.error);
      }
    };
    ```
    
- react-hook-form : 폼 전송 중에 `isSubmitting` 속성 이용하여 버튼 비활성화

    ```jsx
  const onSubmitSignup = async (data) => {
      try {
          // ...
          // 통신 부분 생략 
          // ...
      } catch(error) {
        toastMessage(error, toast.error);
      }
  };
    
  <BasicButton
    size={"full"}
    shape={"default"}
    variant={"primary"}
    cursor={"pointer"}
    disabled={isSubmitting}
  >
    회원가입
  </BasicButton>
    ```

### 정리 :
|   |Controlled Form|React Hook Form|
|:---|:---|:---|
|필드 등록|useState|register|
|실시간 작업 처리|useState|watch|
|input 이벤트 핸들러|이벤트 핸들러 등록|register|
|유효성 검사|유효성 검사 함수|register|
|에러 메세지 관리|useState|register, setError, clearErrors|
|성공 메세지 관리|useState| 🤔 못찾음 |
|폼 상태 관리|useState|formState|
|폼 전송 함수|폼 전송 함수 등록|handleSubmit|

### 느낀점
react-hook-form 라이브러리를 쓰기 전에  
useInputs Custom Hook을 만듬으로써 필드 등록과 이벤트 핸들러 등록은 최적화를 한 것 같은데 (당연함 강사님이 만든 소스임 🤭)  
유효성 검사부터 버튼 활성화 처리 부분은 소스가 점점 지저분해진다는 느낌을 받았다..  

react-hook-form 라이브러리를 사용함으로써  
직접 구현하는것 보다 빠른 시간 내에 완성도 높은 폼을 만들어 낼 수 있고  
state 변수를 여러개 등록하지 않아도 되어 코드가 깔끔해진다는 장점이 있다.  

기본적인 동작 외에 조금 더 심화된 동작을 구현하려면 API 목록을 많이 찾아봐야 하는 것은 단점인 것 같다.

컴포넌트 마운트 속도 향상와 리랜더링 감소는 체감하지 못했다.  

## 📚 Reference
- [Uncontrolled vs. Controlled Component in React](https://soldonii.tistory.com/145)  
- [입력을 다루는 다양한 방법](https://so-so.dev/react/form-handling/)
- [깔끔한 폼 개발과 정시퇴근을 위하여 react-hook-form](https://dealicious-inc.github.io/2022/07/25/ss-studio.html)
