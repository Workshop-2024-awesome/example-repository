import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Authentication } from "../routes/Authentication";
import { ProtectedRoutes } from "../routes/ProtectedRoutes";
import { Toaster } from "react-hot-toast";
import { BOOT_STATE, startAppInitialization } from "../stores/ui/uiSlice";
import { ErrorElement } from "../routes/ErrorElement";
import { RootState, useAppDispatch, useAppSelector } from "../stores/store";
import { useEffect } from "react";
import { Profile } from "../routes/Profile";

const router = createBrowserRouter([
  { path: "/sign-in", element: <Authentication /> },
  {
    path: "/",
    element: <ProtectedRoutes />,
    errorElement: <ErrorElement />,
    children: [
      { path: "/", element: <Profile /> },
    ],
  },
]);

export function Router() {
  const dispatch = useAppDispatch();
  const bootState = useAppSelector((root: RootState) => root.ui.bootState);

  useEffect(() => {
    dispatch(startAppInitialization());
  }, []);

  return (
    <div className="flex w-full h-svh max-h-svh bg-cover bg-center bg-fixed bg-[url('https://images.unsplash.com/photo-1594905666013-8f11171b8d6d?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')]">
      {bootState === BOOT_STATE.INIT && (
        <p className="text-white">Initialization...</p>
      )}
      {bootState === BOOT_STATE.READY && <RouterProvider router={router} />}
      {bootState === BOOT_STATE.ERROR && (
        <p className="text-white">Error! Please reload</p>
      )}
      <Toaster
        position="top-right"
        toastOptions={{ className: "bg-red-300 text-white p-4" }}
      />
    </div>
  );
}
