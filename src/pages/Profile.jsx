import { useState } from 'react';
import ImpactBanner from '../components/ImpactBanner';
import './Profile.css';

const initialUser = {
  fullName: 'Rahul Verma',
  email: 'rahul.verma@gmail.com',
  phone: '+91 98765 43210',
  bio: 'Daily commuter from Koramangala to Whitefield. Love sharing rides and meeting new people! 🚗',
  initials: 'RV',
  joined: 'January 2026',
  ridesCreated: 12,
  ridesJoined: 8,
  rating: 4.9,
  totalReviews: 15,
  co2Saved: '48 kg',
  moneySaved: '₹3,450',
};

function Profile() {
  const [user, setUser] = useState(initialUser);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    fullName: user.fullName,
    phone: user.phone,
    bio: user.bio,
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = (e) => {
    e.preventDefault();
    setUser({ ...user, ...form, initials: form.fullName.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase() });
    setEditing(false);
  };

  const handleCancel = () => {
    setForm({ fullName: user.fullName, phone: user.phone, bio: user.bio });
    setEditing(false);
  };

  return (
    <main className="rb-profile-page">
      <div className="container">
        <div className="row g-4">
          {/* Left Column — Profile Card */}
          <div className="col-lg-4">
            <div className="rb-profile-card animate-fade-in-up">
              {/* Avatar */}
              <div className="rb-profile-avatar-section">
                <div className="rb-profile-avatar">{user.initials}</div>
                <h3 className="rb-profile-name">{user.fullName}</h3>
                <p className="rb-profile-email">{user.email}</p>
                <div className="rb-profile-rating">
                  <i className="bi bi-star-fill"></i>
                  <span className="rb-profile-rating-value">{user.rating}</span>
                  <span className="rb-profile-rating-count">({user.totalReviews} reviews)</span>
                </div>
                <div className="rb-profile-joined">
                  <i className="bi bi-calendar3 me-1"></i> Joined {user.joined}
                </div>
              </div>

              {/* Stats */}
              <div className="rb-profile-stats">
                <div className="rb-profile-stat">
                  <div className="rb-profile-stat-value">{user.ridesCreated}</div>
                  <div className="rb-profile-stat-label">Created</div>
                </div>
                <div className="rb-profile-stat-divider"></div>
                <div className="rb-profile-stat">
                  <div className="rb-profile-stat-value">{user.ridesJoined}</div>
                  <div className="rb-profile-stat-label">Joined</div>
                </div>
                <div className="rb-profile-stat-divider"></div>
                <div className="rb-profile-stat">
                  <div className="rb-profile-stat-value">{user.rating}</div>
                  <div className="rb-profile-stat-label">Rating</div>
                </div>
              </div>

              {/* Quick Impact */}
              <div className="rb-profile-impact">
                <div className="rb-profile-impact-row">
                  <i className="bi bi-cloud-minus-fill" style={{ color: '#16a34a' }}></i>
                  <span><strong>{user.co2Saved}</strong> CO₂ saved</span>
                </div>
                <div className="rb-profile-impact-row">
                  <i className="bi bi-piggy-bank" style={{ color: '#d97706' }}></i>
                  <span><strong>{user.moneySaved}</strong> saved on commute</span>
                </div>
              </div>
            </div>

            {/* Impact Banner */}
            <div className="mt-3">
              <ImpactBanner variant="personal" size="compact" />
            </div>
          </div>

          {/* Right Column — Details & Edit */}
          <div className="col-lg-8">
            <div className="rb-profile-details animate-fade-in-up delay-1">
              <div className="rb-profile-details-header">
                <h4 className="rb-profile-details-title">Profile Details</h4>
                {!editing && (
                  <button className="rb-btn-outline rb-btn-sm" onClick={() => setEditing(true)}>
                    <i className="bi bi-pencil"></i> Edit
                  </button>
                )}
              </div>

              {editing ? (
                <form onSubmit={handleSave} className="rb-profile-form">
                  <div className="mb-3">
                    <label htmlFor="editName" className="form-label">Full Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="editName"
                      name="fullName"
                      value={form.fullName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input type="email" className="form-control" value={user.email} disabled />
                    <small className="text-muted">Email cannot be changed</small>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="editPhone" className="form-label">Phone</label>
                    <input
                      type="tel"
                      className="form-control"
                      id="editPhone"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="editBio" className="form-label">Bio</label>
                    <textarea
                      className="form-control"
                      id="editBio"
                      name="bio"
                      rows="3"
                      placeholder="Tell other riders about yourself..."
                      value={form.bio}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="rb-profile-form-actions">
                    <button type="submit" className="rb-btn-primary">
                      <i className="bi bi-check-lg"></i> Save Changes
                    </button>
                    <button type="button" className="rb-btn-outline" onClick={handleCancel}>
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <div className="rb-profile-info-grid">
                  <div className="rb-profile-info-item">
                    <div className="rb-profile-info-label">Full Name</div>
                    <div className="rb-profile-info-value">{user.fullName}</div>
                  </div>
                  <div className="rb-profile-info-item">
                    <div className="rb-profile-info-label">Email</div>
                    <div className="rb-profile-info-value">{user.email}</div>
                  </div>
                  <div className="rb-profile-info-item">
                    <div className="rb-profile-info-label">Phone</div>
                    <div className="rb-profile-info-value">{user.phone}</div>
                  </div>
                  <div className="rb-profile-info-item rb-profile-info-full">
                    <div className="rb-profile-info-label">Bio</div>
                    <div className="rb-profile-info-value">{user.bio}</div>
                  </div>
                </div>
              )}
            </div>

            {/* Badges / Achievements */}
            <div className="rb-profile-badges animate-fade-in-up delay-2">
              <h4 className="rb-profile-details-title">Achievements</h4>
              <div className="rb-badges-grid">
                {[
                  { emoji: '🌱', title: 'Eco Starter', desc: 'Completed your first shared ride', earned: true },
                  { emoji: '🤝', title: 'Social Rider', desc: 'Shared rides with 5+ people', earned: true },
                  { emoji: '⭐', title: 'Top Rated', desc: 'Maintained 4.5+ rating', earned: true },
                  { emoji: '🏆', title: 'Ride Legend', desc: 'Created 10+ rides', earned: true },
                  { emoji: '🌍', title: 'Planet Saver', desc: 'Saved 100kg+ of CO₂', earned: false },
                  { emoji: '💎', title: 'Diamond Driver', desc: '50+ rides completed', earned: false },
                ].map((badge, i) => (
                  <div key={i} className={`rb-badge-item ${badge.earned ? 'earned' : 'locked'}`}>
                    <span className="rb-badge-emoji">{badge.emoji}</span>
                    <div>
                      <div className="rb-badge-title">{badge.title}</div>
                      <div className="rb-badge-desc">{badge.desc}</div>
                    </div>
                    {!badge.earned && <i className="bi bi-lock-fill rb-badge-lock"></i>}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Profile;
