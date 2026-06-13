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

import "./App.css";

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
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;