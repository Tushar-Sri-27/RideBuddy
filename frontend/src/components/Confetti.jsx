import { useCallback } from 'react';
import './Confetti.css';

/**
 * useConfetti — triggers a confetti/leaf burst at a position or center of screen
 * Returns a function: triggerConfetti(type?) where type = 'confetti' | 'leaves'
 */
export function useConfetti() {
  const triggerConfetti = useCallback((type = 'confetti', x = null, y = null) => {
    const container = document.createElement('div');
    container.className = 'rb-confetti-container';
    document.body.appendChild(container);

    const centerX = x ?? window.innerWidth / 2;
    const centerY = y ?? window.innerHeight / 2;
    const count = type === 'confetti' ? 60 : 25;

    const colors = type === 'confetti'
      ? ['#2563eb', '#16a34a', '#f59e0b', '#ec4899', '#8b5cf6', '#06b6d4', '#10b981']
      : ['#22c55e', '#16a34a', '#4ade80', '#86efac', '#166534', '#a3e635'];

    const shapes = type === 'confetti' ? ['square', 'circle', 'strip'] : ['leaf'];

    for (let i = 0; i < count; i++) {
      const el = document.createElement('div');
      const shape = shapes[Math.floor(Math.random() * shapes.length)];
      const color = colors[Math.floor(Math.random() * colors.length)];
      const angle = (Math.random() * 360) * (Math.PI / 180);
      const velocity = 200 + Math.random() * 350;
      const vx = Math.cos(angle) * velocity;
      const vy = Math.sin(angle) * velocity - 150; // upward bias
      const rotation = Math.random() * 720 - 360;
      const size = type === 'confetti' ? 6 + Math.random() * 6 : 12 + Math.random() * 10;
      const duration = 1200 + Math.random() * 800;

      el.className = `rb-confetti-piece rb-confetti-${shape}`;
      el.style.cssText = `
        left: ${centerX}px;
        top: ${centerY}px;
        width: ${shape === 'strip' ? size * 0.35 : size}px;
        height: ${shape === 'leaf' ? size * 1.4 : size}px;
        background: ${color};
        --vx: ${vx}px;
        --vy: ${vy}px;
        --rotation: ${rotation}deg;
        --duration: ${duration}ms;
        animation-duration: ${duration}ms;
      `;

      if (shape === 'leaf') {
        el.innerHTML = '🍃';
        el.style.background = 'none';
        el.style.fontSize = `${size}px`;
      }

      container.appendChild(el);
    }

    // Cleanup after animation
    setTimeout(() => {
      container.remove();
    }, 2500);
  }, []);

  return triggerConfetti;
}

/**
 * FloatingLeaves — ambient background leaf particles (CSS-only)
 * Use on Dashboard/Home for a peaceful eco vibe
 */
export function FloatingLeaves() {
  const leaves = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    emoji: ['🍃', '🌿', '☘️', '🍂'][i % 4],
    left: `${5 + Math.random() * 90}%`,
    delay: `${i * 1.5}s`,
    duration: `${12 + Math.random() * 10}s`,
    size: `${0.6 + Math.random() * 0.6}rem`,
  }));

  return (
    <div className="rb-floating-leaves" aria-hidden="true">
      {leaves.map((l) => (
        <span
          key={l.id}
          className="rb-floating-leaf"
          style={{
            left: l.left,
            animationDelay: l.delay,
            animationDuration: l.duration,
            fontSize: l.size,
          }}
        >
          {l.emoji}
        </span>
      ))}
    </div>
  );
}

/**
 * RideCelebration — full-screen momentary overlay on ride completion
 */
export function RideCelebration({ show, co2Saved = '2.4 kg', onClose }) {
  if (!show) return null;

  return (
    <div className="rb-celebration-overlay" onClick={onClose}>
      <div className="rb-celebration-card" onClick={(e) => e.stopPropagation()}>
        <div className="rb-celebration-emoji">🎉</div>
        <h2 className="rb-celebration-title">Ride Complete!</h2>
        <p className="rb-celebration-text">
          You just saved <strong>{co2Saved}</strong> of CO₂
        </p>
        <div className="rb-celebration-comparisons">
          <div className="rb-celebration-compare">
            <span className="rb-compare-emoji">🌳</span>
            <span className="rb-compare-text">Like planting<br /><strong>0.5 trees</strong></span>
          </div>
          <div className="rb-celebration-compare">
            <span className="rb-compare-emoji">📱</span>
            <span className="rb-compare-text">Like charging<br /><strong>293 phones</strong></span>
          </div>
          <div className="rb-celebration-compare">
            <span className="rb-compare-emoji">💡</span>
            <span className="rb-compare-text">Like powering a home<br /><strong>for 3 hours</strong></span>
          </div>
        </div>
        <button className="rb-btn-primary" onClick={onClose}>
          <i className="bi bi-hand-thumbs-up-fill"></i> Awesome!
        </button>
      </div>
    </div>
  );
}
