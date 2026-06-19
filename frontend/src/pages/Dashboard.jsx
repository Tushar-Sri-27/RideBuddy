import { Link } from 'react-router-dom';
import ImpactBanner from '../components/ImpactBanner';
import StreakChallenge from '../components/StreakChallenge';
import Leaderboard from '../components/Leaderboard';
import './Dashboard.css';

// Dummy user
const user = {
  fullName: 'Rahul Verma',
  firstName: 'Rahul',
};

// Dummy stats
const stats = [
  { icon: 'bi-car-front-fill', label: 'Rides Created', value: 12, color: 'var(--rb-primary)' },
  { icon: 'bi-person-check-fill', label: 'Rides Joined', value: 8, color: 'var(--rb-green)' },
  { icon: 'bi-cash-stack', label: 'Money Saved', value: '₹3,450', color: 'var(--rb-amber)' },
  { icon: 'bi-star-fill', label: 'Your Rating', value: '4.9', color: '#7c3aed' },
];

// Dummy upcoming rides
const upcomingRides = [
  {
    id: 1,
    origin: 'Koramangala',
    destination: 'Whitefield',
    date: '2026-06-17',
    time: '09:00 AM',
    seats: 2,
    price: 80,
    vehicle: 'Car',
    creator: 'You',
    role: 'creator',
    passengers: 2,
  },
  {
    id: 2,
    origin: 'Indiranagar',
    destination: 'Electronic City',
    date: '2026-06-18',
    time: '08:30 AM',
    seats: 1,
    price: 120,
    vehicle: 'Car',
    creator: 'Sneha Reddy',
    role: 'passenger',
    passengers: 3,
  },
  {
    id: 3,
    origin: 'HSR Layout',
    destination: 'MG Road',
    date: '2026-06-19',
    time: '10:00 AM',
    seats: 3,
    price: 60,
    vehicle: 'Auto',
    creator: 'You',
    role: 'creator',
    passengers: 1,
  },
];

// Dummy recent requests
const recentRequests = [
  {
    id: 1,
    user: 'Priya Sharma',
    initials: 'PS',
    ride: 'Koramangala → Whitefield',
    time: '2 hours ago',
    status: 'pending',
  },
  {
    id: 2,
    user: 'Arjun Patel',
    initials: 'AP',
    ride: 'HSR Layout → MG Road',
    time: '5 hours ago',
    status: 'accepted',
  },
  {
    id: 3,
    user: 'Kavya Nair',
    initials: 'KN',
    ride: 'Koramangala → Whitefield',
    time: '1 day ago',
    status: 'rejected',
  },
];

function formatDate(dateStr) {
  const d = new Date(dateStr);
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  if (d.toDateString() === today.toDateString()) return 'Today';
  if (d.toDateString() === tomorrow.toDateString()) return 'Tomorrow';
  return d.toLocaleDateString('en-IN', { weekday: 'short', month: 'short', day: 'numeric' });
}

