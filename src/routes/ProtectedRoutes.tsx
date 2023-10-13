import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoutes({
  user,
  redirectPath = "/",
  children,
}: {
  user: any;
  redirectPath?: string;
  children?: JSX.Element;
}) {
  if (!user) {
    return <Navigate to={redirectPath} replace />;
  }

  return children ? children : <Outlet />;
}

export default ProtectedRoutes;
