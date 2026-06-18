import { useState } from 'react';
import { Link } from 'react-router-dom';
import ImpactBanner from '../components/ImpactBanner';
import './MyRides.css';

const vehicleEmoji = { Car: '🚗', SUV: '🚙', Bike: '🏍️', Auto: '🛺' };

// Dummy created rides
const createdRides = [
  {
    id: 1, origin: 'Koramangala', destination: 'Whitefield',
    date: '2026-06-19', time: '09:00 AM', seats: 2, filled: 1, price: 80,
    vehicle: 'Car', status: 'active',
    requests: [
      { id: 101, user: 'Priya Sharma', initials: 'PS', status: 'pending', message: 'Can you pick me up near Forum Mall?' },
      { id: 102, user: 'Kavya Nair', initials: 'KN', status: 'accepted', message: '' },
    ],
  },
  {
    id: 2, origin: 'HSR Layout', destination: 'MG Road',
    date: '2026-06-20', time: '10:00 AM', seats: 3, filled: 0, price: 60,
    vehicle: 'Auto', status: 'active', requests: [],
  },
  {
    id: 3, origin: 'BTM Layout', destination: 'Indiranagar',
    date: '2026-06-10', time: '08:30 AM', seats: 2, filled: 2, price: 50,
    vehicle: 'Car', status: 'completed', requests: [],
  },
];

