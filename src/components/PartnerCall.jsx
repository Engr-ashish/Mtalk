import React, { useEffect, useRef, useState } from 'react';

export default function PartnerCall({ goHome }) {
  const [pc, setPc] = useState(null);
  const [json, setJson] = useState('');
  const meRef = useRef(null);
  const youRef = useRef(null);

  useEffect(() => {
    const rtc = new RTCPeerConnection({ iceServers: [{ urls: 'stun:stun.l.google.com:19302' }] });
    rtc.ontrack = (e) => { youRef.current.srcObject = e.streams[0]; };
    rtc.onicecandidate = (e) => setJson(JSON.stringify({ sdp: rtc.localDescription, ice: e.candidate || null }));
    setPc(rtc);

    navigator.mediaDevices.getUserMedia({ audio: true, video: false }).then(stream => {
      meRef.current.srcObject = stream;
      stream.getTracks().forEach(t => rtc.addTrack(t, stream));
    });

    return () => { rtc && rtc.close(); };
  }, []);

  const createOffer = async () => {
    const offer = await pc.createOffer();
    await pc.setLocalDescription(offer);
  };

  const createAnswer = async () => {
    try {
      const data = JSON.parse(json);
      if (data.sdp) await pc.setRemoteDescription(new RTCSessionDescription(data.sdp));
      const answer = await pc.createAnswer();
      await pc.setLocalDescription(answer);
    } catch { alert('Paste the caller offer JSON first.'); }
  };

  const applyRemote = async () => {
    try {
      const data = JSON.parse(json);
      if (data.sdp && pc.signalingState === 'have-local-offer') {
        await pc.setRemoteDescription(new RTCSessionDescription(data.sdp));
      }
      if (data.ice) await pc.addIceCandidate(data.ice);
    } catch { /* ignore */ }
  };

  return (
    <div className="panel">
      <p>Real-person call via WebRTC (peer-to-peer). Copy/paste the text to connect without servers.</p>
      <div className="row">
        <button onClick={createOffer}>Create Offer</button>
        <button onClick={createAnswer}>Join with Answer</button>
        <button onClick={applyRemote}>Apply Remote</button>
        <button onClick={goHome}>Back</button>
      </div>
      <textarea rows={6} style={{width:'100%', marginTop:8}} value={json} onChange={e=>setJson(e.target.value)} placeholder="Offer/Answer JSON here"></textarea>
      <div className="row" style={{marginTop:8}}>
        <button onClick={()=>navigator.clipboard.writeText(json)}>Copy</button>
        <small className="muted">Share via any chat.</small>
      </div>
      <div className="row" style={{marginTop:8}}>
        <video ref={meRef} autoPlay playsInline muted style={{width:'48%', borderRadius:8, background:'#0003'}}></video>
        <video ref={youRef} autoPlay playsInline style={{width:'48%', borderRadius:8, background:'#0003'}}></video>
      </div>
      <small className="muted">Tip: Keep the app open during the call. Mute/unmute from your system.</small>
    </div>
  );
}