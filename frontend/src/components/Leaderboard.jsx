import { useState } from 'react';
import './Leaderboard.css';

const leaderboardData = [
  { rank: 1, name: 'Sneha Reddy', initials: 'SR', rides: 34, co2: '82 kg', xp: 1240, level: '🌲' },
  { rank: 2, name: 'Vikram Singh', initials: 'VS', rides: 28, co2: '67 kg', xp: 980, level: '🌲' },
  { rank: 3, name: 'Priya Sharma', initials: 'PS', rides: 25, co2: '60 kg', xp: 870, level: '🌳' },
  { rank: 4, name: 'Arjun Patel', initials: 'AP', rides: 22, co2: '53 kg', xp: 760, level: '🌳' },
  { rank: 5, name: 'Kavya Nair', initials: 'KN', rides: 19, co2: '46 kg', xp: 650, level: '🌳' },
];

const currentUser = { rank: 42, name: 'Rahul Verma', initials: 'RV', rides: 20, co2: '48 kg', xp: 450, level: '🌳' };

const rankEmoji = ['', '🥇', '🥈', '🥉'];

function Leaderboard() {
  const [metric, setMetric] = useState('xp'); // xp | rides | co2

  const sortedData = [...leaderboardData].sort((a, b) => {
    if (metric === 'xp') return b.xp - a.xp;
    if (metric === 'rides') return b.rides - a.rides;
    return parseInt(b.co2) - parseInt(a.co2);
  });

  const getMetricValue = (user) => {
    if (metric === 'xp') return `${user.xp} XP`;
    if (metric === 'rides') return `${user.rides} rides`;
    return user.co2;
  };

  const maxValue = metric === 'xp' ? sortedData[0]?.xp : metric === 'rides' ? sortedData[0]?.rides : parseInt(sortedData[0]?.co2);

  const getBarWidth = (user) => {
    const val = metric === 'xp' ? user.xp : metric === 'rides' ? user.rides : parseInt(user.co2);
    return (val / maxValue) * 100;
  };

  return (
    <div className="rb-leaderboard">
      <div className="rb-leaderboard-header">
        <h5 className="rb-leaderboard-title">
          <i className="bi bi-trophy-fill me-2"></i>Leaderboard
        </h5>
        <div className="rb-leaderboard-tabs">
          {[
            { key: 'xp', label: 'XP' },
            { key: 'rides', label: 'Rides' },
            { key: 'co2', label: 'CO₂' },
          ].map((tab) => (
            <button
              key={tab.key}
              className={`rb-lb-tab ${metric === tab.key ? 'active' : ''}`}
              onClick={() => setMetric(tab.key)}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Top 3 podium */}
      <div className="rb-podium">
        {sortedData.slice(0, 3).map((user, i) => (
          <div key={i} className={`rb-podium-item rb-podium-${i + 1}`}>
            <div className="rb-podium-avatar">{user.initials}</div>
            <span className="rb-podium-rank">{rankEmoji[i + 1]}</span>
            <div className="rb-podium-name">{user.name.split(' ')[0]}</div>
            <div className="rb-podium-value">{getMetricValue(user)}</div>
          </div>
        ))}
      </div>

      {/* Full list */}
      <div className="rb-lb-list">
        {sortedData.map((user, i) => (
          <div key={i} className="rb-lb-row">
            <span className="rb-lb-rank">
              {i < 3 ? rankEmoji[i + 1] : `#${i + 1}`}
            </span>
            <div className="rb-lb-avatar">{user.initials}</div>
            <div className="rb-lb-info">
              <div className="rb-lb-name">
                {user.name}
                <span className="rb-lb-level">{user.level}</span>
              </div>
              <div className="rb-lb-bar">
                <div className="rb-lb-bar-fill" style={{ width: `${getBarWidth(user)}%` }}></div>
              </div>
            </div>
            <span className="rb-lb-metric">{getMetricValue(user)}</span>
          </div>
        ))}
      </div>

      {/* Current user position */}
      <div className="rb-lb-current">
        <span className="rb-lb-rank">#{currentUser.rank}</span>
        <div className="rb-lb-avatar rb-lb-avatar-you">{currentUser.initials}</div>
        <div className="rb-lb-info">
          <div className="rb-lb-name">
            You <span className="rb-lb-level">{currentUser.level}</span>
          </div>
          <div className="rb-lb-bar">
            <div className="rb-lb-bar-fill rb-lb-bar-you" style={{ width: `${getBarWidth(currentUser)}%` }}></div>
          </div>
        </div>
        <span className="rb-lb-metric">{getMetricValue(currentUser)}</span>
      </div>
    </div>
  );
}

export default Leaderboard;