// Dummy sent requests
const sentRequests = [
  {
    id: 201, origin: 'Indiranagar', destination: 'Electronic City',
    date: '2026-06-19', time: '08:30 AM', price: 120, vehicle: 'SUV',
    creator: 'Sneha Reddy', initials: 'SR', status: 'accepted',
  },
  {
    id: 202, origin: 'Jayanagar', destination: 'Whitefield',
    date: '2026-06-21', time: '08:00 AM', price: 100, vehicle: 'SUV',
    creator: 'Vikram Singh', initials: 'VS', status: 'pending',
  },
  {
    id: 203, origin: 'Marathahalli', destination: 'Hebbal',
    date: '2026-06-15', time: '07:45 AM', price: 90, vehicle: 'Car',
    creator: 'Priya Sharma', initials: 'PS', status: 'rejected',
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

function MyRides() {
  const [activeTab, setActiveTab] = useState('created');
  const [requestActions, setRequestActions] = useState({});

  const handleRequest = (reqId, action) => {
    setRequestActions({ ...requestActions, [reqId]: action });
  };

  return (
    <main className="rb-myrides-page">
      <div className="container">
        {/* Header */}
        <div className="rb-page-header animate-fade-in-up">
          <div>
            <h1 className="rb-page-title">My Rides</h1>
            <p className="rb-page-subtitle">Manage rides you created and requests you sent</p>
          </div>
          <Link to="/create-ride" className="rb-btn-primary">
            <i className="bi bi-plus-lg"></i> New Ride
          </Link>
        </div>

        {/* Tabs */}
        <div className="rb-tabs animate-fade-in-up delay-1">
          <button
            className={`rb-tab ${activeTab === 'created' ? 'active' : ''}`}
            onClick={() => setActiveTab('created')}
          >
            <i className="bi bi-car-front me-1"></i>
            Created Rides
            <span className="rb-tab-badge">{createdRides.length}</span>
          </button>
          <button
            className={`rb-tab ${activeTab === 'requests' ? 'active' : ''}`}
            onClick={() => setActiveTab('requests')}
          >
            <i className="bi bi-send me-1"></i>
            Sent Requests
            <span className="rb-tab-badge">{sentRequests.length}</span>
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === 'created' ? (
          <div className="rb-rides-list animate-fade-in">
            {createdRides.length === 0 ? (
              <div className="rb-empty-state">
                <i className="bi bi-car-front"></i>
                <h5>No rides created yet</h5>
                <p>Create your first ride and start sharing!</p>
                <Link to="/create-ride" className="rb-btn-primary">Create Ride</Link>
              </div>
            ) : (
              createdRides.map((ride) => (
                <div key={ride.id} className="rb-myride-card">
                  {/* Ride Info */}
                  <div className="rb-myride-main">
                    <div className="rb-myride-route">
                      <div className="rb-myride-route-dots">
                        <span className="rb-dot rb-dot-green"></span>
                        <span className="rb-dot-line-v"></span>
                        <span className="rb-dot rb-dot-blue"></span>
                      </div>
                      <div>
                        <div className="rb-myride-origin">{ride.origin}</div>
                        <div className="rb-myride-dest">{ride.destination}</div>
                      </div>
                    </div>

                    <div className="rb-myride-details">
                      <span className="rb-myride-chip">
                        <i className="bi bi-calendar3"></i> {formatDate(ride.date)}
                      </span>
                      <span className="rb-myride-chip">
                        <i className="bi bi-clock"></i> {ride.time}
                      </span>
                      <span className="rb-myride-chip">
                        {vehicleEmoji[ride.vehicle]} {ride.vehicle}
                      </span>
                      <span className="rb-myride-chip rb-myride-chip-seats">
                        <i className="bi bi-people-fill"></i> {ride.filled}/{ride.seats + ride.filled}
                      </span>
                    </div>

                    <div className="rb-myride-right">
                      <div className="rb-myride-price">₹{ride.price}<span>/seat</span></div>
                      <span className={`rb-status-pill rb-status-${ride.status}`}>
                        {ride.status}
                      </span>
                    </div>
                  </div>

                  {/* Pending Requests */}
                  {ride.requests.length > 0 && (
                    <div className="rb-myride-requests">
                      <div className="rb-myride-requests-label">
                        <i className="bi bi-bell"></i>
                        {ride.requests.filter(r => r.status === 'pending' && !requestActions[r.id]).length} pending request{ride.requests.filter(r => r.status === 'pending' && !requestActions[r.id]).length !== 1 ? 's' : ''}
                      </div>
                      {ride.requests.map((req) => (
                        <div key={req.id} className="rb-myride-req-row">
                          <div className="rb-myride-req-avatar">{req.initials}</div>
                          <div className="rb-myride-req-info">
                            <div className="rb-myride-req-name">{req.user}</div>
                            {req.message && <div className="rb-myride-req-msg">"{req.message}"</div>}
                          </div>
                          <div className="rb-myride-req-actions">
                            {requestActions[req.id] ? (
                              <span className={`rb-status-pill rb-status-${requestActions[req.id]}`}>
                                {requestActions[req.id]}
                              </span>
                            ) : req.status === 'pending' ? (
                              <>
                                <button className="rb-req-btn rb-req-accept" onClick={() => handleRequest(req.id, 'accepted')}>
                                  <i className="bi bi-check-lg"></i> Accept
                                </button>
                                <button className="rb-req-btn rb-req-reject" onClick={() => handleRequest(req.id, 'rejected')}>
                                  <i className="bi bi-x-lg"></i>
                                </button>
                              </>
                            ) : (
                              <span className={`rb-status-pill rb-status-${req.status}`}>
                                {req.status}
                              </span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        ) : (
          <div className="rb-rides-list animate-fade-in">
            {sentRequests.length === 0 ? (
              <div className="rb-empty-state">
                <i className="bi bi-send"></i>
                <h5>No requests sent</h5>
                <p>Find rides and send join requests</p>
                <Link to="/search" className="rb-btn-primary">Find Rides</Link>
              </div>
            ) : (
              sentRequests.map((req) => (
                <div key={req.id} className="rb-sent-card">
                  <div className="rb-sent-route">
                    <div className="rb-myride-route-dots">
                      <span className="rb-dot rb-dot-green"></span>
                      <span className="rb-dot-line-v"></span>
                      <span className="rb-dot rb-dot-blue"></span>
                    </div>
                    <div>
                      <div className="rb-myride-origin">{req.origin}</div>
                      <div className="rb-myride-dest">{req.destination}</div>
                    </div>
                  </div>

                  <div className="rb-sent-meta">
                    <span className="rb-myride-chip"><i className="bi bi-calendar3"></i> {formatDate(req.date)}</span>
                    <span className="rb-myride-chip"><i className="bi bi-clock"></i> {req.time}</span>
                    <span className="rb-myride-chip">{vehicleEmoji[req.vehicle]} {req.vehicle}</span>
                  </div>

                  <div className="rb-sent-creator">
                    <div className="rb-search-avatar">{req.initials}</div>
                    <div>
                      <div className="rb-sent-creator-name">{req.creator}</div>
                      <div className="rb-sent-price">₹{req.price}/seat</div>
                    </div>
                  </div>

                  <span className={`rb-status-pill rb-status-${req.status}`}>
                    {req.status}
                  </span>
                </div>
              ))
            )}
          </div>
        )}

        {/* Impact */}
        <div className="mt-4">
          <ImpactBanner variant="personal" size="compact" />
        </div>
      </div>
    </main>
  );
}

export default MyRides;
