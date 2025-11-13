import React from 'react';

const quotes = [
  "🌟 Keep pushing forward!",
  "🚀 You can do hard things!",
  "📈 Small steps every day!",
  "🧠 Study smart, not just hard!",
  "💡 Bright minds never stop learning!"
];

export default function Quotes() {
  const todayIdx = new Date().getDate() % quotes.length;
  return (
    <div className="quote-box">
      <span>{quotes[todayIdx]}</span>
    </div>
  );
}
