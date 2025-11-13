import React, { useState } from 'react';

export default function TodoList({ date, tasks, onAdd, onToggle, onTransfer }) {
  const [newTask, setNewTask] = useState('');

  return (
    <div className="todo-list">
      <h3>{date.toDateString()} 📋</h3>
      <ul>
        {tasks.map((task, idx) => 
          <li key={idx} className={task.done ? 'done' : ''}>
            <span onClick={() => onToggle(idx)}>
              {task.done ? '✅' : '❌'} {task.text}
            </span>
          </li>
        )}
      </ul>
      <input 
        type="text" 
        value={newTask} 
        placeholder="Add task..." 
        onChange={e => setNewTask(e.target.value)}
        className="rounded-input"
      />
      <button onClick={() => { onAdd(newTask); setNewTask(''); }} className="primary-btn">
        ➕ Add
      </button>
      <button onClick={onTransfer} className="transfer-btn">
        ⏩ Transfer to Today
      </button>
    </div>
  );
}
