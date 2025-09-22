export function analyzeFeedback(transcript) {
  const userText = transcript.filter(t=>t.role==='user').map(t=>t.content).join(' ').toLowerCase();
  const words = userText.trim().split(/\s+/).filter(Boolean);
  const turns = transcript.filter(t=>t.role==='user').length || 1;
  const wpm = Math.max(40, Math.min(160, Math.round((words.length / (turns*8)) * 60))); // rough estimate

  const notes = [];

  // Common patterns
  if (userText.includes('i am agree')) notes.push('Say “I agree”, not “I am agree”.');
  if (userText.includes('more better')) notes.push('Say “better”, not “more better”.');
  if (userText.match(/\bdid\b\s+\b(went|saw|ate)\b/)) notes.push('After “did”, use base verb (did go/see/eat).');
  if (userText.includes('in the weekend')) notes.push('Say “on the weekend” (US) or “at the weekend” (UK).');
  if (userText.match(/\bpeoples\b/)) notes.push('Use “people” (plural), not “peoples”.');
  if (userText.match(/\badvices\b/)) notes.push('“Advice” is uncountable: “some advice”.');
  if (userText.match(/\bmore\s+easier\b/)) notes.push('Say “easier”, not “more easier”.');

  if (notes.length === 0) notes.push('Watch verb tenses and articles (a/the). Keep sentences short.');

  const drills = [
    'Shadow 5 sentences about your day.',
    'Practice past simple: Yesterday I + verb-ed.',
    'Use connectors: because, so, but, however.'
  ];

  return {
    summary: 'Great effort! Focus on clear endings and short sentences.',
    grammar: notes,
    wpm,
    drills
  };
}