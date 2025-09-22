import React from 'react';

export default function Header({ onNav, route, level, setLevel, accent, setAccent, dark, setDark }) {
  return (
    <header className="header">
      <span className="brand">🗣️ Mtalk</span>
      <button className="primary" onClick={() => onNav('home')}>Home</button>
      <button onClick={() => onNav('avatar')} aria-pressed={route==='avatar'}>Call Avatar</button>
      <button onClick={() => onNav('partner')} aria-pressed={route==='partner'}>Call Partner</button>
      <button onClick={() => onNav('story')} aria-pressed={route==='story'}>Daily Story</button>
      <button onClick={() => onNav('games')} aria-pressed={route==='games'}>Games</button>
      <div className="spacer"></div>
      <select value={level} onChange={(e)=>setLevel(e.target.value)} title="Level">
        <option>A2</option><option>B1</option><option>B2</option>
      </select>
      <select value={accent} onChange={(e)=>setAccent(e.target.value)} title="Accent">
        <option value="en-US">US</option>
        <option value="en-GB">UK</option>
      </select>
      <button onClick={()=>setDark(!dark)}>{dark ? '🌙' : '☀️'}</button>
    </header>
  );
}