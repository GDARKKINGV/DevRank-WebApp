import { useAuth } from "./context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";
import Loader from "./components/Loader";

export default function ProtectedRoute() {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return <Loader />;

  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return (
    <div className="mt-20">
      <Outlet />
    </div>
  );
}
