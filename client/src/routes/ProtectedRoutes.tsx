import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../stores/store";

export function ProtectedRoutes() {
  const isAuthenticated = useAppSelector((root) => root.auth.isAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to="/sign-in" replace />;
  }

  return <Outlet />;
}
