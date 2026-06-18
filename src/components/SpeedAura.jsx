import { useEffect, useRef, useState, useCallback } from 'react';
import './SpeedAura.css';

const SLOW_MESSAGES = [
  { text: "You're a safe driver", icon: '🛡️' },
  { text: 'This car is in good hands', icon: '💚' },
  { text: 'Smooth driving, keep it up!', icon: '🌿' },
  { text: 'Safety first — always', icon: '🌟' },
  { text: 'Calm roads, happy journeys', icon: '🌤️' },
  { text: 'Patience makes perfect drivers', icon: '🧘' },
  { text: 'A gentle ride is a great ride', icon: '🍃' },
];

const FAST_MESSAGES = [
  { text: 'Easy there, speed racer!', icon: '🏎️' },
  { text: "Someone's waiting for you at home", icon: '💛' },
  { text: 'Slow down, enjoy the ride', icon: '🌅' },
  { text: 'The road is not a racetrack', icon: '🚦' },
  { text: "Hey! Let's keep it safe", icon: '⚠️' },
  { text: 'Your loved ones need you safe', icon: '🏠' },
  { text: 'Arrive alive — slow down', icon: '💙' },
  { text: 'Fast lanes, risky games', icon: '🎯' },
];

function SpeedAura({ children }) {
  const [speedLevel, setSpeedLevel] = useState('calm'); // calm | moderate | fast | danger
  const [message, setMessage] = useState(null);
  const [messageVisible, setMessageVisible] = useState(false);
  const velocityRef = useRef(0);
  const prevMouse = useRef({ x: 0, y: 0, time: Date.now() });
  const smoothVelocity = useRef(0);
  const messageTimeout = useRef(null);
  const lastMessageTime = useRef(0);
  const lastMessageIndex = useRef({ slow: -1, fast: -1 });
  const frameId = useRef(null);

  // Pick a random message without repeating the last one
  const pickMessage = useCallback((pool, key) => {
    let idx;
    do {
      idx = Math.floor(Math.random() * pool.length);
    } while (idx === lastMessageIndex.current[key] && pool.length > 1);
    lastMessageIndex.current[key] = idx;
    return pool[idx];
  }, []);

  // Show a message with fade in/out
  const showMessage = useCallback((msg) => {
    const now = Date.now();
    if (now - lastMessageTime.current < 3000) return; // Throttle: 3s between messages
    lastMessageTime.current = now;

    setMessage(msg);
    setMessageVisible(true);

    if (messageTimeout.current) clearTimeout(messageTimeout.current);
    messageTimeout.current = setTimeout(() => {
      setMessageVisible(false);
    }, 2800);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const now = Date.now();
      const dt = Math.max(now - prevMouse.current.time, 1);
      const dx = e.clientX - prevMouse.current.x;
      const dy = e.clientY - prevMouse.current.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const speed = (dist / dt) * 10; // Normalized speed value

      velocityRef.current = speed;
      prevMouse.current = { x: e.clientX, y: e.clientY, time: now };
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Animation loop for smooth transitions
  useEffect(() => {
    let sustainedFastCount = 0;
    let sustainedSlowCount = 0;

    const animate = () => {
      // Smooth the velocity
      smoothVelocity.current += (velocityRef.current - smoothVelocity.current) * 0.08;
      velocityRef.current *= 0.95; // Decay

      const v = smoothVelocity.current;

      // Determine speed level
      let level;
      if (v < 5) {
        level = 'calm';
        sustainedFastCount = 0;
        sustainedSlowCount++;
      } else if (v < 18) {
        level = 'moderate';
        sustainedFastCount = 0;
        sustainedSlowCount = 0;
      } else if (v < 35) {
        level = 'fast';
        sustainedFastCount++;
        sustainedSlowCount = 0;
      } else {
        level = 'danger';
        sustainedFastCount++;
        sustainedSlowCount = 0;
      }

      setSpeedLevel(level);

      // Trigger messages based on sustained speed
      if (sustainedFastCount === 40) { // ~0.7s of fast movement
        showMessage(pickMessage(FAST_MESSAGES, 'fast'));
      }
      if (sustainedSlowCount === 120) { // ~2s of calm
        showMessage(pickMessage(SLOW_MESSAGES, 'slow'));
        sustainedSlowCount = 0; // Reset so it can trigger again
      }

      frameId.current = requestAnimationFrame(animate);
    };

    frameId.current = requestAnimationFrame(animate);
    return () => {
      if (frameId.current) cancelAnimationFrame(frameId.current);
      if (messageTimeout.current) clearTimeout(messageTimeout.current);
    };
  }, [showMessage, pickMessage]);

  const isFast = speedLevel === 'fast' || speedLevel === 'danger';

  return (
    <div className={`rb-speed-aura rb-speed-${speedLevel}`}>
      {/* Subtle gradient overlay */}
      <div className="rb-aura-overlay" />

      {/* Floating speed indicator */}
      <div className="rb-speed-indicator">
        <div className="rb-speed-dot" />
        <span className="rb-speed-label">
          {speedLevel === 'calm' && 'Safe'}
          {speedLevel === 'moderate' && 'Cruising'}
          {speedLevel === 'fast' && 'Too Fast!'}
          {speedLevel === 'danger' && 'Slow Down!'}
        </span>
      </div>

      {/* Message toast */}
      <div className={`rb-aura-message ${messageVisible ? 'visible' : ''} ${isFast ? 'warn' : 'safe'}`}>
        {message && (
          <>
            <span className="rb-aura-message-icon">{message.icon}</span>
            <span className="rb-aura-message-text">{message.text}</span>
          </>
        )}
      </div>

      {children}
    </div>
  );
}

export default SpeedAura;
