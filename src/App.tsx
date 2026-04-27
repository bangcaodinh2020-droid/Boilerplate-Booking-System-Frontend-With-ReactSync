
import './App.css'

import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Error from "./pages/Error";
import BookingEditor from "./pages/BookingEdit";
import BookingDetail from "./pages/BookingDetail";
import Accommodations from "./pages/Accommodations";
import AccommodationsDetail from "./pages/AccommodationsDetail";
import Bookings from "./pages/Bookings";
import Login from "./pages/Login";
import SignUp from "./pages/Signup";

import {BaseApp} from "@bangcao2020/reactsync";
import About from './pages/About';
import BookingNew from './pages/BookingNew';


export  class CampingSite extends BaseApp {
 
  render(){
  return (
  <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/index" element={<Home />} />
      <Route path="/bookings" element={<Bookings />} />
      <Route path="/newbooking" element={<BookingNew />} />
      <Route path="/newbooking/:id" element={<BookingNew />} />
      <Route path="/editbooking/:id" element={<BookingEditor />} />
      <Route path="/bookingdetail/:id" element={<BookingDetail />} />
      <Route path="/accommodations" element={<Accommodations />} />
      <Route path="/accommodationdetail/:id" element={<AccommodationsDetail />} />
      <Route path="/about" element={<About />} />
      <Route path="/login" element={<Login />} />
      <Route path="/logout" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/*" element={<Error />} />
    </Routes>
  );
}
}

//export default App
