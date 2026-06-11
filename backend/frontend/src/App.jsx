import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import SeniorList from "./pages/SeniorList";
import SeniorProfile from "./pages/SeniorProfile";
import RequestGuidance from "./pages/RequestGuidance";
import MyRequests from "./pages/MyRequests";

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
      </Routes>
    </BrowserRouter>
  );
}

export default App;