function Dashboard() {
  return (
    <main className="rb-dashboard">
      <div className="container">
        {/* ---------- Welcome Header ---------- */}
        <div className="rb-dash-header animate-fade-in-up">
          <div>
            <h1 className="rb-dash-greeting">
              Good {new Date().getHours() < 12 ? 'morning' : new Date().getHours() < 17 ? 'afternoon' : 'evening'}, {user.firstName}
              <span className="rb-wave">👋</span>
            </h1>
            <p className="rb-dash-subtitle">Here's what's happening with your rides</p>
          </div>
          <Link to="/create-ride" className="rb-btn-primary">
            <i className="bi bi-plus-lg"></i>
            Create Ride
          </Link>
        </div>

        {/* ---------- Stats Grid ---------- */}
        <div className="row g-3 mb-4">
          {stats.map((stat, i) => (
            <div key={i} className="col-6 col-lg-3">
              <div className="rb-stat-card animate-fade-in-up" style={{ animationDelay: `${0.1 + i * 0.07}s` }}>
                <div className="rb-stat-card-icon" style={{ background: `${stat.color}10`, color: stat.color }}>
                  <i className={`bi ${stat.icon}`}></i>
                </div>
                <div className="rb-stat-card-value">{stat.value}</div>
                <div className="rb-stat-card-label">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* ---------- Quick Actions ---------- */}
        <div className="row g-3 mb-4">
          {[
            { icon: 'bi-search', title: 'Find Rides', desc: 'Search available rides on your route', to: '/search', color: 'var(--rb-primary)' },
            { icon: 'bi-car-front', title: 'My Rides', desc: 'Manage rides you created or joined', to: '/my-rides', color: 'var(--rb-green)' },
            { icon: 'bi-person-circle', title: 'Profile', desc: 'View and edit your profile details', to: '/profile', color: '#7c3aed' },
          ].map((action, i) => (
            <div key={i} className="col-md-4">
              <Link to={action.to} className="rb-quick-action animate-fade-in-up" style={{ animationDelay: `${0.25 + i * 0.08}s` }}>
                <div className="rb-quick-icon" style={{ background: `${action.color}10`, color: action.color }}>
                  <i className={`bi ${action.icon}`}></i>
                </div>
                <div>
                  <h6 className="rb-quick-title">{action.title}</h6>
                  <p className="rb-quick-desc">{action.desc}</p>
                </div>
                <i className="bi bi-chevron-right rb-quick-arrow"></i>
              </Link>
            </div>
          ))}
        </div>

        {/* ---------- Streak & Challenges ---------- */}
        <div className="mb-4 animate-fade-in-up delay-2">
          <StreakChallenge streakDays={5} />
        </div>

        {/* ---------- Your Impact ---------- */}
        <div className="mb-4 animate-fade-in-up delay-2">
          <ImpactBanner variant="personal" size="compact" />
        </div>

        {/* ---------- Main Content Grid ---------- */}
        <div className="row g-4">
          {/* Upcoming Rides */}
          <div className="col-lg-8">
            <div className="rb-dash-section animate-fade-in-up delay-3">
              <div className="rb-dash-section-header">
                <h3 className="rb-dash-section-title">
                  <i className="bi bi-calendar-check me-2"></i>Upcoming Rides
                </h3>
                <Link to="/my-rides" className="rb-dash-view-all">
                  View all <i className="bi bi-arrow-right"></i>
                </Link>
              </div>

              {upcomingRides.length === 0 ? (
                <div className="rb-dash-empty">
                  <i className="bi bi-calendar-x"></i>
                  <p>No upcoming rides</p>
                  <Link to="/search" className="rb-btn-outline rb-btn-sm">Find a Ride</Link>
                </div>
              ) : (
                <div className="rb-ride-list">
                  {upcomingRides.map((ride) => (
                    <div key={ride.id} className="rb-ride-row">
                      <div className="rb-ride-route-col">
                        <div className="rb-ride-route-dots">
                          <span className="rb-dot rb-dot-green"></span>
                          <span className="rb-dot-line"></span>
                          <span className="rb-dot rb-dot-blue"></span>
                        </div>
                        <div>
                          <div className="rb-ride-origin">{ride.origin}</div>
                          <div className="rb-ride-dest">{ride.destination}</div>
                        </div>
                      </div>

                      <div className="rb-ride-meta-col">
                        <span className="rb-ride-meta-item">
                          <i className="bi bi-calendar3"></i>{formatDate(ride.date)}
                        </span>
                        <span className="rb-ride-meta-item">
                          <i className="bi bi-clock"></i>{ride.time}
                        </span>
                      </div>

                      <div className="rb-ride-info-col">
                        <span className="rb-ride-meta-item">
                          <i className="bi bi-people"></i>{ride.passengers}/{ride.passengers + ride.seats}
                        </span>
                        <span className="rb-ride-price">₹{ride.price}</span>
                      </div>

                      <div className="rb-ride-action-col">
                        <span className={`rb-role-badge rb-role-${ride.role}`}>
                          {ride.role === 'creator' ? 'Creator' : 'Passenger'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Recent Requests */}
          <div className="col-lg-4">
            <div className="rb-dash-section animate-fade-in-up delay-4">
              <div className="rb-dash-section-header">
                <h3 className="rb-dash-section-title">
                  <i className="bi bi-bell me-2"></i>Recent Requests
                </h3>
              </div>

              <div className="rb-request-list">
                {recentRequests.map((req) => (
                  <div key={req.id} className="rb-request-row">
                    <div className="rb-request-avatar">{req.initials}</div>
                    <div className="rb-request-info">
                      <div className="rb-request-user">{req.user}</div>
                      <div className="rb-request-ride">{req.ride}</div>
                      <div className="rb-request-time">{req.time}</div>
                    </div>
                    <span className={`rb-status-badge rb-status-${req.status}`}>
                      {req.status}
                    </span>
                  </div>
                ))}
              </div>

              <Link to="/my-rides" className="rb-dash-view-all rb-dash-view-all-bottom">
                Manage requests <i className="bi bi-arrow-right"></i>
              </Link>
            </div>
          </div>
        </div>

        {/* ---------- Leaderboard ---------- */}
        <div className="mt-4 animate-fade-in-up delay-4">
          <Leaderboard />
        </div>
      </div>
    </main>
  );
}

export default Dashboard;
