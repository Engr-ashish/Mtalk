import React from 'react';

export default function FeedbackPanel({ feedback }) {
  if (!feedback) return null;
  return (
    <div className="panel">
      <p><b>Summary:</b> {feedback.summary}</p>
      <p><b>Grammar:</b> {feedback.grammar.join(' | ')}</p>
      <p><b>Speed:</b> ~{feedback.wpm} WPM</p>
      <p><b>Drills:</b> {feedback.drills.join(' | ')}</p>
    </div>
  );
}