import React, {useState} from "react";
import { createRoot } from "react-dom/client";
import {
  ArrowLeft, ArrowRight, Bell, Bus, Check, ChevronDown, Clock3,
  Headphones, Home, MapPin, Menu, Mic, Navigation, Plane, Play,
  Radio, Route, TrainFront, UserRound, Volume2, X, Zap
} from "lucide-react";
import "./styles.css";

const modes = [
  {name:"Smart Road", icon:"road", time:"8 min"},
  {name:"Autonomous Bus", icon:"bus", time:"10 min"},
  {name:"HyperRail", icon:"train", time:"18 min"},
  {name:"SkyLink Air", icon:"air", time:"12 min"}
];

function ModeIcon({type, size=22}) {
  if(type==="bus") return <Bus size={size}/>;
  if(type==="train") return <TrainFront size={size}/>;
  if(type==="air") return <Plane size={size}/>;
  return <Navigation size={size}/>;
}

function App(){
  const [screen,setScreen] = useState("home");
  const [destination,setDestination] = useState("");
  const [voice,setVoice] = useState(false);
  const [live,setLive] = useState(true);
  const [accessible,setAccessible] = useState(false);

  const goSearch = () => {
    setDestination(destination.trim() || "Colombo Central");
    setScreen("journey");
  };

  return (
    <div className={accessible ? "app accessible" : "app"}>
      <header className="topbar">
        <button className="icon-btn" aria-label="menu"><Menu size={22}/></button>
        <div className="brand">
          <span className="brand-mark"><Zap size={15}/></span>
          <span>ORBIT <b>2100</b></span>
        </div>
        <button className="icon-btn" aria-label="notifications"><Bell size={20}/></button>
      </header>

      <main>
        {screen==="home" && (
          <section className="screen">
            <div className="hero">
              <div className="eyebrow"><span className="pulse"></span> CITY NETWORK ONLINE</div>
              <h1>Where do you<br/><span>need to go?</span></h1>
              <p className="muted">One intelligent journey across every transport mode.</p>
            </div>

            <div className="search-card">
              <label>FROM</label>
              <div className="field"><MapPin size={18}/><span>Current location</span></div>
              <div className="swap-line"><span></span><ArrowRight size={15}/></div>
              <label>TO</label>
              <div className="field input-field">
                <MapPin size={18}/>
                <input value={destination} onChange={e=>setDestination(e.target.value)} placeholder="Enter destination"/>
              </div>
              <div className="search-actions">
                <button className="voice-btn" onClick={()=>setVoice(true)}><Mic size={18}/> Voice</button>
                <button className="primary" onClick={goSearch}>Find journey <ArrowRight size={18}/></button>
              </div>
            </div>

            <div className="section-title">
              <div><span className="eyebrow">ORBIT INTELLIGENCE</span><h2>AI recommendation</h2></div>
              <span className="score">94%</span>
            </div>

            <div className="recommend-card" onClick={()=>{setDestination("Colombo Central");setScreen("journey")}}>
              <div className="recommend-top">
                <div className="ai-icon"><Zap size={19}/></div>
                <div><b>Most reliable route</b><p>Predictive traffic + transfer analysis</p></div>
                <ArrowRight size={18}/>
              </div>
              <div className="mini-route">
                <span><Navigation size={14}/> Road</span><i></i><span><Bus size={14}/> Bus</span><i></i><span><TrainFront size={14}/> Rail</span>
              </div>
              <div className="recommend-meta"><b>28 min</b><span>•</span><span>Arrives 08:42</span><span className="on-time">On schedule</span></div>
            </div>

            <div className="section-title small"><div><span className="eyebrow">NETWORK</span><h2>All modes connected</h2></div></div>
            <div className="mode-grid">
              {modes.map(m=><div className="mode-chip" key={m.name}><ModeIcon type={m.icon}/><span>{m.name}</span><small>{m.time}</small></div>)}
            </div>

            <div className="access-card">
              <div><Headphones size={19}/><div><b>Travel your way</b><p>Simple controls, voice guidance and clear updates.</p></div></div>
              <button className={accessible ? "toggle active" : "toggle"} onClick={()=>setAccessible(!accessible)} aria-label="Accessibility mode"><span></span></button>
            </div>
          </section>
        )}

        {screen==="journey" && (
          <section className="screen">
            <button className="back" onClick={()=>setScreen("home")}><ArrowLeft size={19}/> Plan another journey</button>
            <div className="page-head">
              <div><span className="eyebrow">JOURNEY PLAN</span><h1>{destination || "Colombo Central"}</h1><p className="muted">From current location • Today</p></div>
              <div className="live-pill"><span className="pulse"></span> LIVE</div>
            </div>

            <div className="route-summary">
              <div><span className="eyebrow">AI RECOMMENDED</span><div className="big-time">28 <small>min</small></div><p>Arrival 08:42 • 3 connections</p></div>
              <div className="reliability"><b>94%</b><span>reliability</span></div>
            </div>

            <div className="timeline">
              <div className="timeline-item">
                <div className="dot start"></div><div className="line"></div>
                <div className="timeline-content"><span className="eyebrow">08:14</span><h3>Smart Road</h3><p>Autonomous shuttle • Gate 12</p><span className="status">✓ Departed</span></div>
              </div>
              <div className="timeline-item">
                <div className="dot"></div><div className="line"></div>
                <div className="timeline-content"><span className="eyebrow">08:20</span><h3>HyperRail <span className="mode-badge"><TrainFront size={13}/> H-204</span></h3><p>Platform 04 • 19 min</p><span className="status">● On schedule</span></div>
              </div>
              <div className="timeline-item">
                <div className="dot end"></div>
                <div className="timeline-content"><span className="eyebrow">08:42</span><h3>Colombo Central</h3><p>Arrival • Connection complete</p></div>
              </div>
            </div>

            <div className="smart-note"><Zap size={18}/><div><b>ORBIT is watching your connections</b><p>If a delay is detected, we'll suggest the next best option automatically.</p></div></div>
            <button className="primary full" onClick={()=>{setLive(true);setScreen("live")}}><Play size={18}/> Start journey</button>
          </section>
        )}

        {screen==="live" && (
          <section className="screen">
            <button className="back" onClick={()=>setScreen("journey")}><ArrowLeft size={19}/> Journey details</button>
            <div className="page-head">
              <div><span className="eyebrow">LIVE JOURNEY</span><h1>HyperRail H-204</h1><p className="muted">Colombo Central • Platform 04</p></div>
              <div className="live-pill"><span className="pulse"></span> LIVE</div>
            </div>

            <div className="map">
              <div className="map-grid"></div>
              <div className="map-label a">Kurunegala</div>
              <div className="map-label b">COLOMBO</div>
              <div className="route-path"></div>
              <div className="station s1"></div><div className="station s2"></div><div className="station s3"></div>
              <div className="vehicle"><TrainFront size={20}/></div>
              <div className="you"><span></span><b>YOU</b></div>
              <div className="map-status"><Radio size={15}/> Live location</div>
            </div>

            <div className="tracking-card">
              <div className="tracking-top"><div><span className="eyebrow">ARRIVING IN</span><div className="big-time">06 <small>min</small></div></div><div className="on-time-box"><Check size={17}/><b>On schedule</b></div></div>
              <div className="progress"><span></span></div>
              <div className="progress-labels"><span>Kurunegala</span><span>Colombo Central</span></div>
            </div>

            <div className="live-actions">
              <button className="secondary" onClick={()=>setLive(!live)}><Volume2 size={18}/> Voice updates</button>
              <button className="secondary"><Route size={18}/> Full route</button>
            </div>

            <div className="access-card compact"><div><Navigation size={18}/><div><b>Next: Colombo Central</b><p>Platform 04 • Exit B</p></div></div><ChevronDown size={18}/></div>
          </section>
        )}
      </main>

      <nav className="bottom-nav">
        <button className={screen==="home" ? "active" : ""} onClick={()=>setScreen("home")}><Home size={19}/><span>Home</span></button>
        <button onClick={()=>setScreen("journey")}><Route size={19}/><span>Trips</span></button>
        <button><Bell size={19}/><span>Alerts</span></button>
        <button><UserRound size={19}/><span>Profile</span></button>
      </nav>

      {voice && <div className="modal-backdrop" onClick={()=>setVoice(false)}>
        <div className="voice-modal" onClick={e=>e.stopPropagation()}>
          <button className="close" onClick={()=>setVoice(false)}><X size={19}/></button>
          <div className="voice-orb"><Mic size={30}/></div>
          <span className="eyebrow">VOICE SEARCH</span>
          <h2>Where would you like to go?</h2>
          <p className="muted">Try saying “Colombo Central”.</p>
          <button className="primary full" onClick={()=>{setDestination("Colombo Central");setVoice(false);setScreen("journey")}}>Use Colombo Central</button>
        </div>
      </div>}
    </div>
  )
}

createRoot(document.getElementById("root")).render(<App />);
