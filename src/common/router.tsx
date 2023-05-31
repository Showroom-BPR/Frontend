import {
  RouteObject,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import App from "../3d/scene";
import { Login } from "../auth/login";
import { NotFound } from "./404";
import { useLogin } from "../auth/auth-provider";
import { Products } from "../products/products";

const commonRoutes: RouteObject[] = [
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: <Products />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

const routes: RouteObject[] = [
  {
    path: "/view/:id",
    element: <App />,
  },
];

export const Router = () => {
  const { currentUser } = useLogin();
  const getRoutes = () => {
    // remove the ! on this to enable login-only access
    if (currentUser) {
      return [...commonRoutes, ...routes];
    }

    return commonRoutes;
  };

  const router = createBrowserRouter(getRoutes());

  return <RouterProvider router={router} />;
};
