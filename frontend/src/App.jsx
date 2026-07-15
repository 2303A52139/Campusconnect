import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { UserProvider, useUser } from "./context/UserContext";

import ChatPage from "./pages/ChatPage";
import NotificationsPage from "./pages/NotificationsPage";
import SavedSeniorPage from "./pages/SavedSeniorPage";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import SeniorList from "./pages/SeniorList";
import SeniorProfile from "./pages/SeniorProfile";
import RequestGuidance from "./pages/RequestGuidance";
import MyRequests from "./pages/MyRequests";
import RequestStats from "./pages/RequestStats";
import SeniorRequests from "./pages/SeniorRequests";

import AdminRoutes from "./routes/AdminRoutes";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";
import ErrorBoundary from "./components/ErrorBoundary";

function AppShell({ children }) {
  const { user, logout } = useUser();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <header className="sticky top-0 z-40 border-b border-white/10 bg-slate-950/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
          <Link to="/" className="text-xl font-bold tracking-tight text-white">
            CampusConnect
          </Link>

          <nav className="flex flex-wrap items-center gap-2 text-sm">
            <Link className="rounded-full px-3 py-2 hover:bg-white/10" to="/seniors">
              Seniors
            </Link>
            <Link className="rounded-full px-3 py-2 hover:bg-white/10" to="/my-requests">
              My Requests
            </Link>
            {user?.role === "senior" && (
              <Link className="rounded-full px-3 py-2 hover:bg-white/10" to="/senior-requests">
                Incoming Requests
              </Link>
            )}
            <Link className="rounded-full px-3 py-2 hover:bg-white/10" to="/notifications">
              Notifications
            </Link>
            <Link className="rounded-full px-3 py-2 hover:bg-white/10" to="/saved-seniors">
              Saved
            </Link>
            <Link className="rounded-full px-3 py-2 hover:bg-white/10" to="/profile">
              Profile
            </Link>
            <Link className="rounded-full px-3 py-2 hover:bg-white/10" to="/request-stats">
              Stats
            </Link>
            <Link className="rounded-full px-3 py-2 hover:bg-white/10" to="/admin">
              Admin
            </Link>

            {!user ? (
              <>
                <Link
                  className="rounded-full bg-brand-500 px-4 py-2 font-medium text-white hover:bg-brand-400"
                  to="/login"
                >
                  Login
                </Link>
                <Link
                  className="rounded-full border border-white/15 px-4 py-2 font-medium hover:bg-white/10"
                  to="/register"
                >
                  Register
                </Link>
              </>
            ) : (
              <button
                onClick={logout}
                className="rounded-full border border-white/15 px-4 py-2 font-medium hover:bg-white/10"
              >
                Logout
              </button>
            )}
          </nav>
        </div>
      </header>

      <main className="mx-auto w-full max-w-7xl px-4 py-8">{children}</main>
    </div>
  );
}

function AppContent() {
  return (
    <AppShell>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/seniors" element={<SeniorList />} />
        <Route path="/seniors/:id" element={<SeniorProfile />} />

        <Route
          path="/chat/:conversationId"
          element={
            <ProtectedRoute>
              <ChatPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/notifications"
          element={
            <ProtectedRoute>
              <NotificationsPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/saved-seniors"
          element={
            <ProtectedRoute>
              <SavedSeniorPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/request/:id"
          element={
            <ProtectedRoute>
              <RequestGuidance />
            </ProtectedRoute>
          }
        />

        <Route
          path="/my-requests"
          element={
            <ProtectedRoute>
              <MyRequests />
            </ProtectedRoute>
          }
        />

        <Route
          path="/request-stats"
          element={
            <ProtectedRoute>
              <RequestStats />
            </ProtectedRoute>
          }
        />

        <Route
          path="/senior-requests"
          element={
            <ProtectedRoute>
              <SeniorRequests />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/*"
          element={
            <AdminRoute>
              <AdminRoutes />
            </AdminRoute>
          }
        />
      </Routes>
    </AppShell>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <UserProvider>
          <AppContent />
        </UserProvider>
      </BrowserRouter>
    </ErrorBoundary>
  );
}