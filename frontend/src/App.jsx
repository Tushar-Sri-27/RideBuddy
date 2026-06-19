import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CursorCar from './components/CursorCar';
import EcoCounter from './components/EcoCounter';
import { FloatingLeaves } from './components/Confetti';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import CreateRide from './pages/CreateRide';
import SearchRides from './pages/SearchRides';
import MyRides from './pages/MyRides';
import Profile from './pages/Profile';
import './App.css';

function App() {
  return (
    <Router>
      <div className="rb-app">
        <CursorCar />
        <EcoCounter />
        <FloatingLeaves />
        <Navbar />
        <div className="rb-page-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/create-ride" element={<CreateRide />} />
            <Route path="/search" element={<SearchRides />} />
            <Route path="/my-rides" element={<MyRides />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
