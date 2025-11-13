import React, { useState } from 'react';

export default function Subjects({ subjects, onTick, onAddSubject, onAddChapter }) {
  const [newSubject, setNewSubject] = useState('');
  const [chapterInputs, setChapterInputs] = useState({});

  return (
    <div className="subjects">
      <h3>📚 Subjects & Chapters</h3>
      <input
        className="rounded-input"
        placeholder="Add subject..."
        value={newSubject}
        onChange={e => setNewSubject(e.target.value)}
      />
      <button
        className="primary-btn"
        onClick={() => { onAddSubject(newSubject); setNewSubject(''); }}>
        ➕ Add Subject
      </button>
      {subjects.map((subj, i) => (
        <div key={i} className="subject-block">
          <div className="subject-title">
            {subj.name} 🎯 {Math.round((subj.chapters.filter(ch => ch.done).length / subj.chapters.length) * 100) || 0}%
          </div>
          <ul>
            {subj.chapters.map((ch, j) => (
              <li key={j} className="chapter-item">
                <input 
                  type="checkbox" 
                  checked={ch.done} 
                  onChange={() => onTick(i, j)} 
                /> {ch.done ? '✅' : '❌'} {ch.name}
              </li>
            ))}
          </ul>
          <input
            className="rounded-input"
            placeholder="Add chapter..."
            value={chapterInputs[i] || ''}
            onChange={e => setChapterInputs({...chapterInputs, [i]: e.target.value})}
          />
          <button
            className="transfer-btn"
            onClick={() => { onAddChapter(i, chapterInputs[i] || ''); setChapterInputs({...chapterInputs, [i]: ''}); }}
          >
            ➕ Add Chapter
          </button>
        </div>
      ))}
    </div>
  );
}
