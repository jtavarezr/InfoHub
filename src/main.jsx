import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./routes/root";
import ErrorPage from "./error-page";
import LoginForm from "./routes/Login";
import TestConnection from "./routes/TestConnection";
import CreatePost from "./routes/CreatePost";
import Card from "./routes/Card";
import ReadFeeds from "./views/Feeds";
import UpdatePost from "./routes/UpdatePost";
import AuthProvider from "./auth/AuthProvider";
import Tags from "./utils/Tags";
import CodeOfConduct from "./utils/CodeOfConduct";
import About from "./utils/About";
import YouTubeVideoCard from "./utils/YouTubeVideoCard";
import Register from "./auth/Register";
import UserList from "./auth/UserList";
import UserInfo from "./auth/UserInfo";
import DashBoard from "./utils/DashBoard";
import Account from "./auth/Account";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/test", element: <TestConnection /> },
      { path: "/new", element: <CreatePost /> },
      { path: "/card", element: <Card /> },
      { path: "/all", element: <ReadFeeds /> },
      { path: "/update/:id", element: <UpdatePost /> },
      { path: "/lists", element: <UserList /> },
      { path: "/videos", element: <YouTubeVideoCard /> },
      { path: "/conducts", element: <CodeOfConduct /> },
      { path: "/about", element: <About /> },
      { path: "/dashboard", element: <DashBoard /> },
      { path: "/topics", element: <Tags /> },
      { path: "/Account", element: <UserInfo /> },
      { path: "/loged", element: <div>Welcome</div> },
      { path: "/profile", element: <h1>Loading Profile...</h1> },
      {path: "/notifications",
        element: (
          <div>
            <div className="alert alert-success" role="alert">
              <h4 className="alert-heading">Well done!</h4>
              <p>
                Aww yeah, you successfully read this important alert message.
                This example text is going to run a bit longer so that you can
                see how spacing within an alert works with this kind of content.
              </p>
              <p className="mb-0">
                Whenever you need to, be sure to use margin utilities to keep
                things nice and tidy.
              </p>
            </div>{" "}
          </div>
        ),
      },

      {
        path: "/groups",
        element: (
          <div>
            <h1>Groups...</h1>
          </div>
        ),
      },
    ],
  },
  { path: "/register", element: <Register /> },
  { path: "/login", element: <LoginForm /> },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
