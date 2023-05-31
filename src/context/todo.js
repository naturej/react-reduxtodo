import { actionType } from "consts/action";
import { createAction } from "utils/createAction";

const { createContext, useContext, useReducer } = require("react");

const initialValue = [
  {
    id: 1,
    title: "example1",
    content: "content1",
    state: false,
  },
  {
    id: 2,
    title: "example2",
    content: "content2",
    state: false,
  },
  {
    id: 3,
    title: "example3",
    content: "content3",
    state: false,
  },
];

export const useTodoStore = () => useContext(TodoStore);

const TodoStore = createContext();

export const ADD_TODO = createAction(actionType.ADD_TODO);
export const DELETE_TODO = createAction(actionType.DELETE_TODO);
export const UPDATE_TODO = createAction(actionType.UPDATE_TODO);
export const COMPLETE_TODO = createAction(actionType.COMPLETE_TODO);

const todoReducer = (state, action) => {
  switch (action.type) {
    case actionType.ADD_TODO:
      return [action.payload, ...state];
    case actionType.DELETE_TODO:
      return state.filter((todo) => todo.id !== action.payload);
    case actionType.UPDATE_TODO:
      return state.map((todo) =>
        todo.id === action.payload.id
          ? {
              ...todo,
              title: action.payload.title,
              content: action.payload.content,
            }
          : todo
      );
    case actionType.COMPLETE_TODO:
      return state.map((todo) =>
        todo.id === action.payload ? { ...todo, state: !todo.state } : todo
      );
    default:
      return state;
  }
};

const TodoStoreProvider = ({ children }) => {
  const [todoList, dispatch] = useReducer(todoReducer, initialValue);
  return (
    <TodoStore.Provider value={[todoList, dispatch]}>
      {/* */}
      {children}
    </TodoStore.Provider>
  );
};

export default TodoStoreProvider;
