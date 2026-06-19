import { useEffect, useRef } from 'react';
import './LivingEarth.css';

function LivingEarth() {
  const globeRef = useRef(null);

  // Parallax subtle movement on mouse
  useEffect(() => {
    const handleMove = (e) => {
      if (!globeRef.current) return;
      const x = (e.clientX / window.innerWidth - 0.5) * 8;
      const y = (e.clientY / window.innerHeight - 0.5) * 8;
      globeRef.current.style.transform = `translate(${x}px, ${y}px)`;
    };
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  return (
    <div className="rb-living-earth" ref={globeRef}>
      {/* Outer glow */}
      <div className="rb-earth-glow"></div>

      {/* Globe */}
      <div className="rb-earth-globe">
        {/* Continents (CSS gradient approach) */}
        <div className="rb-earth-surface"></div>

        {/* Atmosphere shimmer */}
        <div className="rb-earth-atmosphere"></div>

        {/* Clouds */}
        <div className="rb-earth-clouds"></div>

        {/* Center highlight */}
        <div className="rb-earth-shine"></div>
      </div>

      {/* Orbiting elements */}
      <div className="rb-orbit rb-orbit-1">
        <span className="rb-orbit-item">🚗</span>
      </div>
      <div className="rb-orbit rb-orbit-2">
        <span className="rb-orbit-item">🌱</span>
      </div>
      <div className="rb-orbit rb-orbit-3">
        <span className="rb-orbit-item">🌳</span>
      </div>

      {/* Floating particles */}
      <div className="rb-earth-particles">
        {Array.from({ length: 8 }, (_, i) => (
          <span
            key={i}
            className="rb-earth-particle"
            style={{
              left: `${15 + Math.random() * 70}%`,
              top: `${15 + Math.random() * 70}%`,
              animationDelay: `${i * 0.6}s`,
              animationDuration: `${3 + Math.random() * 4}s`,
            }}
          >
            {['✨', '🍃', '💚', '☁️'][i % 4]}
          </span>
        ))}
      </div>

      {/* Impact counter overlay */}
      <div className="rb-earth-counter">
        <div className="rb-earth-counter-value">12.8 tons</div>
        <div className="rb-earth-counter-label">CO₂ saved together</div>
      </div>
    </div>
  );
}

export default LivingEarth;
