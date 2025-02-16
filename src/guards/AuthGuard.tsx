import { useSelector } from "react-redux";
import { RootState } from "../Redux/store";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const AuthGuard = () => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  const location = useLocation();

  return isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default AuthGuard;
