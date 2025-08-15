import { createBrowserRouter } from "react-router-dom";
import { HomePage, ChatPage, NotFoundPage } from "@pages/";
import { NavLayout } from "./navlayout";
import { PATHS } from "@shared/const";



export const router = createBrowserRouter([
  {
    element: <NavLayout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: PATHS.home,
        element: <HomePage />,
      },
      {
        path: PATHS.chat+ "/:id",
        element: <ChatPage />,
      },
      {
        path: "*",
        element: <NotFoundPage />,
      }
    ],
  },
]);
