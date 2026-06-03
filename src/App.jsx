import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Restaurants from "./pages/Restaurants";
import RestaurantDetail from "./pages/RestaurantDetail";
import DineOut from "./pages/DineOut";
import TableBooking from "./pages/TableBooking";
import Profile from "./pages/Profile";
import About from "./pages/About";
import OrderNow from "./pages/OrderNow";
import ProtectedRoute from "./components/ProtectedRoute";
import "./App.css";
import OrderTracking from "./pages/OrderTracking";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/about" element={<About />} />
        <Route path="/restaurants" element={<ProtectedRoute><Restaurants /></ProtectedRoute>} />
        <Route path="/restaurants/:id" element={<ProtectedRoute><RestaurantDetail /></ProtectedRoute>} />
        <Route path="/dine-out" element={<ProtectedRoute><DineOut /></ProtectedRoute>} />
        <Route path="/table-booking/:id" element={<ProtectedRoute><TableBooking /></ProtectedRoute>} />
        <Route path="/order/:id" element={<ProtectedRoute><OrderNow /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="/order-tracking" element={
  <ProtectedRoute><OrderTracking /></ProtectedRoute>
} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;