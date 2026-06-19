import { useState } from 'react';
import { Link } from 'react-router-dom';
import ImpactBanner from '../components/ImpactBanner';
import { CarbonSaved } from '../components/CarbonCards';
import './SearchRides.css';

// Dummy rides data
const allRides = [
  {
    id: 1, origin: 'Koramangala', destination: 'Whitefield',
    date: '2026-06-19', time: '09:00 AM', seats: 2, price: 80,
    vehicle: 'Car', creator: 'Rahul Verma', initials: 'RV', rating: 4.9,
    description: 'AC car, playing chill music. Pickup near Sony Signal.',
  },
  {
    id: 2, origin: 'Indiranagar', destination: 'Electronic City',
    date: '2026-06-19', time: '08:30 AM', seats: 1, price: 120,
    vehicle: 'SUV', creator: 'Sneha Reddy', initials: 'SR', rating: 4.7,
    description: 'Spacious SUV with luggage space. Leaving sharp at 8:30.',
  },
  {
    id: 3, origin: 'HSR Layout', destination: 'MG Road',
    date: '2026-06-20', time: '10:00 AM', seats: 3, price: 60,
    vehicle: 'Auto', creator: 'Arjun Patel', initials: 'AP', rating: 4.5,
    description: '',
  },
  {
    id: 4, origin: 'Marathahalli', destination: 'Hebbal',
    date: '2026-06-20', time: '07:45 AM', seats: 2, price: 90,
    vehicle: 'Car', creator: 'Priya Sharma', initials: 'PS', rating: 5.0,
    description: 'Daily commuter, very punctual. AC car.',
  },
  {
    id: 5, origin: 'Jayanagar', destination: 'Whitefield',
    date: '2026-06-21', time: '08:00 AM', seats: 4, price: 100,
    vehicle: 'SUV', creator: 'Vikram Singh', initials: 'VS', rating: 4.8,
    description: 'Going via Silk Board. Can pick up along the way.',
  },
  {
    id: 6, origin: 'Koramangala', destination: 'Electronic City',
    date: '2026-06-21', time: '09:15 AM', seats: 1, price: 70,
    vehicle: 'Bike', creator: 'Kavya Nair', initials: 'KN', rating: 4.6,
    description: 'Bike ride, helmet provided. Quick route via Hosur Road.',
  },
];

const vehicleEmoji = { Car: '🚗', SUV: '🚙', Bike: '🏍️', Auto: '🛺' };

function formatDate(dateStr) {
  const d = new Date(dateStr);
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  if (d.toDateString() === today.toDateString()) return 'Today';
  if (d.toDateString() === tomorrow.toDateString()) return 'Tomorrow';
  return d.toLocaleDateString('en-IN', { weekday: 'short', month: 'short', day: 'numeric' });
}

