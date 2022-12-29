import { Route, Routes } from "react-router-dom";
import AdminOnlyRoute from "./components/AdminOnlyRoute";
import ProtectedRoute from "./components/ProtectedRoute";
import UserOnlyRoute from "./components/UserOnlyRoute";
import Animal from "./pages/Animal";
import Animals from "./pages/Animals";
import Contact from "./pages/Contact";
import Events from "./pages/Events";
import Home from "./pages/Home";
import Notifications from "./pages/Notifications";
import Profile from "./pages/Profile";
import Requests from "./pages/Requests";
import Tickets from "./pages/Tickets";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route
        path="/tickets"
        element={
          <UserOnlyRoute>
            <Tickets />
          </UserOnlyRoute>
        }
      ></Route>
      <Route
        path="/events"
        element={
          <UserOnlyRoute>
            <Events />
          </UserOnlyRoute>
        }
      ></Route>
      <Route path="/animals" element={<Animals />}></Route>
      <Route path="/animals/:page" element={<Animals />}></Route>
      <Route
        path="/animal/:id"
        element={
          <UserOnlyRoute>
            <Animal />
          </UserOnlyRoute>
        }
      ></Route>
      <Route
        path="/contact"
        element={
          <UserOnlyRoute>
            <Contact />
          </UserOnlyRoute>
        }
      ></Route>
      <Route
        path="/profile"
        element={
          <ProtectedRoute adminAllowed>
            <Profile />
          </ProtectedRoute>
        }
      ></Route>
      <Route
        path="/notifications"
        element={
          <ProtectedRoute>
            <Notifications />
          </ProtectedRoute>
        }
      ></Route>
      <Route
        path="/requests"
        element={
          <AdminOnlyRoute>
            <Requests />
          </AdminOnlyRoute>
        }
      ></Route>
      <Route
        path="*"
        element={
          <h1 className="text-3xl text-center">There's nothing here: 404!</h1>
        }
      />
    </Routes>
  );
}

export default App;
