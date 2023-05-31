import { createBrowserRouter } from "react-router-dom";
import MainPage from "@pages/main";
import TodoPage from "@pages/todo";
import Layout from "@components/Layout";
import ReactHookForm from "@pages/reactHookForm";

const router = createBrowserRouter(
  [
    {
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <MainPage />,
        },
        {
          path: "/react-hook-form",
          element: <ReactHookForm />,
        },
        {
          path: "/todo/:todoId",
          element: <TodoPage />,
        },
      ],
    },
  ],
  {
    basename: process.env.PUBLIC_URL,
  }
);
export default router;
