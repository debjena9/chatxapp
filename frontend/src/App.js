import { HashRouter as Router, Routes, Route } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from "./AuthContext";
import Register from "./pages/users/Register";
import Login from "./pages/users/Login";
import Profile from "./pages/users/Profile";
import PrivateRoute from "./PrivateRoute";
import ChatLayout from "./pages/layouts/ChatLayout";
import NavBar from "./pages/layouts/NavBar";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <AuthProvider>
      <Router>
        <NavBar />
        <Routes>
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/login" element={<Login />} />
          <Route
            exact
            path="/profile"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />
          <Route
            exact
            path="/"
            element={
              <PrivateRoute>
                <ChatLayout />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
      <ToastContainer />
    </AuthProvider>
  );
}

export default App;
