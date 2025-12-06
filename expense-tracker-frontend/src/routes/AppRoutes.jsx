import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from '../pages/Navbar';
import Footer from '../pages/Footer';
// import Login from "../pages/Login";
import Home from '../pages/Home';
import Signup from "../features/auth/Signup";
import Auth from "../features/auth/Auth";
import ForgotPassword from "../features/auth/ForgotPassword";
import ResetPassword from "../features/auth/ResetPassword";
import UpdateProfile from "../pages/Profile";
import Dashboard from "../pages/Dashboard";
import Transaction from "../pages/Transaction";
import Test from "../pages/Test";
import CloudinaryTest from "../pages/Test";

const AppRoutes = () => {
  return (
    <>
    <BrowserRouter>
    <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Auth flag={false}/>} />
        <Route path="/login" element={<Auth flag={true}/>} />
        <Route path="/forgotpass" element={<ForgotPassword />} />
        <Route path="/resetpass" element={<ResetPassword />} />
        <Route path="/profile" element={<UpdateProfile />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/transaction" element={<Transaction />} />
      </Routes>
    <Footer/>
    </BrowserRouter>
    </>
  );
}
export default AppRoutes;