import { Link, NavLink } from 'react-router-dom';
import { LevelBadge } from './LevelBadge';
import './Navbar.css';

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg rb-navbar fixed-top">
      <div className="container">
        <Link className="navbar-brand rb-brand" to="/">
          <span className="rb-brand-icon">
            <i className="bi bi-car-front-fill"></i>
          </span>
          <span className="rb-brand-text">
            Ride<span className="rb-brand-highlight">Buddy</span>
          </span>
        </Link>

        <button
          className="navbar-toggler rb-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="bi bi-list"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-lg-center gap-1">
            <li className="nav-item">
              <NavLink className="nav-link rb-nav-link" to="/" end>
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link rb-nav-link" to="/search">
                <i className="bi bi-search me-1"></i>Find Rides
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link rb-nav-link" to="/dashboard">
                Dashboard
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link rb-nav-link" to="/my-rides">
                My Rides
              </NavLink>
            </li>
          </ul>

          <div className="d-flex align-items-center gap-2 ms-lg-4 mt-3 mt-lg-0">
            <LevelBadge xp={450} />
            <Link to="/login" className="rb-btn-outline rb-btn-sm">
              Log In
            </Link>
            <Link to="/register" className="rb-btn-primary rb-btn-sm">
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
