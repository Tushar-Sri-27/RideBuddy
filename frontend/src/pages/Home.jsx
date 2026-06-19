import { Link } from 'react-router-dom';
import ImpactBanner from '../components/ImpactBanner';
import SpeedAura from '../components/SpeedAura';
import LivingEarth from '../components/LivingEarth';
import './Home.css';

function Home() {
  const stats = [
    { icon: 'bi-people-fill', value: '2,500+', label: 'Active Riders' },
    { icon: 'bi-geo-alt-fill', value: '120+', label: 'Cities Covered' },
    { icon: 'bi-cash-stack', value: '₹4.2L+', label: 'Money Saved' },
    { icon: 'bi-star-fill', value: '4.8', label: 'Avg Rating' },
  ];

  const features = [
    {
      icon: 'bi-plus-circle-fill',
      title: 'Create a Ride',
      desc: 'Heading somewhere? Post your ride with route, date, time and available seats. It takes less than a minute.',
      color: 'var(--rb-primary)',
    },
    {
      icon: 'bi-search-heart',
      title: 'Find a Match',
      desc: 'Search for rides that match your route and schedule. Filter by origin, destination, date and more.',
      color: 'var(--rb-green)',
    },
    {
      icon: 'bi-hand-thumbs-up-fill',
      title: 'Request to Join',
      desc: 'Found a ride? Send a request to the ride creator. Once accepted, you\'re all set to travel together.',
      color: 'var(--rb-amber)',
    },
    {
      icon: 'bi-wallet2',
      title: 'Split Costs',
      desc: 'Share the cost of fuel, tolls and parking. Save money on your daily commute, every single day.',
      color: '#ec4899',
    },
  ];

  const testimonials = [
    {
      name: 'Priya Sharma',
      role: 'Software Engineer',
      avatar: 'PS',
      text: 'RideBuddy cut my daily commute cost by 60%. I also made two great friends from my office route!',
      rating: 5,
    },
    {
      name: 'Arjun Patel',
      role: 'College Student',
      avatar: 'AP',
      text: 'As a student, every rupee counts. This app is a lifesaver for my daily college commute.',
      rating: 5,
    },
    {
      name: 'Sneha Reddy',
      role: 'Marketing Lead',
      avatar: 'SR',
      text: 'I love how simple it is. Create a ride, get requests, accept — done. No unnecessary complexity.',
      rating: 4,
    },
  ];

  return (
    <SpeedAura>
    <main className="rb-home">
      {/* ==================== HERO ==================== */}
      <section className="rb-hero">
        <div className="rb-hero-bg">
          <div className="rb-hero-orb rb-hero-orb-1"></div>
          <div className="rb-hero-orb rb-hero-orb-2"></div>
          <div className="rb-hero-orb rb-hero-orb-3"></div>
          <div className="rb-hero-grid"></div>
        </div>

        <div className="container position-relative">
          <div className="row align-items-center min-vh-100 py-5">
            <div className="col-lg-7">
              <div className="rb-hero-content">
                <div className="rb-hero-badge animate-fade-in-up">
                  <i className="bi bi-lightning-charge-fill"></i>
                  <span>Smarter Commutes, Happier Wallets</span>
                </div>

                <h1 className="rb-hero-title animate-fade-in-up delay-1">
                  Share Rides,<br />
                  <span className="rb-gradient-text">Split Costs,</span><br />
                  Travel Together.
                </h1>

                <p className="rb-hero-subtitle animate-fade-in-up delay-2">
                  Connect with people on similar routes — office colleagues,
                  classmates, or neighbours. Save money, reduce traffic, and
                  make your commute enjoyable.
                </p>

                <div className="rb-hero-actions animate-fade-in-up delay-3">
                  <Link to="/register" className="rb-btn-primary rb-btn-lg">
                    <i className="bi bi-rocket-takeoff"></i>
                    Get Started Free
                  </Link>
                  <Link to="/search" className="rb-btn-outline rb-btn-lg">
                    <i className="bi bi-search"></i>
                    Find a Ride
                  </Link>
                </div>

                <div className="rb-hero-trust animate-fade-in-up delay-4">
                  <div className="rb-avatar-stack">
                    {['RK', 'SM', 'AJ', 'VP'].map((initials, i) => (
                      <div key={i} className="rb-avatar-bubble" style={{ zIndex: 4 - i }}>
                        {initials}
                      </div>
                    ))}
                  </div>
                  <span className="rb-trust-text">
                    <strong>2,500+</strong> riders already sharing routes
                  </span>
                </div>
              </div>
            </div>

            <div className="col-lg-5 d-none d-lg-flex justify-content-center">
              <div className="rb-hero-visual animate-fade-in-up delay-3">
                <LivingEarth />
                <div className="rb-hero-card rb-glass" style={{ marginTop: '1.5rem' }}>
                  <div className="rb-hero-card-header">
                    <div className="rb-hero-card-dot" style={{ background: 'var(--rb-green)' }}></div>
                    <span>Active Ride</span>
                  </div>
                  <div className="rb-hero-card-route">
                    <div className="rb-route-point">
                      <div className="rb-route-dot rb-route-dot-start"></div>
                      <span>Koramangala</span>
                    </div>
                    <div className="rb-route-line"></div>
                    <div className="rb-route-point">
                      <div className="rb-route-dot rb-route-dot-end"></div>
                      <span>Whitefield</span>
                    </div>
                  </div>
                  <div className="rb-hero-card-details">
                    <div className="rb-detail-chip">
                      <i className="bi bi-calendar3"></i> Tomorrow
                    </div>
                    <div className="rb-detail-chip">
                      <i className="bi bi-clock"></i> 9:00 AM
                    </div>
                    <div className="rb-detail-chip rb-detail-chip-accent">
                      <i className="bi bi-person-fill"></i> 2 seats
                    </div>
                  </div>
                  <div className="rb-hero-card-price">
                    ₹80 <span>per seat</span>
                  </div>
                </div>

                <div className="rb-hero-floating-badge rb-float-1 rb-glass-sm">
                  <i className="bi bi-shield-check" style={{ color: 'var(--rb-green)' }}></i>
                  <span>Verified</span>
                </div>
                <div className="rb-hero-floating-badge rb-float-2 rb-glass-sm">
                  <i className="bi bi-currency-rupee" style={{ color: 'var(--rb-amber-light)' }}></i>
                  <span>Save 60%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== STATS BAR ==================== */}
      <section className="rb-stats-bar">
        <div className="container">
          <div className="row g-3">
            {stats.map((stat, i) => (
              <div key={i} className="col-6 col-md-3">
                <div className="rb-stat-item animate-fade-in-up" style={{ animationDelay: `${i * 0.1}s` }}>
                  <i className={`bi ${stat.icon} rb-stat-icon`}></i>
                  <div>
                    <div className="rb-stat-value">{stat.value}</div>
                    <div className="rb-stat-label">{stat.label}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== HOW IT WORKS ==================== */}
      <section className="rb-section" id="how-it-works">
        <div className="container">
          <div className="text-center mb-5">
            <span className="rb-section-tag animate-fade-in-up">How It Works</span>
            <h2 className="rb-section-title animate-fade-in-up delay-1">
              Get Moving in <span className="rb-gradient-text">4 Simple Steps</span>
            </h2>
            <p className="rb-section-desc animate-fade-in-up delay-2">
              No complex setup. No hidden fees. Just simple, social ride sharing.
            </p>
          </div>

          <div className="row g-4">
            {features.map((feature, i) => (
              <div key={i} className="col-md-6 col-lg-3">
                <div className="rb-feature-card rb-glass animate-fade-in-up" style={{ animationDelay: `${i * 0.15}s` }}>
                  <div className="rb-feature-step">
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  <div className="rb-feature-icon" style={{ color: feature.color }}>
                    <i className={`bi ${feature.icon}`}></i>
                  </div>
                  <h4 className="rb-feature-title">{feature.title}</h4>
                  <p className="rb-feature-desc">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== WHY RIDEBUDDY ==================== */}
      <section className="rb-section-alt">
        <div className="container">
          <div className="row align-items-center g-5">
            <div className="col-lg-6">
              <span className="rb-section-tag animate-fade-in-up">Why RideBuddy?</span>
              <h2 className="rb-section-title animate-fade-in-up delay-1">
                Built for <span className="rb-gradient-text">Real Commuters</span>
              </h2>
              <p className="rb-section-desc text-start animate-fade-in-up delay-2">
                We understand the daily grind. RideBuddy is designed for people
                who travel the same routes every day and want a smarter way to
                commute.
              </p>

              <div className="rb-benefit-list animate-fade-in-up delay-3">
                {[
                  { icon: 'bi-piggy-bank', title: 'Save up to 60% on commute costs', desc: 'Split fuel, tolls, and parking with co-riders.' },
                  { icon: 'bi-tree', title: 'Reduce your carbon footprint', desc: 'Fewer cars on the road means cleaner air for everyone.' },
                  { icon: 'bi-emoji-smile', title: 'Make your commute social', desc: 'Meet new people, make friends, and enjoy the ride.' },
                  { icon: 'bi-shield-lock', title: 'Safe and verified community', desc: 'All users are verified. You control who joins your ride.' },
                ].map((benefit, i) => (
                  <div key={i} className="rb-benefit-item">
                    <div className="rb-benefit-icon">
                      <i className={`bi ${benefit.icon}`}></i>
                    </div>
                    <div>
                      <h6 className="rb-benefit-title">{benefit.title}</h6>
                      <p className="rb-benefit-desc">{benefit.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="col-lg-6 d-flex justify-content-center">
              <div className="rb-why-visual">
                <div className="rb-why-card rb-glass animate-fade-in-up delay-2">
                  <div className="rb-why-card-icon">🎯</div>
                  <h5>For Office Employees</h5>
                  <p>Share rides with colleagues on the same route. Coordinate pickup points and timings easily.</p>
                </div>
                <div className="rb-why-card rb-glass animate-fade-in-up delay-3">
                  <div className="rb-why-card-icon">🎓</div>
                  <h5>For College Students</h5>
                  <p>Team up with classmates for affordable daily travel. Perfect for long-distance commuters.</p>
                </div>
                <div className="rb-why-card rb-glass animate-fade-in-up delay-4">
                  <div className="rb-why-card-icon">🏠</div>
                  <h5>For Apartment Residents</h5>
                  <p>Connect with neighbours heading the same way. Build community while saving money.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== TESTIMONIALS ==================== */}
      <section className="rb-section">
        <div className="container">
          <div className="text-center mb-5">
            <span className="rb-section-tag animate-fade-in-up">Testimonials</span>
            <h2 className="rb-section-title animate-fade-in-up delay-1">
              Loved by <span className="rb-gradient-text">Commuters</span>
            </h2>
          </div>

          <div className="row g-4">
            {testimonials.map((t, i) => (
              <div key={i} className="col-md-4">
                <div className="rb-testimonial-card rb-glass animate-fade-in-up" style={{ animationDelay: `${i * 0.15}s` }}>
                  <div className="rb-testimonial-stars">
                    {Array.from({ length: 5 }, (_, j) => (
                      <i key={j} className={`bi ${j < t.rating ? 'bi-star-fill' : 'bi-star'}`}></i>
                    ))}
                  </div>
                  <p className="rb-testimonial-text">"{t.text}"</p>
                  <div className="rb-testimonial-author">
                    <div className="rb-testimonial-avatar">{t.avatar}</div>
                    <div>
                      <div className="rb-testimonial-name">{t.name}</div>
                      <div className="rb-testimonial-role">{t.role}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== IMPACT ==================== */}
      <ImpactBanner variant="community" size="full" />

      {/* ==================== CTA ==================== */}
      <section className="rb-cta-section">
        <div className="rb-cta-bg">
          <div className="rb-hero-orb rb-hero-orb-1"></div>
          <div className="rb-hero-orb rb-hero-orb-2"></div>
        </div>
        <div className="container position-relative text-center">
          <h2 className="rb-cta-title animate-fade-in-up">
            Ready to Start <span className="rb-gradient-text">Sharing Rides?</span>
          </h2>
          <p className="rb-cta-subtitle animate-fade-in-up delay-1">
            Join thousands of smart commuters saving money every day.
          </p>
          <div className="rb-cta-actions animate-fade-in-up delay-2">
            <Link to="/register" className="rb-btn-accent rb-btn-lg">
              <i className="bi bi-rocket-takeoff"></i>
              Create Free Account
            </Link>
            <Link to="/search" className="rb-btn-outline rb-btn-lg">
              Browse Rides
            </Link>
          </div>
        </div>
      </section>
    </main>
    </SpeedAura>
  );
}

export default Home;
