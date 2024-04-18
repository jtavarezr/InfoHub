import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./routes/root";
import ErrorPage from "./error-page";
import LoginForm from "./routes/Login";
import TestConnection from "./routes/TestConnection";
import CreatePost from "./routes/CreatePost";
import Card from "./routes/Card";
import ReadFeeds from "./routes/Feeds";
import UpdatePost from "./routes/UpdatePost";



const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/login",
        element: <LoginForm />,
      },
      {
        path: "/loged",
        element: <div>Welcome</div>,
      },
      {
        path: "/test",
        element: <TestConnection />,
      },
      {
        path: "/new",
        element: <CreatePost />,
      },
      {
        path: "/card",
        element: <Card />,
      },
      {
        path: "/all",
        element: <ReadFeeds />,
      },
      {
        path: "/update/:id",
        element: <UpdatePost />,
      },
    ],
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
