import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Admin from "./pages/Admin"
import BusResults from "./pages/BusResults";
import Cancellation from "./pages/Cancellation";
import Feedback from "./pages/Feedback";
import Gallery from "./pages/Gallery";
import StatusCheck from "./pages/StatusCheck";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/bus-results" element={<BusResults />} />
        <Route path="/cancellation" element={<Cancellation />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/status-check" element={<StatusCheck />} />
        <Route path="*" element={<h2>404 Page Not Found</h2>} />
      </Routes>
    </Router>
  );
}


export default App;