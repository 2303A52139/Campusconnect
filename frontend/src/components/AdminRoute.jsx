import { Navigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

function AdminRoute({ children }) {
  const { user, loading } = useUser();

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (!user || user.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default AdminRoute;
