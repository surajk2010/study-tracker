import React, { useState } from 'react';
import Calendar from './Calendar';
import TodoList from './TodoList';
import StreakCounter from './StreakCounter';
import Subjects from './Subjects';
import Quotes from './Quotes';
import './App.css';

function App() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [tasks, setTasks] = useState({});
  const [streakDays, setStreakDays] = useState([]);
  const [subjects, setSubjects] = useState([
    { name: 'Math', chapters: [{ name: 'Algebra', done: false }, { name: 'Geometry', done: false }] },
    { name: 'Science', chapters: [{ name: 'Physics', done: false }, { name: 'Chemistry', done: false }] }
  ]);

  const handleDayClick = (date) => setSelectedDate(date);

  const handleAddTask = (date, task) => {
    const dateKey = date.toDateString();
    setTasks({
      ...tasks,
      [dateKey]: [...(tasks[dateKey] || []), { text: task, done: false }]
    });
  };

  const handleToggleTask = (date, idx) => {
    const dateKey = date.toDateString();
    const updatedTasks = (tasks[dateKey] || []).map((t, i) => 
      i === idx ? { ...t, done: !t.done } : t
    );
    setTasks({ ...tasks, [dateKey]: updatedTasks });
  };

  const markStreak = (date, isStreak) => {
    const dateStr = date.toDateString();
    if (isStreak) {
      setStreakDays([...new Set([...streakDays, dateStr])]);
    } else {
      setStreakDays(streakDays.filter(d => d !== dateStr));
    }
  };

  const transferTasksToToday = (fromDate) => {
    const fromKey = fromDate.toDateString();
    const todayKey = (new Date()).toDateString();
    setTasks({
      ...tasks,
      [todayKey]: [...(tasks[todayKey] || []), ...(tasks[fromKey] || [])]
    });
  };

  const handleChapterDone = (subjectIdx, chapterIdx) => {
    const updatedSubjects = subjects.map((subj, i) => (
      i === subjectIdx
        ? { ...subj, chapters: subj.chapters.map((ch, j) => 
            j === chapterIdx ? { ...ch, done: !ch.done } : ch
          ) }
        : subj
    ));
    setSubjects(updatedSubjects);
  };

  const handleAddSubject = (name) => {
    if (name.trim()) {
      setSubjects([...subjects, { name, chapters: [] }]);
    }
  };

  const handleAddChapter = (subjectIdx, name) => {
    if (name.trim()) {
      setSubjects(subjects.map((subj, i) =>
        i === subjectIdx
          ? { ...subj, chapters: [...subj.chapters, { name, done: false }] }
          : subj
      ));
    }
  };

  return (
    <div className="container">
      <Quotes />
      <StreakCounter streakDays={streakDays} />

      <button
        className="primary-btn"
        onClick={() => markStreak(selectedDate, true)}
      >
        🔥 Mark as Streak
      </button>
      <button
        className="transfer-btn"
        onClick={() => markStreak(selectedDate, false)}
        style={{ marginLeft: '10px' }}
      >
        ❌ Break Streak
      </button>

      <div className="calendar-todo">
        <Calendar 
          selectedDate={selectedDate}
          onDayClick={handleDayClick}
          streakDays={streakDays}
          tasks={tasks}
        />
        <TodoList
          date={selectedDate}
          tasks={tasks[selectedDate.toDateString()] || []}
          onAdd={task => handleAddTask(selectedDate, task)}
          onToggle={idx => handleToggleTask(selectedDate, idx)}
          onTransfer={() => transferTasksToToday(selectedDate)}
        />
      </div>
      <Subjects
        subjects={subjects}
        onTick={handleChapterDone}
        onAddSubject={handleAddSubject}
        onAddChapter={handleAddChapter}
      />
    </div>
  );
}

export default App;
