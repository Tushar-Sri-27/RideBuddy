import { useState } from 'react';
import { Link } from 'react-router-dom';
import ImpactBanner from '../components/ImpactBanner';
import './CreateRide.css';

const vehicleTypes = [
  { value: 'car', label: 'Car', icon: 'bi-car-front-fill', emoji: '🚗' },
  { value: 'suv', label: 'SUV', icon: 'bi-truck', emoji: '🚙' },
  { value: 'bike', label: 'Bike', icon: 'bi-bicycle', emoji: '🏍️' },
  { value: 'auto', label: 'Auto', icon: 'bi-truck-front', emoji: '🛺' },
];

function CreateRide() {
  const [form, setForm] = useState({
    origin: '',
    destination: '',
    date: '',
    time: '',
    seats: '',
    price: '',
    vehicle: '',
    description: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleVehicle = (type) => {
    setForm({ ...form, vehicle: type });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    // Reset after 3s for demo
    setTimeout(() => setSubmitted(false), 4000);
  };

  // Today's date in YYYY-MM-DD for min attribute
  const today = new Date().toISOString().split('T')[0];

  // Estimated savings calculation
  const estimatedSavings = form.seats && form.price
    ? `₹${(Number(form.price) * Number(form.seats)).toLocaleString()}`
    : null;

  if (submitted) {
    return (
      <main className="rb-create-ride-page">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-6">
              <div className="rb-success-card animate-fade-in-up">
                <div className="rb-success-icon">
                  <i className="bi bi-check-circle-fill"></i>
                </div>
                <h2 className="rb-success-title">Ride Created!</h2>
                <p className="rb-success-desc">
                  Your ride from <strong>{form.origin}</strong> to <strong>{form.destination}</strong> has been posted.
                  Other riders can now find and request to join your ride.
                </p>
                <div className="rb-success-impact">
                  <div className="rb-success-impact-item">
                    <i className="bi bi-tree-fill"></i>
                    <span>You're saving <strong>2.4 kg</strong> of CO₂ with this ride</span>
                  </div>
                  <div className="rb-success-impact-item">
                    <i className="bi bi-piggy-bank"></i>
                    <span>Potential earnings: <strong>{estimatedSavings || '₹—'}</strong></span>
                  </div>
                </div>
                <div className="rb-success-actions">
                  <Link to="/my-rides" className="rb-btn-primary">
                    <i className="bi bi-list-check"></i> View My Rides
                  </Link>
                  <button onClick={() => setSubmitted(false)} className="rb-btn-outline">
                    <i className="bi bi-plus-lg"></i> Create Another
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="rb-create-ride-page">
      <div className="container">
        {/* Header */}
        <div className="rb-page-header animate-fade-in-up">
          <div>
            <h1 className="rb-page-title">Create a Ride</h1>
            <p className="rb-page-subtitle">Share your upcoming trip and split costs with fellow commuters</p>
          </div>
        </div>

        <div className="row g-4">
          {/* Form Column */}
          <div className="col-lg-8">
            <form onSubmit={handleSubmit} className="rb-ride-form animate-fade-in-up delay-1">
              {/* Route Section */}
              <div className="rb-form-section">
                <h5 className="rb-form-section-title">
                  <i className="bi bi-geo-alt"></i> Route Details
                </h5>
                <div className="row g-3">
                  <div className="col-md-6">
                    <label htmlFor="origin" className="form-label">Pickup Location</label>
                    <div className="rb-input-group">
                      <i className="bi bi-circle-fill rb-input-icon" style={{ color: '#16a34a', fontSize: '0.55rem' }}></i>
                      <input
                        type="text"
                        className="form-control rb-input-with-icon"
                        id="origin"
                        name="origin"
                        placeholder="e.g. Koramangala, Bangalore"
                        value={form.origin}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="destination" className="form-label">Drop-off Location</label>
                    <div className="rb-input-group">
                      <i className="bi bi-circle-fill rb-input-icon" style={{ color: '#2563eb', fontSize: '0.55rem' }}></i>
                      <input
                        type="text"
                        className="form-control rb-input-with-icon"
                        id="destination"
                        name="destination"
                        placeholder="e.g. Whitefield, Bangalore"
                        value={form.destination}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Schedule Section */}
              <div className="rb-form-section">
                <h5 className="rb-form-section-title">
                  <i className="bi bi-calendar-event"></i> Schedule
                </h5>
                <div className="row g-3">
                  <div className="col-md-6">
                    <label htmlFor="date" className="form-label">Date</label>
                    <input
                      type="date"
                      className="form-control"
                      id="date"
                      name="date"
                      min={today}
                      value={form.date}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="time" className="form-label">Departure Time</label>
                    <input
                      type="time"
                      className="form-control"
                      id="time"
                      name="time"
                      value={form.time}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Vehicle Section */}
              <div className="rb-form-section">
                <h5 className="rb-form-section-title">
                  <i className="bi bi-truck-front"></i> Vehicle
                </h5>
                <div className="rb-vehicle-grid">
                  {vehicleTypes.map((v) => (
                    <button
                      key={v.value}
                      type="button"
                      className={`rb-vehicle-option ${form.vehicle === v.value ? 'active' : ''}`}
                      onClick={() => handleVehicle(v.value)}
                    >
                      <span className="rb-vehicle-emoji">{v.emoji}</span>
                      <span className="rb-vehicle-label">{v.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Seats & Price */}
              <div className="rb-form-section">
                <h5 className="rb-form-section-title">
                  <i className="bi bi-people"></i> Seats & Pricing
                </h5>
                <div className="row g-3">
                  <div className="col-md-6">
                    <label htmlFor="seats" className="form-label">Available Seats</label>
                    <select
                      className="form-select"
                      id="seats"
                      name="seats"
                      value={form.seats}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select seats</option>
                      <option value="1">1 seat</option>
                      <option value="2">2 seats</option>
                      <option value="3">3 seats</option>
                      <option value="4">4 seats</option>
                      <option value="5">5 seats</option>
                      <option value="6">6 seats</option>
                    </select>
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="price" className="form-label">Price per Seat (₹)</label>
                    <div className="rb-input-group">
                      <i className="bi bi-currency-rupee rb-input-icon"></i>
                      <input
                        type="number"
                        className="form-control rb-input-with-icon"
                        id="price"
                        name="price"
                        placeholder="e.g. 80"
                        min="0"
                        value={form.price}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="rb-form-section">
                <h5 className="rb-form-section-title">
                  <i className="bi bi-chat-left-text"></i> Additional Info
                  <span className="rb-optional-tag">Optional</span>
                </h5>
                <textarea
                  className="form-control"
                  id="description"
                  name="description"
                  rows="3"
                  placeholder="Any details for riders — pickup landmark, AC available, music preferences, etc."
                  value={form.description}
                  onChange={handleChange}
                />
              </div>

              {/* Submit */}
              <div className="rb-form-actions">
                <button type="submit" className="rb-btn-primary rb-btn-lg">
                  <i className="bi bi-check-lg"></i>
                  Publish Ride
                </button>
                <Link to="/dashboard" className="rb-btn-outline">
                  Cancel
                </Link>
              </div>
            </form>
          </div>

          {/* Sidebar */}
          <div className="col-lg-4">
            <div className="rb-create-sidebar animate-fade-in-up delay-2">
              {/* Tips Card */}
              <div className="rb-tips-card">
                <h6 className="rb-tips-title">
                  <i className="bi bi-lightbulb me-2"></i>Tips for a Great Ride
                </h6>
                <ul className="rb-tips-list">
                  <li>
                    <i className="bi bi-check2"></i>
                    Be specific about pickup and drop locations
                  </li>
                  <li>
                    <i className="bi bi-check2"></i>
                    Set a fair price — check similar rides for reference
                  </li>
                  <li>
                    <i className="bi bi-check2"></i>
                    Mention if your vehicle has AC or luggage space
                  </li>
                  <li>
                    <i className="bi bi-check2"></i>
                    Respond to ride requests promptly
                  </li>
                  <li>
                    <i className="bi bi-check2"></i>
                    Keep your profile complete for trust
                  </li>
                </ul>
              </div>

              {/* Earnings Preview */}
              {estimatedSavings && (
                <div className="rb-earnings-card animate-fade-in">
                  <div className="rb-earnings-header">
                    <i className="bi bi-wallet2"></i>
                    <span>Potential Earnings</span>
                  </div>
                  <div className="rb-earnings-value">{estimatedSavings}</div>
                  <div className="rb-earnings-desc">
                    if all {form.seats} seat{Number(form.seats) > 1 ? 's' : ''} filled
                  </div>
                </div>
              )}

              {/* Impact */}
              <ImpactBanner variant="personal" size="compact" />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default CreateRide;
