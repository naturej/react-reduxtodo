import { RouterProvider } from "react-router-dom";
import router from "./routes/routing";
import { ThemeProvider } from "styled-components";
import theme, { toastOption } from "./styles/theme";
import GlobalStyles from "./styles/global";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TodoStoreProvider from "context/todo";

function App() {
  return (
    <TodoStoreProvider>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <RouterProvider router={router} />
        <ToastContainer {...toastOption} />
      </ThemeProvider>
    </TodoStoreProvider>
  );
}

export default App;
