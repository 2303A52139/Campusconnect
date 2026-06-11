// // import NotificationsPage from "./pages/NotificationsPage";

// // function App() {
// //   return <NotificationsPage />;
// // }

// // export default App;

// import SavedSeniorPage from "./pages/SavedSeniorPage";

// function App() {
//   return <SavedSeniorPage />;
// }
// export default App;


// import {
//   BrowserRouter,
//   Routes,
//   Route,
//   Link,
// } from "react-router-dom";

// import ChatPage from "./pages/ChatPage";
// import NotificationsPage from "./pages/NotificationsPage";
// import SavedSeniorPage from "./pages/SavedSeniorPage";

// function App() {
//   return (
//     <BrowserRouter>
//       <div>
//         <h1>CampusConnect</h1>

//         <nav>
//           <Link to="/">
//             Chat
//           </Link>
//           {" | "}

//           <Link to="/notifications">
//             Notifications
//           </Link>
//           {" | "}

//           <Link to="/saved-seniors">
//             Saved Seniors
//           </Link>
//         </nav>

//         <hr />

//         <Routes>
//           <Route
//             path="/"
//             element={<ChatPage />}
//           />

//           <Route
//             path="/notifications"
//             element={
//               <NotificationsPage />
//             }
//           />

//           <Route
//             path="/saved-seniors"
//             element={
//               <SavedSeniorPage />
//             }
//           />
//         </Routes>
//       </div>
//     </BrowserRouter>
//   );
// }

// export default App;

import {
  BrowserRouter,
  Routes,
  Route,
  Link,
} from "react-router-dom";

import ChatPage from "./pages/ChatPage";
import NotificationsPage from "./pages/NotificationsPage";
import SavedSeniorPage from "./pages/SavedSeniorPage";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <div className="navbar">
          <h1>CampusConnect</h1>

          <div className="nav-links">
            <Link to="/">Chat</Link>

            <Link to="/notifications">
              Notifications
            </Link>

            <Link to="/saved-seniors">
              Saved Seniors
            </Link>
          </div>
        </div>

        <Routes>
          <Route
            path="/"
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
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;