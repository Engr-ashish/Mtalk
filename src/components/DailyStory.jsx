import React, { useMemo, useState } from 'react';
import { speak } from '../voice/tts.js';
import { hasSTT, onceRecognizer } from '../voice/stt.js';
import { getStoryForLevel } from '../utils/storyBank.js';

export default function DailyStory({ accent='en-US', level='B1', goHome }) {
  const story = useMemo(() => getStoryForLevel(level), [level]);
  const [retell, setRetell] = useState('');

  const listen = () => speak(story.text, accent);

  const doRetell = async () => {
    if (!hasSTT()) { alert('Speech recognition not supported. Try Chrome/Edge.'); return; }
    const text = await onceRecognizer(accent);
    setRetell(text);
    speak('Nice retelling! Use connectors like because, so, however.', accent);
  };

  return (
    <div className="panel">
      <h3>{story.title}</h3>
      <p>{story.text}</p>
      <p><b>Vocabulary:</b> {story.vocab.join(', ')}</p>
      <ol>{story.questions.map((q,i)=><li key={i}>{q}</li>)}</ol>
      <div className="row">
        <button onClick={listen}>Listen</button>
        <button onClick={doRetell}>Retell (record)</button>
        <button onClick={goHome}>Back</button>
      </div>
      {retell && (<div className="panel" style={{marginTop:10}}>
        <b>Your retell:</b> {retell}
      </div>)}
    </div>
  );
}