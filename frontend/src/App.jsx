// App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import NewsDetails from "./pages/NewsDetails";
import India from "./pages/India";
import Sport from "./pages/Sport";
import International from "./pages/International";
import Drama from "./pages/Drama";
import Healthcare from "./pages/Healthcare";
import ProtectedRoute from "./components/ProtectedRoute";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Admin from "./admin/Admin";
import ProtectedAdminRoute from "./components/ProtectedAdminRoute";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/all" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/admin-panel"
          element={
            <ProtectedAdminRoute>
              <Admin />
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="/news/:id"
          element={
            <ProtectedRoute>
              <NewsDetails />
            </ProtectedRoute>
          }
        />
        <Route
          path="/india"
          element={
            <ProtectedRoute>
              <India />
            </ProtectedRoute>
          }
        />
        <Route
          path="/sports"
          element={
            <ProtectedRoute>
              <Sport />
            </ProtectedRoute>
          }
        />
        <Route
          path="/international"
          element={
            <ProtectedRoute>
              <International />
            </ProtectedRoute>
          }
        />
        <Route
          path="/drama"
          element={
            <ProtectedRoute>
              <Drama />
            </ProtectedRoute>
          }
        />
        <Route
          path="/healthcare"
          element={
            <ProtectedRoute>
              <Healthcare />
            </ProtectedRoute>
          }
        />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
