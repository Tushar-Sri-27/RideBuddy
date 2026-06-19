import { useState, useEffect } from 'react';
import './CarbonCards.css';

const COMPARISONS = [
  { emoji: '🌳', text: 'Planting {n} trees', factor: 0.21 },
  { emoji: '📱', text: 'Charging {n} phones', factor: 122 },
  { emoji: '💡', text: 'Powering a home for {n} hours', factor: 1.25 },
  { emoji: '🚿', text: '{n} hot showers saved', factor: 0.7 },
  { emoji: '🍔', text: '{n} fewer cheeseburgers', factor: 0.44 },
  { emoji: '🎮', text: '{n} hours of gaming', factor: 5.2 },
];

const DID_YOU_KNOW = [
  'A car emits about 120g of CO₂ per km. Sharing halves that per person!',
  'If every car had one extra passenger, we\'d cut emissions by 32.5%.',
  'Public transport emits 45% less CO₂ per passenger-km than private cars.',
  'Carpooling just twice a week reduces your annual carbon footprint by 1,600 kg.',
  'Traffic congestion causes 25% more emissions than free-flowing traffic.',
  'Electric cars produce zero tailpipe emissions, but manufacturing still has a footprint.',
  'The average Indian commuter spends 7% of their income on transportation.',
  'Shared rides reduce the need for parking by up to 40% in urban areas.',
];

/**
 * CarbonSaved — small inline badge for ride cards
 * @param {number} co2Kg — CO₂ saved in kg
 */
export function CarbonSaved({ co2Kg = 2.4 }) {
  return (
    <div className="rb-carbon-saved">
      <span className="rb-carbon-saved-icon">🌱</span>
      <span>This ride saves ~<strong>{co2Kg} kg</strong> CO₂</span>
    </div>
  );
}

/**
 * CarbonComparison — visual comparison cards showing what CO₂ savings mean
 * @param {number} co2Kg — CO₂ saved in kg
 */
export function CarbonComparison({ co2Kg = 2.4 }) {
  const comparisons = COMPARISONS.slice(0, 3).map((c) => {
    const n = Math.max(1, Math.round(co2Kg * c.factor * 10) / 10);
    return {
      emoji: c.emoji,
      text: c.text.replace('{n}', n.toLocaleString()),
    };
  });

  return (
    <div className="rb-carbon-comparison">
      <div className="rb-carbon-comparison-title">
        <i className="bi bi-arrow-left-right"></i>
        That's equivalent to:
      </div>
      <div className="rb-carbon-comparison-grid">
        {comparisons.map((c, i) => (
          <div key={i} className="rb-carbon-compare-item">
            <span className="rb-carbon-compare-emoji">{c.emoji}</span>
            <span className="rb-carbon-compare-text">{c.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * DidYouKnow — rotating fun fact card
 */
export function DidYouKnow() {
  const [index, setIndex] = useState(Math.floor(Math.random() * DID_YOU_KNOW.length));

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((i) => (i + 1) % DID_YOU_KNOW.length);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="rb-did-you-know">
      <div className="rb-dyk-header">
        <span className="rb-dyk-icon">💡</span>
        <span className="rb-dyk-label">Did you know?</span>
      </div>
      <p className="rb-dyk-text" key={index}>{DID_YOU_KNOW[index]}</p>
    </div>
  );
}
