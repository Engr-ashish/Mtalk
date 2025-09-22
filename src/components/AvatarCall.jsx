import React, { useEffect, useRef, useState } from 'react';
import { speak } from '../voice/tts.js';
import { createRecognizer, hasSTT } from '../voice/stt.js';
import { coachReply } from '../ai/lite.js';
import { analyzeFeedback } from '../ai/feedback.js';

export default function AvatarCall({ accent = 'en-US', level = 'B1', goHome }) {
  const [active, setActive] = useState(false);
  const [log, setLog] = useState([]);
  const recRef = useRef(null);

  function add(role, content) { setLog((l) => [...l, { role, content }]); }

  const start = async () => {
    if (!hasSTT()) { alert('Speech recognition not supported in this browser. Try Chrome/Edge.'); return; }
    setActive(true);
    const hi = `Hi! I'm your Mtalk coach. Let's have a short ${level} chat. How are you today?`;
    add('assistant', hi); speak(hi, accent);
    const rec = createRecognizer(accent, (text) => {
      add('user', text);
      const reply = coachReply(text, level);
      add('assistant', reply);
      speak(reply, accent);
    });
    recRef.current = rec;
    rec.start();
  };

  const stop = () => {
    setActive(false);
    try { recRef.current && recRef.current.stop(); } catch {}
    const fb = analyzeFeedback(log);
    const summary = `Feedback:
- ${fb.summary}
- Grammar: ${fb.grammar.join(' | ')}
- Speed: ~${fb.wpm} WPM
- Drills: ${fb.drills.join(' | ')}`;
    add('assistant', summary);
    speak('Great job! Check your feedback on screen.', accent);
  };

  return (
    <div className="panel">
      <div className="row">
        <button onClick={start} disabled={active}>Start Call</button>
        <button onClick={stop} disabled={!active}>Stop</button>
        <button onClick={goHome}>Back</button>
      </div>
      <div className="bubbles" style={{marginTop:8}}>
        {log.map((t, i) => (
          <div key={i} className={`bubble ${t.role === 'user' ? 'me' : 'ai'}`}>{t.content}</div>
        ))}
      </div>
    </div>
  );
}