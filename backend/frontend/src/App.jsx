import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import SeniorList from "./pages/SeniorList";
import SeniorProfile from "./pages/SeniorProfile";
import RequestGuidance from "./pages/RequestGuidance";
import MyRequests from "./pages/MyRequests";
import RequestStats from "./pages/RequestStats";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
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
      </Routes>
    </BrowserRouter>
  );
}

export default App;