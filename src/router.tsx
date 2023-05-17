import {
  RouteObject,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import App from "./App";
import { Login } from "./login";
import { Canvas } from "@react-three/fiber";
import { NotFound } from "./404";
import { useLogin } from "./auth-provider";

const commonRoutes: RouteObject[] = [
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

const routes: RouteObject[] = [
  {
    path: "/",
    element: (
      <Canvas gl={{ antialias: true }}>
        <App />
      </Canvas>
    ),
  },
];

export const Router = () => {
  const { currentUser } = useLogin();
  const getRoutes = () => {
    if (currentUser) {
      return [...commonRoutes, ...routes];
    }

    return commonRoutes;
  };

  const router = createBrowserRouter(getRoutes());

  return <RouterProvider router={router} />;
};
