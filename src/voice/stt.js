export function hasSTT() {
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  return !!SR;
}

export function createRecognizer(lang='en-US', onFinal) {
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  const rec = new SR();
  rec.lang = lang;
  rec.continuous = true;
  rec.interimResults = false;
  rec.onresult = (e) => {
    const last = e.results[e.results.length - 1][0].transcript.trim();
    onFinal && onFinal(last);
  };
  rec.onend = () => {
    // auto-restart to simulate a continuous call
    try { rec.start(); } catch {}
  };
  return rec;
}

export function onceRecognizer(lang='en-US') {
  return new Promise((resolve, reject) => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) return reject(new Error('STT not supported'));
    const rec = new SR();
    rec.lang = lang; rec.continuous = false; rec.interimResults = false;
    rec.onresult = (e) => resolve(e.results[0][0].transcript.trim());
    rec.onerror = (e) => reject(e.error);
    rec.start();
  });
}