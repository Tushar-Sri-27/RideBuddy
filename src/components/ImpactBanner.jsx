import './ImpactBanner.css';

// Community-level stats (shown on public pages)
const communityStats = {
  co2Saved: '12.8 tons',
  moneySaved: '₹18.5L',
  ridesShared: '8,400+',
  treesEquiv: '580',
};

// Personal stats (shown on authenticated pages)
const personalStats = {
  co2Saved: '48 kg',
  moneySaved: '₹3,450',
  ridesShared: '20',
  treesEquiv: '4',
  fuelSaved: '32L',
};

/**
 * ImpactBanner — compact motivational strip
 * @param {'community' | 'personal'} variant
 * @param {'full' | 'compact' | 'minimal'} size
 */
function ImpactBanner({ variant = 'community', size = 'full' }) {
  const stats = variant === 'personal' ? personalStats : communityStats;
  const isPersonal = variant === 'personal';

  if (size === 'minimal') {
    return (
      <div className="rb-impact-minimal">
        <div className="rb-impact-minimal-inner">
          <i className="bi bi-leaf"></i>
          <span>
            {isPersonal ? "You've" : 'Our riders have'} saved{' '}
            <strong>{stats.co2Saved}</strong> of CO₂ and{' '}
            <strong>{stats.moneySaved}</strong> so far!
          </span>
        </div>
      </div>
    );
  }

  if (size === 'compact') {
    return (
      <div className="rb-impact-compact">
        <div className="rb-impact-compact-content">
          <div className="rb-impact-compact-icon">
            <i className="bi bi-globe-americas"></i>
          </div>
          <div>
            <div className="rb-impact-compact-title">
              {isPersonal ? 'Your Impact' : 'Community Impact'}
            </div>
            <div className="rb-impact-compact-stats">
              <span><i className="bi bi-cloud-minus"></i> {stats.co2Saved} CO₂</span>
              <span className="rb-impact-compact-divider">•</span>
              <span><i className="bi bi-piggy-bank"></i> {stats.moneySaved} saved</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Full size
  const items = [
    {
      icon: 'bi-cloud-minus-fill',
      value: stats.co2Saved,
      label: 'CO₂ Reduced',
      color: '#16a34a',
      bg: '#f0fdf4',
    },
    {
      icon: 'bi-piggy-bank',
      value: stats.moneySaved,
      label: 'Money Saved',
      color: '#d97706',
      bg: '#fffbeb',
    },
    {
      icon: 'bi-arrow-repeat',
      value: stats.ridesShared,
      label: 'Rides Shared',
      color: '#2563eb',
      bg: '#eff6ff',
    },
    {
      icon: 'bi-tree-fill',
      value: stats.treesEquiv,
      label: 'Trees Equivalent',
      color: '#059669',
      bg: '#ecfdf5',
    },
  ];

  return (
    <div className="rb-impact-banner">
      <div className="rb-impact-banner-bg"></div>
      <div className="container position-relative">
        <div className="rb-impact-banner-header">
          <div className="rb-impact-badge">
            <i className="bi bi-globe-americas"></i>
            <span>{isPersonal ? 'Your Green Impact' : 'Our Collective Impact'}</span>
          </div>
          <p className="rb-impact-tagline">
            {isPersonal
              ? 'Every ride you share makes a difference. Here\'s your contribution.'
              : 'Together, our community is making roads greener and wallets happier.'}
          </p>
        </div>

        <div className="row g-3">
          {items.map((item, i) => (
            <div key={i} className="col-6 col-md-3">
              <div className="rb-impact-item animate-fade-in-up" style={{ animationDelay: `${i * 0.08}s` }}>
                <div className="rb-impact-item-icon" style={{ background: item.bg, color: item.color }}>
                  <i className={`bi ${item.icon}`}></i>
                </div>
                <div className="rb-impact-item-value">{item.value}</div>
                <div className="rb-impact-item-label">{item.label}</div>
                <div className="rb-impact-item-bar">
                  <div
                    className="rb-impact-item-fill"
                    style={{ background: item.color, width: `${60 + i * 10}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="rb-impact-motivation">
          <i className="bi bi-lightning-charge-fill"></i>
          <span>
            {isPersonal
              ? `That's like planting ${stats.treesEquiv} trees and saving ${personalStats.fuelSaved} of fuel!`
              : `That's like planting ${stats.treesEquiv} trees — and we're just getting started!`}
          </span>
        </div>
      </div>
    </div>
  );
}

export default ImpactBanner;
