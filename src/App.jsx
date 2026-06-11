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
import ProtectedRoute from "./components/ProtectedRoute";
import "./App.css";
import OrderTracking from "./pages/OrderTracking";
import ChatWidget from "./components/ChatWidget";
import OwnerDashboard from "./pages/OwnerDashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/about" element={<About />} />
        <Route
  path="/order-tracking"
  element={<OrderTracking />}
/>
<Route
  path="/owner-dashboard"
  element={
    <ProtectedRoute>
      <OwnerDashboard />
    </ProtectedRoute>
  }
/>
        <Route path="/restaurants" element={<ProtectedRoute><Restaurants /></ProtectedRoute>} />
        <Route path="/restaurants/:id" element={<ProtectedRoute><RestaurantDetail /></ProtectedRoute>} />
        <Route path="/dine-out" element={<ProtectedRoute><DineOut /></ProtectedRoute>} />
        <Route path="/table-booking/:id" element={<ProtectedRoute><TableBooking /></ProtectedRoute>} />
        <Route path="/hotels" element={<ProtectedRoute><Hotels /></ProtectedRoute>} />
        <Route path="/hotels/:id" element={<ProtectedRoute><HotelDetail /></ProtectedRoute>} />
        <Route path="/room-booking/:hotelId/:roomId" element={<ProtectedRoute><RoomBooking /></ProtectedRoute>} />
        <Route path="/order/:id" element={<ProtectedRoute><OrderNow /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
      </Routes>
       <ChatWidget />
    </BrowserRouter>
  );
}

export default App;