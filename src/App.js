import { RouterProvider } from "react-router-dom";
import router from "./routes/routing";
import { ThemeProvider } from "styled-components";
import theme, { toastOption } from "./styles/theme";
import GlobalStyles from "./styles/global";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "react-redux";
import { store } from "store/store";

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <RouterProvider router={router} />
        <ToastContainer {...toastOption} />
      </ThemeProvider>
    </Provider>
  );
}

export default App;
