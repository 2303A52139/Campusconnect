import { Routes, Route } from "react-router-dom";

import AdminLayout from "../components/AdminLayout";

import AdminDashboard from "../pages/AdminDashboard";
import UsersPage from "../pages/UsersPage";
import VerificationPage from "../pages/VerificationPage";
import CompaniesPage from "../pages/CompaniesPage";
import ReportsPage from "../pages/ReportsPage";

function AdminRoutes() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <AdminLayout>
            <AdminDashboard />
          </AdminLayout>
        }
      />

      <Route
        path="/users"
        element={
          <AdminLayout>
            <UsersPage />
          </AdminLayout>
        }
      />

      <Route
        path="/verification"
        element={
          <AdminLayout>
            <VerificationPage />
          </AdminLayout>
        }
      />

      <Route
        path="/companies"
        element={
          <AdminLayout>
            <CompaniesPage />
          </AdminLayout>
        }
      />

      <Route
        path="/reports"
        element={
          <AdminLayout>
            <ReportsPage />
          </AdminLayout>
        }
      />
    </Routes>
  );
}

export default AdminRoutes;