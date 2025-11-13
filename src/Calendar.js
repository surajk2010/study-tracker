import React from 'react';

function getDaysInMonth(date) {
  const year = date.getFullYear();
  const month = date.getMonth();
  return new Date(year, month + 1, 0).getDate();
}

export default function Calendar({ selectedDate, onDayClick, streakDays, tasks }) {
  const year = selectedDate.getFullYear();
  const month = selectedDate.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const days = getDaysInMonth(selectedDate);

  let calendar = [];
  for (let i = 0; i < firstDay; i++) {
    calendar.push(<div className="calendar-day empty" key={'empty'+i}></div>);
  }
  for (let d = 1; d <= days; d++) {
    const dObj = new Date(year, month, d);
    const dayKey = dObj.toDateString();
    const isStreak = streakDays.includes(dayKey);
    const todaysTasks = tasks[dayKey] || [];
    const hasTask = todaysTasks.length > 0;
    const allDone = todaysTasks.length > 0 && todaysTasks.every(task => task.done);

    let emoji = "🟦";
    if (isStreak) {
      emoji = "🔥"; // explicitly marked as streak
    } else if (allDone) {
      emoji = "⭐"; // all tasks done, but not streak
    } else if (hasTask) {
      emoji = "🔴"; // has at least one incomplete task
    }

    calendar.push(
      <div
        className={`calendar-day${isStreak ? ' streak' : ''}${hasTask && !allDone && !isStreak ? ' missed' : ''}${selectedDate.getDate() === d ? ' selected' : ''}`}
        key={d}
        onClick={() => onDayClick(dObj)}
      >
        <div className="emoji">
          {emoji}
        </div>
        <span>{d}</span>
      </div>
    );
  }

  return (
    <div className="calendar">
      <div className="calendar-header">{selectedDate.toLocaleString('default', { month: 'long' })} {year}</div>
      <div className="calendar-grid">{calendar}</div>
    </div>
  );
}
