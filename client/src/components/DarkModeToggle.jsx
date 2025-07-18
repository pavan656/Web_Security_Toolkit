import React, { useEffect, useState } from 'react';

function DarkModeToggle() {
  const [dark, setDark] = useState(() => {
    return localStorage.getItem('theme') === 'dark';
  });

  useEffect(() => {
    if (dark) {
      document.body.classList.add('bg-dark', 'text-light', 'dark-mode', 'text-muted');
      document.body.classList.remove('light-mode');
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.classList.remove('bg-dark', 'text-light', 'dark-mode');
      document.body.classList.add('light-mode');
      localStorage.setItem('theme', 'light');
    }
  }, [dark]);

  return (
    <button
      className="btn btn-outline-light ms-2"
      onClick={() => setDark(!dark)}
      title="Toggle Dark Mode"
    >
      {dark ? '☀️ Light' : '🌙 Dark'}
    </button>
  );
}

export default DarkModeToggle;
