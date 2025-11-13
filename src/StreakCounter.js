import React from 'react';

export default function StreakCounter({ streakDays }) {
  const currentStreak = calculateStreak(streakDays);

  function calculateStreak(daysArr) {
    // Calculate consecutive streak up to today.
    let streak = 0;
    let today = new Date();
    for (let i = 0; i < daysArr.length; i++) {
      if (daysArr.includes(today.toDateString())) {
        streak++;
        today.setDate(today.getDate() - 1);
      } else {
        break;
      }
    }
    return streak;
  }

  return (
    <div className="streak-counter">
      <span role="img" aria-label="fire" className="big-emoji">🔥</span>
      <span className="streak-num">{currentStreak}</span>
      <span role="img" aria-label="days">days streak!</span>
    </div>
  );
}