function SearchRides() {
  const [filters, setFilters] = useState({ origin: '', destination: '', date: '' });
  const [joinedId, setJoinedId] = useState(null);

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleClear = () => {
    setFilters({ origin: '', destination: '', date: '' });
  };

  const handleJoin = (id) => {
    setJoinedId(id);
    setTimeout(() => setJoinedId(null), 2500);
  };

  // Filter rides
  const filtered = allRides.filter((r) => {
    const matchOrigin = !filters.origin || r.origin.toLowerCase().includes(filters.origin.toLowerCase());
    const matchDest = !filters.destination || r.destination.toLowerCase().includes(filters.destination.toLowerCase());
    const matchDate = !filters.date || r.date === filters.date;
    return matchOrigin && matchDest && matchDate;
  });

  const hasFilters = filters.origin || filters.destination || filters.date;

  return (
    <main className="rb-search-page">
      <div className="container">
        {/* Header */}
        <div className="rb-page-header animate-fade-in-up">
          <div>
            <h1 className="rb-page-title">Find a Ride</h1>
            <p className="rb-page-subtitle">Search available rides that match your route and schedule</p>
          </div>
        </div>

        {/* Search Filters */}
        <div className="rb-search-bar animate-fade-in-up delay-1">
          <div className="row g-3 align-items-end">
            <div className="col-md-4">
              <label htmlFor="searchOrigin" className="form-label">From</label>
              <div className="rb-input-group">
                <i className="bi bi-circle-fill rb-input-icon" style={{ color: '#16a34a', fontSize: '0.5rem' }}></i>
                <input
                  type="text"
                  className="form-control rb-input-with-icon"
                  id="searchOrigin"
                  name="origin"
                  placeholder="Pickup location"
                  value={filters.origin}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="col-md-4">
              <label htmlFor="searchDest" className="form-label">To</label>
              <div className="rb-input-group">
                <i className="bi bi-circle-fill rb-input-icon" style={{ color: '#2563eb', fontSize: '0.5rem' }}></i>
                <input
                  type="text"
                  className="form-control rb-input-with-icon"
                  id="searchDest"
                  name="destination"
                  placeholder="Drop-off location"
                  value={filters.destination}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="col-md-2">
              <label htmlFor="searchDate" className="form-label">Date</label>
              <input
                type="date"
                className="form-control"
                id="searchDate"
                name="date"
                value={filters.date}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-2 d-flex gap-2">
              <button className="rb-btn-primary flex-grow-1" type="button">
                <i className="bi bi-search"></i> Search
              </button>
              {hasFilters && (
                <button className="rb-btn-outline rb-btn-icon" type="button" onClick={handleClear} title="Clear filters">
                  <i className="bi bi-x-lg"></i>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Results Info */}
        <div className="rb-search-results-info animate-fade-in-up delay-2">
          <span className="rb-results-count">
            <strong>{filtered.length}</strong> ride{filtered.length !== 1 ? 's' : ''} found
          </span>
          {hasFilters && (
            <span className="rb-results-filter-tag">
              <i className="bi bi-funnel-fill"></i> Filtered
            </span>
          )}
        </div>

        {/* Results */}
        <div className="row g-3">
          {filtered.length === 0 ? (
            <div className="col-12">
              <div className="rb-empty-search animate-fade-in-up">
                <i className="bi bi-search"></i>
                <h5>No rides found</h5>
                <p>Try adjusting your filters or search a different route</p>
                <Link to="/create-ride" className="rb-btn-primary">
                  <i className="bi bi-plus-lg"></i> Offer a Ride Instead
                </Link>
              </div>
            </div>
          ) : (
            filtered.map((ride, i) => (
              <div key={ride.id} className="col-md-6 col-lg-4">
                <div className="rb-search-card animate-fade-in-up" style={{ animationDelay: `${0.15 + i * 0.06}s` }}>
                  {/* Card Header */}
                  <div className="rb-search-card-top">
                    <div className="rb-search-vehicle">
                      <span className="rb-search-vehicle-emoji">{vehicleEmoji[ride.vehicle] || '🚗'}</span>
                      <span className="rb-search-vehicle-label">{ride.vehicle}</span>
                    </div>
                    <div className="rb-search-price">
                      ₹{ride.price}<span>/seat</span>
                    </div>
                  </div>

                  {/* Route */}
                  <div className="rb-search-route">
                    <div className="rb-search-route-dots">
                      <span className="rb-dot rb-dot-green"></span>
                      <span className="rb-dot-line-v"></span>
                      <span className="rb-dot rb-dot-blue"></span>
                    </div>
                    <div className="rb-search-route-names">
                      <div className="rb-search-origin">{ride.origin}</div>
                      <div className="rb-search-dest">{ride.destination}</div>
                    </div>
                  </div>

                  {/* Meta chips */}
                  <div className="rb-search-meta">
                    <span className="rb-search-chip">
                      <i className="bi bi-calendar3"></i> {formatDate(ride.date)}
                    </span>
                    <span className="rb-search-chip">
                      <i className="bi bi-clock"></i> {ride.time}
                    </span>
                    <span className="rb-search-chip rb-search-chip-accent">
                      <i className="bi bi-person-fill"></i> {ride.seats} seat{ride.seats > 1 ? 's' : ''}
                    </span>
                  </div>

                  {/* Description */}
                  {ride.description && (
                    <p className="rb-search-desc">{ride.description}</p>
                  )}

                  {/* Carbon saved badge */}
                  <CarbonSaved co2Kg={Math.round((ride.price * 0.03) * 10) / 10 || 2.4} />

                  {/* Footer */}
                  <div className="rb-search-card-footer">
                    <div className="rb-search-creator">
                      <div className="rb-search-avatar">{ride.initials}</div>
                      <div>
                        <div className="rb-search-creator-name">{ride.creator}</div>
                        <div className="rb-search-creator-rating">
                          <i className="bi bi-star-fill"></i> {ride.rating}
                        </div>
                      </div>
                    </div>
                    <button
                      className={`rb-btn-join ${joinedId === ride.id ? 'joined' : ''}`}
                      onClick={() => handleJoin(ride.id)}
                      disabled={joinedId === ride.id}
                    >
                      {joinedId === ride.id ? (
                        <><i className="bi bi-check-lg"></i> Requested</>
                      ) : (
                        <><i className="bi bi-hand-index-thumb"></i> Join Ride</>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Impact Banner */}
        <div className="mt-4">
          <ImpactBanner variant="community" size="compact" />
        </div>
      </div>
    </main>
  );
}

export default SearchRides;
