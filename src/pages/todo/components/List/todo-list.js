import styled from "styled-components";
import OneTodo from "./one-todo";
import { useSelector } from "react-redux";
import { flexCenter } from "@styles/common";

const TodoList = () => {
  const todoList = useSelector((state) => state.todo);

  return (
    <>
      {todoList.length > 0 ? (
        todoList.map((todo) => <OneTodo key={todo.id} todo={todo} />)
      ) : (
        <EmptyDiv>할 일이 없습니다.</EmptyDiv>
      )}
    </>
  );
};
export default TodoList;

const EmptyDiv = styled.div`
  ${flexCenter};
  padding: 15px;
`;
