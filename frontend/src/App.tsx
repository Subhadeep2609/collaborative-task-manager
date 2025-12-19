import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider, useAuth } from "./context/auth.context";

function AppRoutes() {
  const { user, loading } = useAuth();

  // ⏳ Wait for auth check to finish
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        Checking authentication...
      </div>
    );
  }

  return (
    <Routes>
      {/* Public Home */}
      <Route
        path="/"
        element={user ? <Navigate to="/dashboard" /> : <Home />}
      />

      {/* Auth */}
      <Route
        path="/login"
        element={user ? <Navigate to="/dashboard" /> : <Login />}
      />
      <Route
        path="/register"
        element={user ? <Navigate to="/dashboard" /> : <Register />}
      />

      {/* Protected Dashboard */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}
