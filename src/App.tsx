import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";

export default function App() {
  // Basit auth kontrolü (istersen kaldırırız)
  const isLoggedIn = !!localStorage.getItem("trusbe_user");

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={isLoggedIn ? <Home /> : <Navigate to="/login" replace />}
        />
      </Routes>
    </BrowserRouter>
  );
}