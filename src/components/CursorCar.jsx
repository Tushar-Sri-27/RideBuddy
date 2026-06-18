import { useEffect, useRef, useState } from 'react';
import './CursorCar.css';

function CursorCar() {
  const carRef = useRef(null);
  const trailRef = useRef(null);
  const pos = useRef({ x: -100, y: -100 });
  const target = useRef({ x: -100, y: -100 });
  const velocity = useRef(0);
  const angle = useRef(0);
  const prevMouse = useRef({ x: 0, y: 0, time: Date.now() });
  const driftAngle = useRef(0);
  const trails = useRef([]);
  const frameId = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const isTouchDevice = useRef(false);

  useEffect(() => {
    // Don't show on touch devices
    isTouchDevice.current = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice.current) return;

    const handleMouseMove = (e) => {
      if (!isVisible) setIsVisible(true);

      const now = Date.now();
      const dt = Math.max(now - prevMouse.current.time, 1);
      const dx = e.clientX - prevMouse.current.x;
      const dy = e.clientY - prevMouse.current.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const speed = dist / dt;

      target.current = { x: e.clientX, y: e.clientY };
      velocity.current = Math.min(speed * 8, 100);

      // Calculate angle of movement
      if (dist > 2) {
        angle.current = Math.atan2(dy, dx) * (180 / Math.PI);
      }

      // Add trail points when drifting
      if (velocity.current > 30 && trailRef.current) {
        trails.current.push({
          x: e.clientX,
          y: e.clientY,
          opacity: 1,
          id: now + Math.random(),
        });
        // Keep max 18 trail points
        if (trails.current.length > 18) {
          trails.current.shift();
        }
      }

      prevMouse.current = { x: e.clientX, y: e.clientY, time: now };
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isVisible]);

  // Animation loop
  useEffect(() => {
    if (isTouchDevice.current) return;

    const animate = () => {
      // Smooth lerp follow
      const lerp = 0.12;
      pos.current.x += (target.current.x - pos.current.x) * lerp;
      pos.current.y += (target.current.y - pos.current.y) * lerp;

      // Decay velocity
      velocity.current *= 0.92;

      // Calculate drift: extra rotation when fast
      const isDrifting = velocity.current > 25;
      const targetDrift = isDrifting ? Math.sin(Date.now() * 0.008) * 18 : 0;
      driftAngle.current += (targetDrift - driftAngle.current) * 0.1;

      // Apply to car element
      if (carRef.current) {
        const totalAngle = angle.current + driftAngle.current + 90; // +90 because car SVG points up
        const scale = 1 + velocity.current * 0.002;
        carRef.current.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px) rotate(${totalAngle}deg) scale(${scale})`;
        carRef.current.classList.toggle('drifting', isDrifting);
        carRef.current.classList.toggle('idle', velocity.current < 3);
      }

      // Fade out trail points
      trails.current = trails.current.map((t) => ({
        ...t,
        opacity: t.opacity * 0.92,
      })).filter((t) => t.opacity > 0.05);

      // Render trails
      if (trailRef.current) {
        trailRef.current.innerHTML = trails.current
          .map(
            (t) =>
              `<div class="rb-tire-mark" style="left:${t.x}px;top:${t.y}px;opacity:${t.opacity}"></div>`
          )
          .join('');
      }

      frameId.current = requestAnimationFrame(animate);
    };

    frameId.current = requestAnimationFrame(animate);
    return () => {
      if (frameId.current) cancelAnimationFrame(frameId.current);
    };
  }, []);

  if (isTouchDevice.current) return null;

  return (
    <div className={`rb-cursor-car-wrapper ${isVisible ? 'visible' : ''}`}>
      {/* Trail layer */}
      <div ref={trailRef} className="rb-trail-layer" />

      {/* The car */}
      <div ref={carRef} className="rb-cursor-car">
        {/* Smoke particles (CSS animated) */}
        <div className="rb-exhaust">
          <span className="rb-smoke rb-smoke-1"></span>
          <span className="rb-smoke rb-smoke-2"></span>
          <span className="rb-smoke rb-smoke-3"></span>
        </div>

        {/* Car SVG */}
        <svg
          className="rb-car-svg"
          viewBox="0 0 64 64"
          width="38"
          height="38"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Car body */}
          <rect x="18" y="22" width="28" height="26" rx="6" fill="#2563eb" />
          {/* Roof / cabin */}
          <rect x="22" y="12" width="20" height="16" rx="5" fill="#3b82f6" />
          {/* Windshield */}
          <rect x="24" y="14" width="16" height="8" rx="3" fill="#bfdbfe" opacity="0.8" />
          {/* Headlights */}
          <circle cx="24" cy="24" r="2.5" fill="#fbbf24" />
          <circle cx="40" cy="24" r="2.5" fill="#fbbf24" />
          {/* Wheels */}
          <circle cx="23" cy="48" r="5" fill="#1e293b" />
          <circle cx="23" cy="48" r="2.5" fill="#64748b" />
          <circle cx="41" cy="48" r="5" fill="#1e293b" />
          <circle cx="41" cy="48" r="2.5" fill="#64748b" />
          {/* Side stripe */}
          <rect x="18" y="34" width="28" height="3" rx="1.5" fill="#1d4ed8" />
        </svg>

        {/* Drift lines (visible when drifting) */}
        <div className="rb-drift-lines">
          <span></span>
          <span></span>
        </div>
      </div>
    </div>
  );
}

export default CursorCar;
