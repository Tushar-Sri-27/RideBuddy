import { useState } from 'react';
import './StreakChallenge.css';

const CHALLENGES = [
  { id: 1, title: 'Share a ride today', desc: 'Create or join a ride to earn 2× XP', reward: '40 XP', icon: '🎯', progress: 0, target: 1 },
  { id: 2, title: 'Join 2 rides this week', desc: 'Find rides going your way and join them', reward: '50 XP', icon: '🚗', progress: 1, target: 2 },
  { id: 3, title: 'Complete your profile', desc: 'Add your bio and phone number', reward: '25 XP', icon: '✏️', progress: 1, target: 1 },
];

function StreakChallenge({ streakDays = 5 }) {
  const [expanded, setExpanded] = useState(true);

  // Generate last 7 days
  const days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    return {
      label: d.toLocaleDateString('en-IN', { weekday: 'narrow' }),
      active: i >= 7 - streakDays, // last N days active
      isToday: i === 6,
    };
  });

  return (
    <div className="rb-streak-card">
      {/* Streak Header */}
      <div className="rb-streak-header" onClick={() => setExpanded(!expanded)}>
        <div className="rb-streak-flame">
          <span className="rb-flame-emoji">🔥</span>
          <div>
            <div className="rb-streak-count">{streakDays}-day streak</div>
            <div className="rb-streak-subtitle">Keep it going!</div>
          </div>
        </div>
        <i className={`bi ${expanded ? 'bi-chevron-up' : 'bi-chevron-down'} rb-streak-toggle`}></i>
      </div>

      {expanded && (
        <>
          {/* Week dots */}
          <div className="rb-streak-week">
            {days.map((day, i) => (
              <div key={i} className={`rb-streak-day ${day.active ? 'active' : ''} ${day.isToday ? 'today' : ''}`}>
                <div className="rb-streak-dot">
                  {day.active && <i className="bi bi-check-lg"></i>}
                </div>
                <span className="rb-streak-day-label">{day.label}</span>
              </div>
            ))}
          </div>

          {/* Daily Challenges */}
          <div className="rb-challenges">
            <div className="rb-challenges-title">
              <i className="bi bi-lightning-charge-fill"></i>
              Daily Challenges
            </div>
            {CHALLENGES.map((c) => {
              const completed = c.progress >= c.target;
              const percent = (c.progress / c.target) * 100;
              return (
                <div key={c.id} className={`rb-challenge-row ${completed ? 'completed' : ''}`}>
                  <span className="rb-challenge-icon">{c.icon}</span>
                  <div className="rb-challenge-info">
                    <div className="rb-challenge-name">
                      {c.title}
                      {completed && <i className="bi bi-check-circle-fill rb-challenge-check"></i>}
                    </div>
                    <div className="rb-challenge-desc">{c.desc}</div>
                    <div className="rb-challenge-bar">
                      <div className="rb-challenge-bar-fill" style={{ width: `${percent}%` }}></div>
                    </div>
                  </div>
                  <span className="rb-challenge-reward">{c.reward}</span>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}

export default StreakChallenge;
