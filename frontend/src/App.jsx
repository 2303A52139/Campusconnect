import {
  BrowserRouter,
  Routes,
  Route,
  Link,
} from "react-router-dom";

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

import AdminRoutes from "./routes/AdminRoutes";

import "./App.css";
// import { BrowserRouter } from "react-router-dom";


function App() {
  return (
    <BrowserRouter>
  <div className="app-container">
    <div className="navbar">
      <h1>CampusConnect</h1>

      <div className="nav-links">
        <Link to="/">Home</Link>

        <Link to="/chat">Chat</Link>

        <Link to="/notifications">
          Notifications
        </Link>

        <Link to="/saved-seniors">
          Saved Seniors
        </Link>

        <Link to="/login">Login</Link>

        <Link to="/register">
          Register
        </Link>

        <Link to="/profile">
          Profile
        </Link>
      </div>
    </div>

    <Routes>
      <Route path="/" element={<Home />} />

      <Route
        path="/chat"
        element={<ChatPage />}
      />

      <Route
        path="/notifications"
        element={<NotificationsPage />}
      />

      <Route
        path="/saved-seniors"
        element={<SavedSeniorPage />}
      />

      <Route
        path="/login"
        element={<Login />}
      />

      <Route
        path="/register"
        element={<Register />}
      />

      <Route
        path="/profile"
        element={<Profile />}
      />

      <Route
        path="/seniors"
        element={<SeniorList />}
      />

      <Route
        path="/seniors/:id"
        element={<SeniorProfile />}
      />

      <Route
        path="/request/:id"
        element={<RequestGuidance />}
      />

      <Route
        path="/my-requests"
        element={<MyRequests />}
      />

      <Route
        path="/request-stats"
        element={<RequestStats />}
      />
      <Route
        path="/admin/*"
        element={<AdminRoutes />}
      />
    </Routes>
  </div>
  </BrowserRouter>
  );
}

export default App;