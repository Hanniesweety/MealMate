import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Restaurants from "./pages/Restaurants";
import RestaurantDetail from "./pages/RestaurantDetail";
import DineOut from "./pages/DineOut";
import TableBooking from "./pages/TableBooking";
import Hotels from "./pages/Hotels";
import HotelDetail from "./pages/HotelDetail";
import RoomBooking from "./pages/RoomBooking";
import Profile from "./pages/Profile";
import About from "./pages/About";
import OrderNow from "./pages/OrderNow";
import OrderTracking from "./pages/OrderTracking";
import OwnerDashboard from "./pages/OwnerDashboard";
import ChatWidget from "./components/ChatWidget";
import ProtectedRoute from "./components/ProtectedRoute";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/about" element={<About />} />

        {/* Protected Routes */}
        <Route path="/restaurants" element={<ProtectedRoute><Restaurants /></ProtectedRoute>} />
        <Route path="/restaurants/:id" element={<ProtectedRoute><RestaurantDetail /></ProtectedRoute>} />
        <Route path="/dine-out" element={<ProtectedRoute><DineOut /></ProtectedRoute>} />
        <Route path="/table-booking/:id" element={<ProtectedRoute><TableBooking /></ProtectedRoute>} />
        <Route path="/hotels" element={<ProtectedRoute><Hotels /></ProtectedRoute>} />
        <Route path="/hotels/:id" element={<ProtectedRoute><HotelDetail /></ProtectedRoute>} />
        <Route path="/room-booking/:hotelId/:roomId" element={<ProtectedRoute><RoomBooking /></ProtectedRoute>} />
        <Route path="/order/:id" element={<ProtectedRoute><OrderNow /></ProtectedRoute>} />

        {/* ✅ Fix — :orderId param add panninom */}
        <Route path="/order-tracking/:orderId" element={<ProtectedRoute><OrderTracking /></ProtectedRoute>} />

        <Route path="/owner-dashboard" element={<ProtectedRoute><OwnerDashboard /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
      </Routes>

      {/* ChatWidget outside Routes — every page-la show aagum */}
      <ChatWidget />
    </BrowserRouter>
  );
}

export default App;