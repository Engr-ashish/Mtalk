import React, { useEffect, useMemo, useState } from 'react';
import Header from './components/Header.jsx';
import Home from './components/Home.jsx';
import AvatarCall from './components/AvatarCall.jsx';
import PartnerCall from './components/PartnerCall.jsx';
import DailyStory from './components/DailyStory.jsx';
import Games from './components/Games.jsx';
import { load, save } from './utils/storage.js';

export default function App() {
  const [route, setRoute] = useState('home');
  const [accent, setAccent] = useState(load('accent') || 'en-US');
  const [level, setLevel] = useState(load('level') || 'B1');
  const [dark, setDark] = useState(load('dark') === '1');

  useEffect(() => { document.documentElement.className = dark ? 'dark' : ''; }, [dark]);
  useEffect(() => save('accent', accent), [accent]);
  useEffect(() => save('level', level), [level]);
  useEffect(() => save('dark', dark ? '1' : '0'), [dark]);

  const page = useMemo(() => {
    switch (route) {
      case 'avatar': return <AvatarCall accent={accent} level={level} goHome={() => setRoute('home')} />;
      case 'partner': return <PartnerCall goHome={() => setRoute('home')} />;
      case 'story': return <DailyStory accent={accent} level={level} goHome={() => setRoute('home')} />;
      case 'games': return <Games goHome={() => setRoute('home')} />;
      default: return <Home go={(r)=>setRoute(r)} level={level} accent={accent} />;
    }
  }, [route, accent, level]);

  return (
    <div className="wrap">
      <Header
        onNav={setRoute}
        route={route}
        level={level} setLevel={setLevel}
        accent={accent} setAccent={setAccent}
        dark={dark} setDark={setDark}
      />
      {page}
      <footer className="foot">Mtalk • Free, private, and fun • Data stays on your device</footer>
    </div>
  );
}