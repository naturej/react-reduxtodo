import { useTodoStore } from "context/todo";
import OneTodo from "./one-todo";

const TodoList = () => {
  const [todoList, dispatch] = useTodoStore();

  return (
    <>
      {todoList.map((todo) => (
        <OneTodo key={todo.id} todo={todo} />
      ))}
    </>
  );
};
export default TodoList;
