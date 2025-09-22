import React, { useState } from 'react';

export default function Games({ goHome }) {
  const [view, setView] = useState('');

  return (
    <div className="panel">
      <div className="row">
        <button onClick={()=>setView('sb')}>Sentence Builder</button>
        <button onClick={()=>setView('ws')}>Word Sprint</button>
        <button onClick={goHome}>Back</button>
      </div>
      {view==='sb' && <SentenceBuilder />}
      {view==='ws' && <WordSprint />}
      {!view && <p>Select a game to start.</p>}
    </div>
  );
}

function SentenceBuilder(){
  const target = "I usually go to the gym after work.";
  const [shuffled, setShuffled] = useState(["after","I","usually","work.","to","gym","the","go"].sort(()=>Math.random()-0.5));
  const [ans, setAns] = useState('');
  const [done, setDone] = useState(false);
  function pick(w){
    const a = (ans + ' ' + w).trim();
    setAns(a);
    if (a.endsWith('.')) setDone(true);
  }
  const ok = ans === target;
  return (
    <div style={{marginTop:10}}>
      <p>Build the sentence:</p>
      <div className="row" style={{flexWrap:'wrap'}}>
        {shuffled.map((w,i)=><button key={i} className="w" onClick={()=>pick(w)} disabled={ans.split(' ').includes(w)}>{w}</button>)}
      </div>
      <p><b>Your answer:</b> {ans}</p>
      {done && <p>{ok ? '✅ Correct!' : '❌ Try again (reload or pick different order).'}</p>}
    </div>
  );
}

function WordSprint(){
  const items = [
    {prompt:'big →', answers:['large','huge']},
    {prompt:'start →', answers:['begin','commence']},
    {prompt:'help →', answers:['assist','aid']}
  ];
  const [i, setI] = useState(0);
  const [score, setScore] = useState(0);
  const [v, setV] = useState('');
  const next = ()=>{
    if (items[i].answers.includes(v.trim().toLowerCase())) setScore(s=>s+1);
    setV(''); setI(i+1);
  };
  if (i>=items.length) return <p>Score: {score}/{items.length}</p>;
  return (
    <div style={{marginTop:10}}>
      <p>Type a synonym: <b>{items[i].prompt}</b></p>
      <input value={v} onChange={(e)=>setV(e.target.value)} /> <button onClick={next}>OK</button>
    </div>
  );
}