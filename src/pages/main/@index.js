import { useNavigate } from "react-router-dom";

const MainPage = () => {
  const navigate = useNavigate();

  const onClickNavigateTodo = () => {
    navigate("/todo/3");
  };

  return (
    <>
      <h1>Main Page</h1>
      <div>Hello, nature :)</div>
      <button onClick={onClickNavigateTodo}>Todo Page로 이동</button>
    </>
  );
};

export default MainPage;
