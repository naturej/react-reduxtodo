const initialState = [
  {
    id: 1,
    title: "example1",
    content: "content1",
    state: false,
  },
];

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_TODO":
      return [action.payload, ...state];
    case "UPDATE_TODO":
      return state.map((todo) =>
        todo.id === action.payload.id
          ? {
              ...todo,
              title: action.payload.title,
              content: action.payload.content,
            }
          : todo
      );
    case "DELETE_TODO":
      return state.filter((todo) => todo.id !== action.payload);
    case "COMPLETE_TODO":
      return state.map((todo) =>
        todo.id === action.payload ? { ...todo, state: !todo.state } : todo
      );
    default:
      return state;
  }
};

export default reducer;
