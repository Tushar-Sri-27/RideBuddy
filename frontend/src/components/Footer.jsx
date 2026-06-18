import { Link } from 'react-router-dom';
import './Footer.css';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="rb-footer">
      <div className="container">
        {/* Top Section */}
        <div className="row g-4 rb-footer-top">
          {/* Brand */}
          <div className="col-lg-4 col-md-6">
            <div className="rb-footer-brand">
              <div className="rb-brand">
                <span className="rb-brand-icon">
                  <i className="bi bi-car-front-fill"></i>
                </span>
                <span className="rb-brand-text">
                  Ride<span className="rb-brand-highlight">Buddy</span>
                </span>
              </div>
              <p className="rb-footer-tagline">
                Share rides, split costs, and make your daily commute more social and affordable.
              </p>
              <div className="rb-footer-socials">
                <a href="#" className="rb-social-link" aria-label="Twitter">
                  <i className="bi bi-twitter-x"></i>
                </a>
                <a href="#" className="rb-social-link" aria-label="Instagram">
                  <i className="bi bi-instagram"></i>
                </a>
                <a href="#" className="rb-social-link" aria-label="LinkedIn">
                  <i className="bi bi-linkedin"></i>
                </a>
                <a href="#" className="rb-social-link" aria-label="GitHub">
                  <i className="bi bi-github"></i>
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-lg-2 col-md-3 col-6">
            <h6 className="rb-footer-heading">Explore</h6>
            <ul className="rb-footer-links">
              <li><Link to="/search">Find Rides</Link></li>
              <li><Link to="/create-ride">Offer a Ride</Link></li>
              <li><Link to="/dashboard">Dashboard</Link></li>
              <li><Link to="/my-rides">My Rides</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div className="col-lg-2 col-md-3 col-6">
            <h6 className="rb-footer-heading">Company</h6>
            <ul className="rb-footer-links">
              <li><a href="#">About Us</a></li>
              <li><a href="#">Careers</a></li>
              <li><a href="#">Blog</a></li>
              <li><a href="#">Contact</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div className="col-lg-2 col-md-6 col-6">
            <h6 className="rb-footer-heading">Legal</h6>
            <ul className="rb-footer-links">
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Terms of Service</a></li>
              <li><a href="#">Cookie Policy</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="col-lg-2 col-md-6 col-6">
            <h6 className="rb-footer-heading">Contact</h6>
            <ul className="rb-footer-links rb-footer-contact">
              <li>
                <i className="bi bi-envelope me-2"></i>
                hello@ridebuddy.app
              </li>
              <li>
                <i className="bi bi-geo-alt me-2"></i>
                Bengaluru, India
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <hr className="rb-footer-divider" />

        {/* Bottom */}
        <div className="rb-footer-bottom">
          <p className="rb-footer-copy">
            &copy; {currentYear} RideBuddy. Made with
            <i className="bi bi-heart-fill rb-heart"></i>
            for commuters everywhere.
          </p>
          <p className="rb-footer-credits">
            Designed &amp; Built as an MVP Project
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
