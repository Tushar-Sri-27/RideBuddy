import { useState, useEffect } from 'react';
import './LevelBadge.css';

const LEVELS = [
  { level: 1, name: 'Seedling', emoji: '🌱', minXP: 0, maxXP: 100, color: '#86efac' },
  { level: 2, name: 'Sapling', emoji: '🌿', minXP: 100, maxXP: 300, color: '#4ade80' },
  { level: 3, name: 'Tree', emoji: '🌳', minXP: 300, maxXP: 600, color: '#22c55e' },
  { level: 4, name: 'Forest', emoji: '🌲', minXP: 600, maxXP: 1000, color: '#16a34a' },
  { level: 5, name: 'Earth Guardian', emoji: '🌍', minXP: 1000, maxXP: 2000, color: '#059669' },
];

function getLevelInfo(xp) {
  for (let i = LEVELS.length - 1; i >= 0; i--) {
    if (xp >= LEVELS[i].minXP) {
      const level = LEVELS[i];
      const nextLevel = LEVELS[i + 1] || { minXP: level.maxXP };
      const progress = ((xp - level.minXP) / (level.maxXP - level.minXP)) * 100;
      return { ...level, xp, progress: Math.min(progress, 100), nextXP: level.maxXP };
    }
  }
  return { ...LEVELS[0], xp, progress: 0, nextXP: LEVELS[0].maxXP };
}

/**
 * LevelBadge — compact badge for Navbar
 */
export function LevelBadge({ xp = 450 }) {
  const info = getLevelInfo(xp);

  return (
    <div className="rb-level-badge" title={`${info.name} — ${info.xp} XP`}>
      <span className="rb-level-emoji">{info.emoji}</span>
      <div className="rb-level-info">
        <span className="rb-level-name">Lv.{info.level}</span>
        <div className="rb-level-bar">
          <div
            className="rb-level-bar-fill"
            style={{ width: `${info.progress}%`, background: info.color }}
          />
        </div>
      </div>
    </div>
  );
}

/**
 * LevelCard — detailed level display for Profile/Dashboard
 */
export function LevelCard({ xp = 450 }) {
  const info = getLevelInfo(xp);
  const [animatedProgress, setAnimatedProgress] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => setAnimatedProgress(info.progress), 300);
    return () => clearTimeout(timeout);
  }, [info.progress]);

  // XP breakdown
  const xpBreakdown = [
    { action: 'Create a ride', xp: '+20 XP', icon: 'bi-plus-circle' },
    { action: 'Join a ride', xp: '+15 XP', icon: 'bi-hand-index-thumb' },
    { action: 'Complete a ride', xp: '+30 XP', icon: 'bi-check-circle' },
    { action: 'Daily streak bonus', xp: '+10 XP', icon: 'bi-fire' },
  ];

  return (
    <div className="rb-level-card">
      <div className="rb-level-card-header">
        <div className="rb-level-card-emoji">{info.emoji}</div>
        <div>
          <div className="rb-level-card-title">{info.name}</div>
          <div className="rb-level-card-subtitle">Level {info.level}</div>
        </div>
        <div className="rb-level-card-xp">{info.xp} XP</div>
      </div>

      {/* Progress */}
      <div className="rb-level-progress-section">
        <div className="rb-level-progress-bar">
          <div
            className="rb-level-progress-fill"
            style={{ width: `${animatedProgress}%`, background: info.color }}
          />
        </div>
        <div className="rb-level-progress-labels">
          <span>{info.minXP} XP</span>
          <span>{info.nextXP} XP</span>
        </div>
      </div>

      {/* Next level teaser */}
      {info.level < 5 && (
        <div className="rb-level-next">
          <span>{LEVELS[info.level].emoji}</span>
          <span><strong>{info.nextXP - info.xp} XP</strong> to reach <strong>{LEVELS[info.level].name}</strong></span>
        </div>
      )}

      {/* XP Actions */}
      <div className="rb-xp-actions">
        <div className="rb-xp-actions-title">How to earn XP</div>
        {xpBreakdown.map((item, i) => (
          <div key={i} className="rb-xp-action-row">
            <i className={`bi ${item.icon}`}></i>
            <span>{item.action}</span>
            <span className="rb-xp-value">{item.xp}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export { LEVELS, getLevelInfo };
