import { useState, useEffect, useRef } from 'react';
import './EcoCounter.css';

const ECO_FACTS = [
  { fact: 'One shared ride saves ~2.4 kg of CO₂ — that\'s like charging your phone 293 times!', icon: '📱' },
  { fact: 'If 100 people carpool daily, it removes 40 cars from the road every day.', icon: '🚗' },
  { fact: 'A single tree absorbs about 22 kg of CO₂ per year. Every shared ride helps!', icon: '🌳' },
  { fact: 'Transportation accounts for 27% of greenhouse gas emissions worldwide.', icon: '🌍' },
  { fact: 'Carpooling just twice a week saves over 1,500 kg of CO₂ per year!', icon: '♻️' },
  { fact: 'An average car emits 4.6 metric tons of CO₂ per year. Share to halve it!', icon: '💨' },
  { fact: 'Ride-sharing reduces traffic congestion by up to 33% in urban areas.', icon: '🏙️' },
  { fact: 'By 2030, shared mobility could prevent 170 million tonnes of CO₂ emissions.', icon: '🎯' },
  { fact: 'Every km you carpool saves about 120g of CO₂. Small steps, big impact!', icon: '🦶' },
  { fact: 'India loses ₹1.5 lakh crore annually to traffic congestion. Ride-sharing helps!', icon: '🇮🇳' },
];

// Simulated live counter (increments slowly for demo)
const BASE_CO2 = 12847; // kg
const BASE_CARS = 428;
const BASE_TREES = 583;

function AnimatedNumber({ value, duration = 1500 }) {
  const [display, setDisplay] = useState(0);
  const prevValue = useRef(0);

  useEffect(() => {
    const start = prevValue.current;
    const diff = value - start;
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.floor(start + diff * eased));
      if (progress < 1) requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
    prevValue.current = value;
  }, [value, duration]);

  return <span>{display.toLocaleString('en-IN')}</span>;
}

function EcoCounter() {
  const [expanded, setExpanded] = useState(false);
  const [factIndex, setFactIndex] = useState(0);
  const [co2, setCo2] = useState(BASE_CO2);
  const [cars, setCars] = useState(BASE_CARS);
  const [trees, setTrees] = useState(BASE_TREES);

  // Simulate slow increment
  useEffect(() => {
    const interval = setInterval(() => {
      setCo2((v) => v + Math.floor(Math.random() * 3));
      setCars((v) => v + (Math.random() > 0.7 ? 1 : 0));
      setTrees((v) => v + (Math.random() > 0.8 ? 1 : 0));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Rotate facts
  useEffect(() => {
    const interval = setInterval(() => {
      setFactIndex((i) => (i + 1) % ECO_FACTS.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const currentFact = ECO_FACTS[factIndex];

  return (
    <div className={`rb-eco-counter ${expanded ? 'expanded' : ''}`}>
      {/* Collapsed — small pill */}
      <button
        className="rb-eco-counter-toggle"
        onClick={() => setExpanded(!expanded)}
        aria-label="Toggle eco counter"
      >
        <span className="rb-eco-counter-pulse"></span>
        <span className="rb-eco-counter-icon">🌱</span>
        <span className="rb-eco-counter-mini">
          <AnimatedNumber value={co2} /> kg CO₂
        </span>
        <i className={`bi ${expanded ? 'bi-chevron-down' : 'bi-chevron-up'}`}></i>
      </button>

      {/* Expanded card */}
      {expanded && (
        <div className="rb-eco-counter-card">
          <div className="rb-eco-counter-title">
            <i className="bi bi-globe-americas"></i>
            Live Community Impact
          </div>

          <div className="rb-eco-stats-grid">
            <div className="rb-eco-stat">
              <div className="rb-eco-stat-icon" style={{ background: '#f0fdf4', color: '#16a34a' }}>
                <i className="bi bi-cloud-minus-fill"></i>
              </div>
              <div className="rb-eco-stat-value"><AnimatedNumber value={co2} /> kg</div>
              <div className="rb-eco-stat-label">CO₂ Saved</div>
            </div>
            <div className="rb-eco-stat">
              <div className="rb-eco-stat-icon" style={{ background: '#eff6ff', color: '#2563eb' }}>
                <i className="bi bi-car-front"></i>
              </div>
              <div className="rb-eco-stat-value"><AnimatedNumber value={cars} /></div>
              <div className="rb-eco-stat-label">Cars Off Road</div>
            </div>
            <div className="rb-eco-stat">
              <div className="rb-eco-stat-icon" style={{ background: '#ecfdf5', color: '#059669' }}>
                <i className="bi bi-tree-fill"></i>
              </div>
              <div className="rb-eco-stat-value"><AnimatedNumber value={trees} /></div>
              <div className="rb-eco-stat-label">Trees Equivalent</div>
            </div>
          </div>

          {/* Fun fact */}
          <div className="rb-eco-fact" key={factIndex}>
            <span className="rb-eco-fact-icon">{currentFact.icon}</span>
            <span className="rb-eco-fact-text">{currentFact.fact}</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default EcoCounter;
