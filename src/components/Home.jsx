import React from 'react';

export default function Home({ go, level, accent }) {
  return (
    <div className="panel">
      <p>Welcome to Mtalk. Practice English with an AI avatar or a real person. Everything is free and runs in your browser.</p>
      <div className="grid">
        <div className="card" onClick={()=>go('avatar')}>📞 Call Avatar</div>
        <div className="card" onClick={()=>go('partner')}>👥 Call Partner</div>
        <div className="card" onClick={()=>go('story')}>📖 Daily Story</div>
        <div className="card" onClick={()=>go('games')}>🎮 Games</div>
      </div>
      <small className="muted">Tip: Use Chrome/Edge for best voice recognition. Current: {level}, {accent}</small>
    </div>
  );
}