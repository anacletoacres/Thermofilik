import { useState, useEffect, useRef } from "react";

// ─── THEME ──────────────────────────────────────────────
const T = {
  soil: "#2E1F0F", soilMid: "#4A3728", soilLight: "#6B5744",
  bark: "#8B7355", clay: "#C4956A",
  sand: "#E8D5B7", sandLight: "#F2E8D5",
  parchment: "#FAF5EC", cream: "#FFFDF8",
  leaf: "#4E7A3E", leafBright: "#6AA84F", leafDark: "#2D5A1E",
  leafMuted: "#7FA870", leafBg: "#EDF5E8", leafBgDeep: "#D5E8CA",
  sprout: "#A8C96A", moss: "#5A7247",
  amber: "#D4920B", amberWarm: "#E8A830", amberBg: "#FEF6E0",
  terra: "#C26840", terraBg: "#FCEEE5",
  water: "#5B8FA8", waterBg: "#E8F2F6",
  white: "#FFFFFF", danger: "#C25050", dangerBg: "#FDE8E8",
};

// ─── ICONS ──────────────────────────────────────────────
const I = {
  Leaf: ({ s = 20, c = T.leaf }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M11 20A7 7 0 0 1 9.8 6.9C15.5 4.9 17 3.5 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/></svg>,
  Thermo: ({ s = 20, c = T.terra }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z"/></svg>,
  Drop: ({ s = 20, c = T.water }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z"/></svg>,
  Rotate: ({ s = 20, c = T.soilMid }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/></svg>,
  Home: ({ s = 20, c = T.bark }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
  Chart: ({ s = 20, c = T.bark }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/></svg>,
  Sprout: ({ s = 20, c = T.leafBright }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M7 20h10"/><path d="M10 20c5.5-2.5.8-6.4 3-10"/><path d="M9.5 9.4c1.1.8 1.8 2.2 2.3 3.7-2 .4-3.5.4-4.8-.3-1.2-.6-2.3-1.9-3-4.2 2.8-.5 4.4 0 5.5.8z"/><path d="M14.1 6a7 7 0 0 0-1.1 4c1.9-.1 3.3-.6 4.3-1.4 1-1 1.6-2.3 1.7-4.6-2.7.1-4 1-4.9 2z"/></svg>,
  Nfc: ({ s = 20, c = T.bark }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M6 8.32a7.43 7.43 0 0 1 0 7.36"/><path d="M9.46 6.21a11.76 11.76 0 0 1 0 11.58"/><path d="M12.91 4.1a15.91 15.91 0 0 1 .01 15.8"/><path d="M16.37 2a20.16 20.16 0 0 1 0 20"/></svg>,
  Bt: ({ s = 20, c = T.water }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="m7 7 10 10-5 5V2l5 5L7 17"/></svg>,
  Battery: ({ s = 20, c = T.leaf }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect width="16" height="10" x="2" y="7" rx="2"/><line x1="22" x2="22" y1="11" y2="13"/><rect width="8" height="4" x="4" y="9" rx="1" fill={c} opacity="0.3"/></svg>,
  Gear: ({ s = 20, c = T.bark }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>,
  Check: ({ s = 20, c = T.leaf }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>,
  Phone: ({ s = 20, c = T.bark }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect width="14" height="20" x="5" y="2" rx="2"/><line x1="12" x2="12.01" y1="18" y2="18"/></svg>,
  Wind: ({ s = 20, c = T.bark }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M17.7 7.7a2.5 2.5 0 1 1 1.8 4.3H2"/><path d="M9.6 4.6A2 2 0 1 1 11 8H2"/><path d="M12.6 19.4A2 2 0 1 0 14 16H2"/></svg>,
  X: ({ s = 20, c = T.bark }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round"><path d="M18 6 6 18M6 6l12 12"/></svg>,
  Help: ({ s = 20, c = T.bark }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/></svg>,
  Sun: ({ s = 20, c = T.amber }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>,
};

// ─── MOCK DATA ──────────────────────────────────────────
const MODULE = { id: "TK-0042", battery: 94, lastSync: "2 min ago", connected: true, firmware: "1.0.3" };

const PHASES = [
  { name: "Mesophilic", short: "Meso", range: "1–5", done: true },
  { name: "Thermophilic", short: "Thermo", range: "5–30", active: true },
  { name: "Cooling", short: "Cool", range: "30–38", done: false },
  { name: "Curing", short: "Cure", range: "38–45", done: false },
];

const DAILY_SCORES = [
  { d: "2/10", s: 1.2 }, { d: "2/12", s: 3.4 }, { d: "2/14", s: 5.8 },
  { d: "2/16", s: 7.1 }, { d: "2/18", s: 8.5 }, { d: "2/20", s: 9.2 },
  { d: "2/22", s: 8.8 }, { d: "2/24", s: 8.3 }, { d: "2/26", s: 8.3 },
];

const TEMP_HISTORY = [
  { d: "2/10", v: 72 }, { d: "2/12", v: 95 }, { d: "2/14", v: 118 },
  { d: "2/16", v: 135 }, { d: "2/18", v: 148 }, { d: "2/20", v: 155 },
  { d: "2/22", v: 150 }, { d: "2/24", v: 142 }, { d: "2/26", v: 142 },
];

const HOURLY_TEMPS = [
  { h: "2AM", a: 42, i: 68 }, { h: "3AM", a: 41, i: 69 }, { h: "4AM", a: 40, i: 70 },
  { h: "5AM", a: 40, i: 71 }, { h: "6AM", a: 41, i: 70 }, { h: "7AM", a: 44, i: 69 },
  { h: "8AM", a: 48, i: 68 }, { h: "9AM", a: 55, i: 68 }, { h: "10AM", a: 60, i: 69 },
  { h: "11AM", a: 64, i: 71 }, { h: "12PM", a: 67, i: 72 }, { h: "1PM", a: 68, i: 72 },
];

const ACTIVITY = [
  { time: "Today, 6:12 AM", action: "Tumbled — 5 rotations detected", icon: "Rotate" },
  { time: "Yesterday, 7:00 PM", action: "Added kitchen scraps (2 lbs)", icon: "Sprout" },
  { time: "Yesterday, 6:30 AM", action: "Tumbled — 5 rotations detected", icon: "Rotate" },
  { time: "Feb 23, 8:15 AM", action: "Switched airflow to Open", icon: "Wind" },
  { time: "Feb 22, 6:00 AM", action: "Tumbled — 5 rotations detected", icon: "Rotate" },
  { time: "Feb 21, 4:30 PM", action: "Added yard waste (5 lbs)", icon: "Leaf" },
];

const HELP_CONTENT = {
  temp: { title: "Estimated Pile Temperature", body: "This is calculated using the Comparator's Activity Score combined with your fill level setting. The algorithm uses the pre-dawn temperature differential (TDIFF) between the ambient and internal wall sensors to estimate what's happening deep inside your pile — without any probes touching the compost.\n\nHigher temperatures (130–160°F) indicate active thermophilic decomposition. The pre-dawn window avoids solar radiation interference for accurate readings." },
  activity: { title: "Activity Score", body: "The Comparator module samples both temperature sensors every 15 minutes during a 5-hour pre-dawn window (before sunrise). The average temperature differential across ~21 samples becomes that day's Activity Score.\n\nA higher score means more microbial heat generation = faster composting. Scores typically rise during the thermophilic phase and decrease as compost matures." },
  fill: { title: "Fill Level", body: "Tell the app how full your tumbler is on a scale of 1–10. This is a key input to the temperature estimation algorithm — a fuller tumbler generates and retains more heat. Update this whenever you add or remove material.\n\nThe fill level combined with the Activity Score lets the app estimate internal pile temperature without invasive probes." },
  airflow: { title: "Airflow Door Position", body: "Your tumbler door has two sides:\n\n• Cavity side (open): A cutout on the bottom of the door aligns with the container's airway, allowing fresh air in for aerobic composting.\n\n• Non-cavity side (closed): Blocks the airway to retain heat during cold weather or windy conditions.\n\nLook for the air cavity indicator on your door to identify which side is which." },
  tumble: { title: "Tumble Tracking", body: "The Comparator's IMU (motion sensor) automatically detects when you spin the tumbler. It looks for the z-axis flipping from +g to -g to +g within 5 minutes — that's at least 1.5 full rotations.\n\nRegular tumbling (every 24-48 hours) introduces oxygen that aerobic bacteria need to break down organic matter efficiently." },
  moisture: { title: "Moisture Level", body: "Set your compost's moisture level to help refine temperature estimates. Ideal compost should feel like a wrung-out sponge.\n\n• Dry: Add water or green materials\n• Moist: Perfect — keep going\n• Wet: Add brown materials (cardboard, dry leaves) to absorb excess" },
  phase: { title: "Composting Phases", body: "Mesophilic (Day 1–5): Moderate-temperature bacteria begin breaking down easy-to-digest materials. Pile warms from ambient to ~105°F.\n\nThermophilic (Day 5–30): Heat-loving bacteria take over. Temperatures reach 130–160°F, killing pathogens and weed seeds. This is peak composting.\n\nCooling (Day 30–38): Activity slows, temperature drops. Different organisms move in to finish breakdown.\n\nCuring (Day 38–45): Compost matures and stabilizes. Ready to use in your garden!" },
  module: { title: "Comparator Module", body: "The Comparator is a sealed sensor module that mounts on your tumbler door. It has no buttons or LEDs — all interaction happens through this app via Bluetooth.\n\nIt measures ambient (outside air) and internal (wall) temperatures to estimate compost activity. The module wakes when you tap your phone's NFC near it, or when the IMU detects tumbler rotation.\n\nUSB-C rechargeable with 1+ year battery life between charges." },
};

// ─── SPARKLINE ──────────────────────────────────────────
function Spark({ data, valKey = "s", color = T.terra, h = 40, showDots = false, labels = false }) {
  const vals = data.map(d => typeof d === "number" ? d : d[valKey] || d.v || d.s || 0);
  const max = Math.max(...vals), min = Math.min(...vals);
  const range = max - min || 1;
  const w = 200;
  const pts = vals.map((v, i) => ({
    x: (i / (vals.length - 1)) * w,
    y: h - ((v - min) / range) * (h - 12) - 6,
  }));
  const linePath = pts.map((p, i) => `${i === 0 ? "M" : "L"}${p.x},${p.y}`).join(" ");
  const areaPath = `M0,${h} L${pts.map(p => `${p.x},${p.y}`).join(" L")} L${w},${h} Z`;

  return (
    <div>
      <svg viewBox={`0 0 ${w} ${h}`} style={{ width: "100%", height: h, display: "block" }} preserveAspectRatio="none">
        <defs>
          <linearGradient id={`sp-${color.replace("#","")}-${h}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.18" />
            <stop offset="100%" stopColor={color} stopOpacity="0.02" />
          </linearGradient>
        </defs>
        <path d={areaPath} fill={`url(#sp-${color.replace("#","")}-${h})`} />
        <path d={linePath} fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        {showDots && pts.map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r={i === pts.length - 1 ? 4 : 2.5}
            fill={i === pts.length - 1 ? T.cream : color} stroke={color}
            strokeWidth={i === pts.length - 1 ? 2 : 0} />
        ))}
      </svg>
      {labels && (
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 4 }}>
          {data.map((d, i) => (
            <div key={i} style={{ textAlign: "center", minWidth: 0 }}>
              <div style={{ fontSize: 9, fontWeight: 600, color: T.soil }}>{vals[i]}</div>
              <div style={{ fontSize: 8, color: T.bark }}>{d.d || d.h || ""}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── MODAL OVERLAY ──────────────────────────────────────
function Modal({ open, onClose, children }) {
  if (!open) return null;
  return (
    <div style={{
      position: "absolute", inset: 0, zIndex: 100,
      background: "rgba(46,31,15,0.45)", backdropFilter: "blur(3px)",
      display: "flex", flexDirection: "column", justifyContent: "flex-end",
    }} onClick={onClose}>
      <div onClick={e => e.stopPropagation()} style={{
        background: T.cream, borderRadius: "20px 20px 0 0",
        maxHeight: "80%", overflowY: "auto",
        boxShadow: `0 -8px 30px ${T.soil}22`,
      }}>
        <div style={{ display: "flex", justifyContent: "center", padding: "10px 0 4px" }}>
          <div style={{ width: 36, height: 4, borderRadius: 2, background: T.sand }} />
        </div>
        {children}
      </div>
    </div>
  );
}

// ─── HELP MODAL ─────────────────────────────────────────
function HelpModal({ open, onClose, helpKey }) {
  const content = HELP_CONTENT[helpKey];
  if (!content) return null;
  return (
    <Modal open={open} onClose={onClose}>
      <div style={{ padding: "8px 22px 28px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
          <h3 style={{ margin: 0, fontSize: 18, fontWeight: 700, fontFamily: "'Fraunces', serif", color: T.soil }}>{content.title}</h3>
          <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", padding: 4 }}>
            <I.X s={20} c={T.bark} />
          </button>
        </div>
        {content.body.split("\n\n").map((p, i) => (
          <p key={i} style={{ margin: "0 0 12px", fontSize: 13, color: T.soilLight, lineHeight: 1.7 }}>{p}</p>
        ))}
      </div>
    </Modal>
  );
}

// ─── HELP BUTTON ────────────────────────────────────────
function HelpBtn({ onClick }) {
  return (
    <button onClick={e => { e.stopPropagation(); onClick(); }} style={{
      width: 22, height: 22, borderRadius: 11, border: `1.5px solid ${T.sand}`,
      background: T.parchment, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
      padding: 0, flexShrink: 0,
    }}>
      <I.Help s={13} c={T.bark} />
    </button>
  );
}

// ─── TAPPABLE CARD ──────────────────────────────────────
function TapCard({ children, onClick, style = {} }) {
  return (
    <div onClick={onClick} style={{
      borderRadius: 14, background: T.cream, border: `1px solid ${T.sand}`,
      cursor: onClick ? "pointer" : "default",
      transition: "transform 0.15s, box-shadow 0.15s",
      ...style,
    }}
      onMouseDown={e => { if (onClick) { e.currentTarget.style.transform = "scale(0.98)"; } }}
      onMouseUp={e => { e.currentTarget.style.transform = "none"; }}
      onMouseLeave={e => { e.currentTarget.style.transform = "none"; }}
    >
      {children}
    </div>
  );
}

// ─── HOME SCREEN ────────────────────────────────────────
function HomeScreen({ onModal, onHelp, batch, setBatch }) {
  return (
    <div style={{ padding: "0 20px 24px" }}>
      {/* Hero: Estimated Pile Temp — tappable */}
      <TapCard onClick={() => onModal("tempTrend")} style={{
        padding: 0, overflow: "hidden", marginBottom: 14,
        background: `linear-gradient(145deg, ${T.leafDark} 0%, ${T.leaf} 60%, ${T.moss} 100%)`,
        border: "none",
      }}>
        <div style={{ padding: "24px 20px 20px", position: "relative" }}>
          <div style={{ position: "absolute", top: -20, right: -20, opacity: 0.06 }}>
            <svg width="140" height="140"><circle cx="70" cy="70" r="60" fill="white"/></svg>
          </div>
          <div style={{ position: "relative", zIndex: 1 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: 1.2, textTransform: "uppercase", color: "rgba(255,255,255,0.65)" }}>
                Estimated Pile Temperature
              </div>
              <button onClick={e => { e.stopPropagation(); onHelp("temp"); }} style={{
                background: "rgba(255,255,255,0.15)", border: "none", borderRadius: 10,
                width: 24, height: 24, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <I.Help s={14} c="rgba(255,255,255,0.7)" />
              </button>
            </div>
            <div style={{ display: "flex", alignItems: "baseline", gap: 4, marginTop: 2 }}>
              <span style={{ fontSize: 52, fontWeight: 700, fontFamily: "'Fraunces', serif", lineHeight: 1, color: T.white }}>{batch.temp}</span>
              <span style={{ fontSize: 18, color: "rgba(255,255,255,0.6)" }}>°F</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 6 }}>
              <span style={{ fontSize: 11, color: "rgba(255,255,255,0.7)" }}>{batch.phase} Phase — Day {batch.day}</span>
              <span style={{ fontSize: 10, color: "rgba(255,255,255,0.45)" }}>Tap for trend →</span>
            </div>
          </div>
          {/* Activity score badge */}
          <div style={{
            position: "absolute", top: 20, right: 20, marginTop: 28,
            background: "rgba(255,255,255,0.15)", borderRadius: 14, padding: "8px 12px",
            textAlign: "center", backdropFilter: "blur(4px)", cursor: "pointer",
          }} onClick={e => { e.stopPropagation(); onModal("activityDetail"); }}>
            <div style={{ fontSize: 22, fontWeight: 700, fontFamily: "'Fraunces', serif", color: T.white }}>{batch.activityScore}</div>
            <div style={{ fontSize: 8, fontWeight: 600, textTransform: "uppercase", letterSpacing: 0.8, color: "rgba(255,255,255,0.7)" }}>Activity</div>
          </div>
        </div>
      </TapCard>

      {/* Module status */}
      <TapCard onClick={() => onModal("moduleStatus")} style={{
        padding: "10px 14px", marginBottom: 14,
        display: "flex", alignItems: "center", gap: 8,
        background: MODULE.connected ? T.leafBg : T.dangerBg,
        border: `1px solid ${MODULE.connected ? T.leafBgDeep : T.danger+"33"}`,
      }}>
        <I.Bt s={15} c={MODULE.connected ? T.leaf : T.danger} />
        <span style={{ fontSize: 11, fontWeight: 600, color: MODULE.connected ? T.leafDark : T.danger, flex: 1 }}>
          {MODULE.connected ? "Connected" : "Disconnected"} — {MODULE.id}
        </span>
        <I.Battery s={14} c={T.leaf} />
        <span style={{ fontSize: 10, fontWeight: 600, color: T.bark }}>{MODULE.battery}%</span>
      </TapCard>

      {/* Quick stats — all tappable */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginBottom: 14 }}>
        {[
          { key: "tumble", label: "Last Tumble", val: batch.lastTumble, icon: "Rotate", ac: T.soilMid, help: "tumble" },
          { key: "fill", label: "Fill Level", val: `${batch.fillLevel}/10`, icon: "Drop", ac: T.water, help: "fill", modal: "fillAdjust" },
          { key: "airflow", label: "Airflow", val: batch.airflow === "open" ? "Open" : "Closed", icon: "Wind", ac: batch.airflow === "open" ? T.leaf : T.bark, help: "airflow", modal: "airflowAdjust" },
        ].map(s => {
          const Ic = I[s.icon];
          return (
            <TapCard key={s.key} onClick={() => s.modal ? onModal(s.modal) : onHelp(s.help)} style={{ padding: "12px 8px", textAlign: "center", position: "relative" }}>
              <div style={{ position: "absolute", top: 6, right: 6 }}>
                <HelpBtn onClick={() => onHelp(s.help)} />
              </div>
              <div style={{ marginBottom: 4 }}>{Ic && <Ic s={18} c={s.ac} />}</div>
              <div style={{ fontSize: 16, fontWeight: 700, color: T.soil, fontFamily: "'Fraunces', serif" }}>{s.val}</div>
              <div style={{ fontSize: 9, color: T.bark, fontWeight: 500, marginTop: 2 }}>{s.label}</div>
            </TapCard>
          );
        })}
      </div>

      {/* Phase progress — tappable */}
      <TapCard onClick={() => onHelp("phase")} style={{ padding: "14px 16px", marginBottom: 14 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
          <span style={{ fontSize: 10, fontWeight: 700, color: T.bark, textTransform: "uppercase", letterSpacing: 0.8 }}>Phase Progress</span>
          <HelpBtn onClick={() => onHelp("phase")} />
        </div>
        <div style={{ display: "flex", gap: 0 }}>
          {PHASES.map((p, i) => (
            <div key={p.name} style={{
              flex: 1, padding: "7px 4px", textAlign: "center",
              background: p.active ? T.leaf : p.done ? T.leafMuted : T.sandLight,
              borderRadius: i === 0 ? "8px 0 0 8px" : i === 3 ? "0 8px 8px 0" : 0,
              borderRight: i < 3 ? `2px solid ${T.parchment}` : "none",
            }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: p.active || p.done ? T.cream : T.bark }}>{p.short}</div>
              <div style={{ fontSize: 8, color: p.active || p.done ? "rgba(255,255,255,0.6)" : T.soilLight }}>Day {p.range}</div>
            </div>
          ))}
        </div>
      </TapCard>

      {/* Activity Score trend — tappable */}
      <TapCard onClick={() => onModal("activityDetail")} style={{ padding: "14px 16px", marginBottom: 14 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
          <div>
            <div style={{ fontSize: 10, fontWeight: 700, color: T.bark, textTransform: "uppercase", letterSpacing: 0.8 }}>Activity Score</div>
            <div style={{ fontSize: 9, color: T.soilLight }}>Pre-dawn TDIFF</div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontSize: 20, fontWeight: 700, color: T.terra, fontFamily: "'Fraunces', serif" }}>{batch.activityScore}</span>
            <HelpBtn onClick={() => onHelp("activity")} />
          </div>
        </div>
        <Spark data={DAILY_SCORES} color={T.terra} h={44} />
      </TapCard>

      {/* Recent activity */}
      <TapCard style={{ padding: "14px 16px" }}>
        <div style={{ fontSize: 10, fontWeight: 700, color: T.bark, textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 8 }}>
          Recent Activity
        </div>
        {ACTIVITY.slice(0, 4).map((a, i) => {
          const Ic = I[a.icon];
          return (
            <div key={i} style={{
              display: "flex", alignItems: "center", gap: 10, padding: "8px 0",
              borderTop: i > 0 ? `1px solid ${T.sandLight}` : "none",
            }}>
              <div style={{ width: 28, height: 28, borderRadius: 7, background: T.sandLight, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                {Ic && <Ic s={14} c={T.soilMid} />}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 12, fontWeight: 500, color: T.soil }}>{a.action}</div>
                <div style={{ fontSize: 10, color: T.bark }}>{a.time}</div>
              </div>
            </div>
          );
        })}
      </TapCard>
    </div>
  );
}

// ─── TRENDS SCREEN ──────────────────────────────────────
function TrendsScreen({ onHelp }) {
  return (
    <div style={{ padding: "0 20px 24px" }}>
      {/* Dual sensor chart */}
      <TapCard style={{ padding: "16px 16px", marginBottom: 14 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 4 }}>
          <span style={{ fontSize: 10, fontWeight: 700, color: T.bark, textTransform: "uppercase", letterSpacing: 0.8 }}>Hourly Sensor Data</span>
          <HelpBtn onClick={() => onHelp("temp")} />
        </div>
        <div style={{ fontSize: 9, color: T.soilLight, marginBottom: 12 }}>Ambient vs. Internal wall temperature</div>
        <div style={{ display: "flex", gap: 14, marginBottom: 10 }}>
          {[{ label: "Ambient", c: T.water }, { label: "Internal", c: T.terra }].map(l => (
            <div key={l.label} style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <div style={{ width: 10, height: 3, borderRadius: 2, background: l.c }} />
              <span style={{ fontSize: 9, color: T.bark }}>{l.label}</span>
            </div>
          ))}
        </div>
        <div style={{ display: "flex", alignItems: "flex-end", gap: 3, height: 110 }}>
          {HOURLY_TEMPS.map((t, i) => (
            <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 1 }}>
              <div style={{ display: "flex", gap: 1, alignItems: "flex-end", height: 90 }}>
                <div style={{ width: 7, borderRadius: "3px 3px 0 0", background: T.water, height: `${(t.a / 80) * 100}%`, transition: "height 0.5s" }} />
                <div style={{ width: 7, borderRadius: "3px 3px 0 0", background: T.terra, height: `${(t.i / 80) * 100}%`, transition: "height 0.5s" }} />
              </div>
              <span style={{ fontSize: 7, color: T.bark, whiteSpace: "nowrap" }}>{t.h}</span>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 10, padding: "8px 10px", borderRadius: 8, background: T.amberBg }}>
          <span style={{ fontSize: 11, fontWeight: 600, color: T.soilMid }}>
            Current TDIFF = {HOURLY_TEMPS[HOURLY_TEMPS.length-1].i - HOURLY_TEMPS[HOURLY_TEMPS.length-1].a}°F
          </span>
        </div>
      </TapCard>

      {/* Activity score history */}
      <TapCard style={{ padding: "16px 16px", marginBottom: 14 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 4 }}>
          <span style={{ fontSize: 10, fontWeight: 700, color: T.bark, textTransform: "uppercase", letterSpacing: 0.8 }}>Daily Activity Score</span>
          <HelpBtn onClick={() => onHelp("activity")} />
        </div>
        <div style={{ fontSize: 9, color: T.soilLight, marginBottom: 12 }}>Pre-dawn 5-hour TDIFF average</div>
        <Spark data={DAILY_SCORES} color={T.leaf} h={60} showDots labels />
      </TapCard>

      {/* Temp estimation trend */}
      <TapCard style={{ padding: "16px 16px", marginBottom: 14 }}>
        <div style={{ fontSize: 10, fontWeight: 700, color: T.bark, textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 4 }}>
          Estimated Pile Temperature
        </div>
        <div style={{ fontSize: 9, color: T.soilLight, marginBottom: 12 }}>Algorithm output over time</div>
        <Spark data={TEMP_HISTORY} valKey="v" color={T.terra} h={60} showDots labels />
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8, padding: "6px 8px", borderRadius: 6, background: T.terraBg }}>
          <span style={{ fontSize: 10, color: T.terra }}>Target: 130°F</span>
          <span style={{ fontSize: 10, fontWeight: 700, color: T.leaf }}>● In range</span>
          <span style={{ fontSize: 10, color: T.terra }}>Target: 160°F</span>
        </div>
      </TapCard>

      {/* Explainer */}
      <TapCard onClick={() => onHelp("temp")} style={{ padding: "14px 16px", background: T.leafBg, border: `1px solid ${T.leafBgDeep}` }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 6 }}>
          <I.Sprout s={14} c={T.leaf} />
          <span style={{ fontSize: 10, fontWeight: 700, color: T.leafDark, textTransform: "uppercase", letterSpacing: 0.5 }}>How It Works</span>
        </div>
        <p style={{ margin: 0, fontSize: 11, color: T.moss, lineHeight: 1.5 }}>
          The Comparator measures wall vs. ambient temps pre-dawn. Combined with fill level, the app estimates internal pile temperature. Tap to learn more.
        </p>
      </TapCard>
    </div>
  );
}

// ─── PAIR SCREEN ────────────────────────────────────────
function PairScreen({ onHelp }) {
  const [step, setStep] = useState(0);
  useEffect(() => {
    if (step === 1) { const t = setTimeout(() => setStep(2), 2200); return () => clearTimeout(t); }
    if (step === 2) { const t = setTimeout(() => setStep(3), 1500); return () => clearTimeout(t); }
  }, [step]);

  if (step === 0) return (
    <div style={{ padding: "0 20px 24px" }}>
      {MODULE.connected && (
        <TapCard style={{ padding: "16px 16px", marginBottom: 14 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: T.leafBg, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <I.Bt s={18} c={T.leaf} />
              </div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 700, color: T.soil }}>{MODULE.id}</div>
                <div style={{ fontSize: 10, color: T.leaf, fontWeight: 600 }}>Connected</div>
              </div>
            </div>
            <HelpBtn onClick={() => onHelp("module")} />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
            {[
              { label: "Battery", value: `${MODULE.battery}%` },
              { label: "Firmware", value: MODULE.firmware },
              { label: "Ambient", value: "42°F" },
              { label: "Internal", value: "68°F" },
            ].map((r, i) => (
              <div key={i} style={{ padding: "8px 10px", borderRadius: 8, background: T.parchment }}>
                <div style={{ fontSize: 8, fontWeight: 600, color: T.bark, textTransform: "uppercase", letterSpacing: 0.5 }}>{r.label}</div>
                <div style={{ fontSize: 14, fontWeight: 600, color: T.soil, marginTop: 1 }}>{r.value}</div>
              </div>
            ))}
          </div>
        </TapCard>
      )}

      <TapCard style={{ padding: "24px 18px", textAlign: "center" }}>
        <div style={{
          width: 64, height: 64, borderRadius: "50%", margin: "0 auto 14px",
          background: T.amberBg, display: "flex", alignItems: "center", justifyContent: "center",
          border: `2px solid ${T.amber}33`,
        }}>
          <I.Nfc s={28} c={T.amber} />
        </div>
        <h3 style={{ margin: "0 0 6px", fontSize: 16, fontWeight: 700, fontFamily: "'Fraunces', serif", color: T.soil }}>
          {MODULE.connected ? "Pair Another Module" : "Pair Your Comparator"}
        </h3>
        <p style={{ margin: "0 0 16px", fontSize: 12, color: T.soilLight, lineHeight: 1.5 }}>
          Hold your phone near the NFC icon on the module to wake it and connect via Bluetooth.
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 10, textAlign: "left", marginBottom: 18 }}>
          {[
            { icon: "Nfc", text: "Tap phone to NFC icon", sub: "Wakes module from deep sleep" },
            { icon: "Bt", text: "BLE pairs automatically", sub: "Module starts Bluetooth advertising" },
            { icon: "Check", text: "Sensors synced", sub: "Date/time & sunrise schedule sent" },
          ].map((s, i) => {
            const Ic = I[s.icon];
            return (
              <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                <div style={{ width: 26, height: 26, borderRadius: 7, flexShrink: 0, background: T.sandLight, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  {Ic && <Ic s={13} c={T.soilMid} />}
                </div>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 600, color: T.soil }}>{s.text}</div>
                  <div style={{ fontSize: 10, color: T.bark }}>{s.sub}</div>
                </div>
              </div>
            );
          })}
        </div>
        <button onClick={() => setStep(1)} style={{
          width: "100%", padding: "13px", borderRadius: 12, border: "none", cursor: "pointer",
          background: `linear-gradient(135deg, ${T.leafDark}, ${T.leaf})`,
          color: T.cream, fontSize: 14, fontWeight: 700, fontFamily: "'DM Sans', sans-serif",
          boxShadow: `0 4px 12px ${T.leaf}44`,
        }}>
          <span style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
            <I.Nfc s={16} c={T.cream} /> Start NFC Pairing
          </span>
        </button>
      </TapCard>
    </div>
  );

  if (step === 1) return (
    <div style={{ padding: "60px 20px", textAlign: "center" }}>
      <div style={{ position: "relative", width: 110, height: 110, margin: "0 auto 20px" }}>
        {[0,1,2].map(i => <div key={i} style={{ position: "absolute", inset: 0, borderRadius: "50%", border: `2px solid ${T.amber}`, animation: `pulse 2s ease-out ${i*0.6}s infinite`, opacity: 0 }} />)}
        <div style={{ position: "absolute", inset: 20, borderRadius: "50%", background: T.amberBg, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <I.Phone s={32} c={T.amber} />
        </div>
      </div>
      <h3 style={{ margin: "0 0 6px", fontSize: 16, fontWeight: 700, fontFamily: "'Fraunces', serif", color: T.soil }}>Scanning...</h3>
      <p style={{ margin: 0, fontSize: 12, color: T.bark }}>Hold phone near the NFC tag</p>
      <style>{`@keyframes pulse { 0% { transform: scale(0.8); opacity: 0.6; } 100% { transform: scale(1.6); opacity: 0; } }`}</style>
    </div>
  );

  if (step === 2) return (
    <div style={{ padding: "60px 20px", textAlign: "center" }}>
      <div style={{ width: 70, height: 70, borderRadius: "50%", margin: "0 auto 16px", background: T.amberBg, display: "flex", alignItems: "center", justifyContent: "center", border: `3px solid ${T.amber}` }}>
        <I.Bt s={32} c={T.amber} />
      </div>
      <h3 style={{ margin: "0 0 6px", fontSize: 16, fontWeight: 700, fontFamily: "'Fraunces', serif", color: T.soil }}>Module Found!</h3>
      <p style={{ margin: 0, fontSize: 12, color: T.bark }}>Connecting to <strong>{MODULE.id}</strong>...</p>
    </div>
  );

  return (
    <div style={{ padding: "40px 20px", textAlign: "center" }}>
      <div style={{ width: 70, height: 70, borderRadius: "50%", margin: "0 auto 16px", background: T.leafBg, display: "flex", alignItems: "center", justifyContent: "center", border: `3px solid ${T.leaf}` }}>
        <I.Check s={36} c={T.leaf} />
      </div>
      <h3 style={{ margin: "0 0 6px", fontSize: 16, fontWeight: 700, fontFamily: "'Fraunces', serif", color: T.leafDark }}>Paired!</h3>
      <p style={{ margin: "0 0 4px", fontSize: 12, color: T.bark }}><strong>{MODULE.id}</strong> connected</p>
      <p style={{ margin: "0 0 20px", fontSize: 11, color: T.soilLight }}>Synced date/time & sunrise schedule. Pre-dawn sampling begins tonight.</p>
      <div style={{ padding: "12px 14px", borderRadius: 12, background: T.leafBg, border: `1px solid ${T.leafBgDeep}`, textAlign: "left", marginBottom: 18 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
          {[{ l: "Battery", v: `${MODULE.battery}%` }, { l: "Firmware", v: MODULE.firmware }, { l: "Ambient", v: "42°F" }, { l: "Internal", v: "68°F" }].map((r,i) => (
            <div key={i}><div style={{ fontSize: 8, fontWeight: 600, color: T.moss, textTransform: "uppercase", letterSpacing: 0.5 }}>{r.l}</div><div style={{ fontSize: 13, fontWeight: 600, color: T.leafDark }}>{r.v}</div></div>
          ))}
        </div>
      </div>
      <button onClick={() => setStep(0)} style={{ width: "100%", padding: "13px", borderRadius: 12, border: "none", cursor: "pointer", background: T.leaf, color: T.cream, fontSize: 14, fontWeight: 700 }}>Done</button>
    </div>
  );
}

// ─── SETTINGS SCREEN ────────────────────────────────────
function SettingsScreen({ batch, setBatch, onHelp }) {
  return (
    <div style={{ padding: "0 20px 24px" }}>
      <TapCard style={{ padding: "16px 16px", marginBottom: 14 }}>
        <div style={{ fontSize: 10, fontWeight: 700, color: T.bark, textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 10 }}>Active Batch</div>
        <div style={{ fontSize: 17, fontWeight: 700, color: T.soil, fontFamily: "'Fraunces', serif", marginBottom: 2 }}>{batch.name}</div>
        <div style={{ fontSize: 11, color: T.bark }}>Started {batch.start} — Day {batch.day}</div>
      </TapCard>

      {/* Fill level */}
      <TapCard style={{ padding: "16px 16px", marginBottom: 14 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
          <span style={{ fontSize: 12, fontWeight: 600, color: T.soil }}>Fill Level</span>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontSize: 18, fontWeight: 700, color: T.leaf, fontFamily: "'Fraunces', serif" }}>{batch.fillLevel}/10</span>
            <HelpBtn onClick={() => onHelp("fill")} />
          </div>
        </div>
        <input type="range" min="1" max="10" value={batch.fillLevel}
          onChange={e => setBatch(b => ({ ...b, fillLevel: Number(e.target.value) }))}
          style={{ width: "100%", accentColor: T.leaf }} />
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 4 }}>
          <span style={{ fontSize: 9, color: T.bark }}>Nearly empty</span>
          <span style={{ fontSize: 9, color: T.bark }}>Full</span>
        </div>
      </TapCard>

      {/* Moisture */}
      <TapCard style={{ padding: "16px 16px", marginBottom: 14 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
          <span style={{ fontSize: 12, fontWeight: 600, color: T.soil }}>Moisture Level</span>
          <HelpBtn onClick={() => onHelp("moisture")} />
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          {["Dry", "Moist", "Wet"].map(m => (
            <button key={m} onClick={() => setBatch(b => ({ ...b, moisture: m }))} style={{
              flex: 1, padding: "10px", borderRadius: 10,
              border: `1.5px solid ${m === batch.moisture ? T.water : T.sand}`,
              background: m === batch.moisture ? T.waterBg : T.parchment, cursor: "pointer",
              fontSize: 12, fontWeight: m === batch.moisture ? 700 : 500,
              color: m === batch.moisture ? T.water : T.bark,
            }}>{m}</button>
          ))}
        </div>
      </TapCard>

      {/* Airflow */}
      <TapCard style={{ padding: "16px 16px", marginBottom: 14 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: T.soil }}>Airflow Door</div>
            <div style={{ fontSize: 10, color: T.bark }}>{batch.airflow === "open" ? "Cavity side — ventilation active" : "Non-cavity — heat retention"}</div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <HelpBtn onClick={() => onHelp("airflow")} />
            <button onClick={() => setBatch(b => ({ ...b, airflow: b.airflow === "open" ? "closed" : "open" }))} style={{
              width: 48, height: 26, borderRadius: 13, border: "none", cursor: "pointer",
              background: batch.airflow === "open" ? T.leaf : T.bark, position: "relative", transition: "background 0.3s",
            }}>
              <div style={{
                width: 20, height: 20, borderRadius: "50%", background: T.cream,
                position: "absolute", top: 3, left: batch.airflow === "open" ? 25 : 3,
                transition: "left 0.3s", boxShadow: `0 1px 3px ${T.soil}33`,
              }} />
            </button>
          </div>
        </div>
      </TapCard>

      {/* Tumble reminder */}
      <TapCard style={{ padding: "16px 16px", marginBottom: 14 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <div style={{ fontSize: 12, fontWeight: 600, color: T.soil }}>Tumble Reminder</div>
            <div style={{ fontSize: 10, color: T.bark }}>Every 24 hours</div>
          </div>
          <div style={{ width: 48, height: 26, borderRadius: 13, background: T.leaf, position: "relative" }}>
            <div style={{ width: 20, height: 20, borderRadius: "50%", background: T.cream, position: "absolute", top: 3, left: 25, boxShadow: `0 1px 3px ${T.soil}33` }} />
          </div>
        </div>
      </TapCard>

      {/* Module info */}
      <TapCard style={{ padding: "16px 16px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
          <span style={{ fontSize: 10, fontWeight: 700, color: T.bark, textTransform: "uppercase", letterSpacing: 0.8 }}>Comparator Module</span>
          <HelpBtn onClick={() => onHelp("module")} />
        </div>
        {[
          { l: "Module ID", v: MODULE.id }, { l: "Firmware", v: MODULE.firmware },
          { l: "Battery", v: `${MODULE.battery}%` }, { l: "Last Sync", v: MODULE.lastSync },
        ].map((r, i) => (
          <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "7px 0", borderTop: i > 0 ? `1px solid ${T.sandLight}` : "none" }}>
            <span style={{ fontSize: 12, color: T.bark }}>{r.l}</span>
            <span style={{ fontSize: 12, fontWeight: 600, color: T.soil }}>{r.v}</span>
          </div>
        ))}
      </TapCard>
    </div>
  );
}

// ─── DRILL-DOWN MODALS ──────────────────────────────────
function TempTrendModal({ onClose, onHelp }) {
  return (
    <div style={{ padding: "8px 22px 28px" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
        <h3 style={{ margin: 0, fontSize: 17, fontWeight: 700, fontFamily: "'Fraunces', serif", color: T.soil }}>Temperature Trend</h3>
        <div style={{ display: "flex", gap: 8 }}>
          <HelpBtn onClick={() => onHelp("temp")} />
          <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", padding: 2 }}><I.X s={20} c={T.bark} /></button>
        </div>
      </div>
      <Spark data={TEMP_HISTORY} valKey="v" color={T.terra} h={80} showDots labels />
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 10, padding: "8px 10px", borderRadius: 8, background: T.terraBg }}>
        <span style={{ fontSize: 10, color: T.terra }}>Target: 130°F</span>
        <span style={{ fontSize: 10, fontWeight: 700, color: T.leaf }}>● In range</span>
        <span style={{ fontSize: 10, color: T.terra }}>Target: 160°F</span>
      </div>
      <div style={{ marginTop: 14, display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
        {[{ l: "Current", v: "142°F" }, { l: "Peak", v: "155°F" }, { l: "Day", v: "16/45" }].map((s,i) => (
          <div key={i} style={{ padding: "10px", borderRadius: 10, background: T.parchment, textAlign: "center" }}>
            <div style={{ fontSize: 16, fontWeight: 700, fontFamily: "'Fraunces', serif", color: T.soil }}>{s.v}</div>
            <div style={{ fontSize: 9, color: T.bark }}>{s.l}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ActivityDetailModal({ onClose, onHelp }) {
  return (
    <div style={{ padding: "8px 22px 28px" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
        <h3 style={{ margin: 0, fontSize: 17, fontWeight: 700, fontFamily: "'Fraunces', serif", color: T.soil }}>Activity Score Detail</h3>
        <div style={{ display: "flex", gap: 8 }}>
          <HelpBtn onClick={() => onHelp("activity")} />
          <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", padding: 2 }}><I.X s={20} c={T.bark} /></button>
        </div>
      </div>
      <div style={{ textAlign: "center", marginBottom: 14 }}>
        <div style={{ fontSize: 48, fontWeight: 700, fontFamily: "'Fraunces', serif", color: T.terra }}>{DAILY_SCORES[DAILY_SCORES.length-1].s}</div>
        <div style={{ fontSize: 11, color: T.bark }}>Today's Activity Score</div>
      </div>
      <Spark data={DAILY_SCORES} color={T.leaf} h={60} showDots labels />
      <div style={{ marginTop: 14, padding: "12px 14px", borderRadius: 10, background: T.amberBg }}>
        <div style={{ fontSize: 11, fontWeight: 600, color: T.soilMid, marginBottom: 4 }}>Pre-Dawn Window</div>
        <div style={{ fontSize: 11, color: T.soilLight, lineHeight: 1.5 }}>
          Sampled 1:50 – 6:50 AM (21 readings at 15-min intervals). Average TDIFF = 8.3°F. This indicates strong microbial heat generation.
        </div>
      </div>
      <div style={{ marginTop: 10, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
        {[{ l: "Avg Ambient", v: "41°F" }, { l: "Avg Internal", v: "49°F" }, { l: "Readings", v: "21" }, { l: "Window", v: "5 hrs" }].map((s,i) => (
          <div key={i} style={{ padding: "8px 10px", borderRadius: 8, background: T.parchment }}>
            <div style={{ fontSize: 8, fontWeight: 600, color: T.bark, textTransform: "uppercase", letterSpacing: 0.5 }}>{s.l}</div>
            <div style={{ fontSize: 14, fontWeight: 600, color: T.soil }}>{s.v}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function FillAdjustModal({ onClose, onHelp, batch, setBatch }) {
  return (
    <div style={{ padding: "8px 22px 28px" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
        <h3 style={{ margin: 0, fontSize: 17, fontWeight: 700, fontFamily: "'Fraunces', serif", color: T.soil }}>Adjust Fill Level</h3>
        <div style={{ display: "flex", gap: 8 }}>
          <HelpBtn onClick={() => onHelp("fill")} />
          <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", padding: 2 }}><I.X s={20} c={T.bark} /></button>
        </div>
      </div>
      <div style={{ textAlign: "center", marginBottom: 14 }}>
        <div style={{ fontSize: 48, fontWeight: 700, fontFamily: "'Fraunces', serif", color: T.water }}>{batch.fillLevel}</div>
        <div style={{ fontSize: 12, color: T.bark }}>out of 10</div>
      </div>
      <input type="range" min="1" max="10" value={batch.fillLevel}
        onChange={e => setBatch(b => ({ ...b, fillLevel: Number(e.target.value) }))}
        style={{ width: "100%", accentColor: T.water, height: 8 }} />
      <div style={{ display: "flex", justifyContent: "space-between", margin: "6px 0 14px" }}>
        <span style={{ fontSize: 10, color: T.bark }}>1 — Nearly empty</span>
        <span style={{ fontSize: 10, color: T.bark }}>10 — Full</span>
      </div>
      <div style={{ padding: "10px 12px", borderRadius: 8, background: T.waterBg, border: `1px solid ${T.water}22` }}>
        <div style={{ fontSize: 11, color: T.soilMid, lineHeight: 1.5 }}>
          Fill level is a key input to the temperature estimation. A fuller tumbler retains more heat. Update this whenever you add or remove material.
        </div>
      </div>
      <button onClick={onClose} style={{ width: "100%", marginTop: 14, padding: "12px", borderRadius: 12, border: "none", cursor: "pointer", background: T.leaf, color: T.cream, fontSize: 14, fontWeight: 700 }}>Done</button>
    </div>
  );
}

function AirflowAdjustModal({ onClose, onHelp, batch, setBatch }) {
  return (
    <div style={{ padding: "8px 22px 28px" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
        <h3 style={{ margin: 0, fontSize: 17, fontWeight: 700, fontFamily: "'Fraunces', serif", color: T.soil }}>Airflow Door</h3>
        <div style={{ display: "flex", gap: 8 }}>
          <HelpBtn onClick={() => onHelp("airflow")} />
          <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", padding: 2 }}><I.X s={20} c={T.bark} /></button>
        </div>
      </div>
      <div style={{ display: "flex", gap: 10, marginBottom: 16 }}>
        {[
          { val: "open", label: "Open", sub: "Cavity side aligned", desc: "Air flows through for aerobic composting", icon: "Wind", c: T.leaf },
          { val: "closed", label: "Closed", sub: "Non-cavity side", desc: "Blocks airflow to retain heat in cold/wind", icon: "Sun", c: T.amber },
        ].map(opt => (
          <button key={opt.val} onClick={() => setBatch(b => ({ ...b, airflow: opt.val }))} style={{
            flex: 1, padding: "16px 12px", borderRadius: 14, border: `2px solid ${batch.airflow === opt.val ? opt.c : T.sand}`,
            background: batch.airflow === opt.val ? (opt.val === "open" ? T.leafBg : T.amberBg) : T.parchment,
            cursor: "pointer", textAlign: "center",
          }}>
            {I[opt.icon] && (() => { const Ic = I[opt.icon]; return <Ic s={24} c={batch.airflow === opt.val ? opt.c : T.bark} />; })()}
            <div style={{ fontSize: 14, fontWeight: 700, color: batch.airflow === opt.val ? opt.c : T.bark, marginTop: 8 }}>{opt.label}</div>
            <div style={{ fontSize: 10, color: T.soilLight, marginTop: 2 }}>{opt.sub}</div>
            <div style={{ fontSize: 10, color: T.bark, marginTop: 6, lineHeight: 1.4 }}>{opt.desc}</div>
          </button>
        ))}
      </div>
      <button onClick={onClose} style={{ width: "100%", padding: "12px", borderRadius: 12, border: "none", cursor: "pointer", background: T.leaf, color: T.cream, fontSize: 14, fontWeight: 700 }}>Done</button>
    </div>
  );
}

function ModuleStatusModal({ onClose, onHelp }) {
  return (
    <div style={{ padding: "8px 22px 28px" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
        <h3 style={{ margin: 0, fontSize: 17, fontWeight: 700, fontFamily: "'Fraunces', serif", color: T.soil }}>Module Status</h3>
        <div style={{ display: "flex", gap: 8 }}>
          <HelpBtn onClick={() => onHelp("module")} />
          <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", padding: 2 }}><I.X s={20} c={T.bark} /></button>
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
        <div style={{ width: 48, height: 48, borderRadius: 14, background: T.leafBg, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <I.Bt s={24} c={T.leaf} />
        </div>
        <div>
          <div style={{ fontSize: 16, fontWeight: 700, color: T.soil }}>{MODULE.id}</div>
          <div style={{ fontSize: 12, color: T.leaf, fontWeight: 600 }}>Connected via BLE</div>
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 14 }}>
        {[
          { l: "Battery", v: `${MODULE.battery}%`, c: T.leaf },
          { l: "Firmware", v: MODULE.firmware, c: T.soil },
          { l: "Last Sync", v: MODULE.lastSync, c: T.soil },
          { l: "Ambient Temp", v: "42°F", c: T.water },
          { l: "Internal Temp", v: "68°F", c: T.terra },
          { l: "Current TDIFF", v: "26°F", c: T.amber },
        ].map((r,i) => (
          <div key={i} style={{ padding: "10px 12px", borderRadius: 10, background: T.parchment }}>
            <div style={{ fontSize: 8, fontWeight: 600, color: T.bark, textTransform: "uppercase", letterSpacing: 0.5 }}>{r.l}</div>
            <div style={{ fontSize: 16, fontWeight: 700, color: r.c, fontFamily: "'Fraunces', serif", marginTop: 2 }}>{r.v}</div>
          </div>
        ))}
      </div>
      <button onClick={onClose} style={{ width: "100%", padding: "12px", borderRadius: 12, border: "none", cursor: "pointer", background: T.leaf, color: T.cream, fontSize: 14, fontWeight: 700 }}>Done</button>
    </div>
  );
}

// ─── MAIN APP ───────────────────────────────────────────
const TABS = [
  { id: "home", label: "Home", icon: "Home" },
  { id: "trends", label: "Trends", icon: "Chart" },
  { id: "pair", label: "Pair", icon: "Nfc" },
  { id: "settings", label: "Settings", icon: "Gear" },
];

export default function ThermophilikApp() {
  const [tab, setTab] = useState("home");
  const [loaded, setLoaded] = useState(false);
  const [modal, setModal] = useState(null);
  const [helpKey, setHelpKey] = useState(null);
  const [batch, setBatch] = useState({
    name: "Spring Batch #3", start: "Feb 10", day: 16, total: 45,
    phase: "Thermophilic", activityScore: 8.3, temp: 142,
    lastTumble: "6h ago", nextTumble: "18h",
    airflow: "open", fillLevel: 7, moisture: "Moist",
  });
  const scrollRef = useRef(null);

  useEffect(() => {
    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,300;9..144,400;9..144,600;9..144,700;9..144,800&family=DM+Sans:wght@400;500;600;700&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
    setTimeout(() => setLoaded(true), 100);
    return () => document.head.removeChild(link);
  }, []);

  useEffect(() => { if (scrollRef.current) scrollRef.current.scrollTop = 0; }, [tab]);

  const openHelp = (key) => { setModal(null); setHelpKey(key); };
  const closeHelp = () => setHelpKey(null);
  const openModal = (m) => setModal(m);
  const closeModal = () => setModal(null);

  const renderScreen = () => {
    switch (tab) {
      case "home": return <HomeScreen onModal={openModal} onHelp={openHelp} batch={batch} setBatch={setBatch} />;
      case "trends": return <TrendsScreen onHelp={openHelp} />;
      case "pair": return <PairScreen onHelp={openHelp} />;
      case "settings": return <SettingsScreen batch={batch} setBatch={setBatch} onHelp={openHelp} />;
      default: return <HomeScreen onModal={openModal} onHelp={openHelp} batch={batch} setBatch={setBatch} />;
    }
  };

  const renderModal = () => {
    switch (modal) {
      case "tempTrend": return <Modal open onClose={closeModal}><TempTrendModal onClose={closeModal} onHelp={openHelp} /></Modal>;
      case "activityDetail": return <Modal open onClose={closeModal}><ActivityDetailModal onClose={closeModal} onHelp={openHelp} /></Modal>;
      case "fillAdjust": return <Modal open onClose={closeModal}><FillAdjustModal onClose={closeModal} onHelp={openHelp} batch={batch} setBatch={setBatch} /></Modal>;
      case "airflowAdjust": return <Modal open onClose={closeModal}><AirflowAdjustModal onClose={closeModal} onHelp={openHelp} batch={batch} setBatch={setBatch} /></Modal>;
      case "moduleStatus": return <Modal open onClose={closeModal}><ModuleStatusModal onClose={closeModal} onHelp={openHelp} /></Modal>;
      default: return null;
    }
  };

  const titles = { home: "", trends: "Trends", pair: "Comparator", settings: "Settings" };

  return (
    <div style={{
      width: 390, height: 750, margin: "20px auto", borderRadius: 28, overflow: "hidden",
      background: T.parchment, fontFamily: "'DM Sans', sans-serif", color: T.soil,
      display: "flex", flexDirection: "column", position: "relative",
      boxShadow: `0 20px 60px ${T.soil}25, 0 0 0 1px ${T.sand}`,
    }}>
      {/* Status bar */}
      <div style={{ padding: "10px 24px 0", display: "flex", justifyContent: "space-between", fontSize: 11, fontWeight: 600, color: T.soil, flexShrink: 0 }}>
        <span>9:41</span>
        <span style={{ fontSize: 10 }}>●●●●○  🔋</span>
      </div>

      {/* Header */}
      <div style={{ padding: "10px 20px 12px", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{
            width: 32, height: 32, borderRadius: 9,
            background: `linear-gradient(135deg, ${T.leafDark}, ${T.leaf})`,
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: `0 2px 8px ${T.leaf}33`,
          }}>
            <I.Sprout s={17} c={T.cream} />
          </div>
          <div>
            <div style={{ fontSize: 15, fontWeight: 700, fontFamily: "'Fraunces', serif", color: T.soil, lineHeight: 1.1 }}>
              {titles[tab] || "Thermophilik"}
            </div>
            {tab === "home" && <div style={{ fontSize: 10, color: T.bark }}>{batch.name}</div>}
          </div>
        </div>
        {tab === "home" && MODULE.connected && (
          <div style={{ display: "flex", alignItems: "center", gap: 4, padding: "4px 10px", borderRadius: 20, background: T.leafBg, border: `1px solid ${T.leafBgDeep}` }}>
            <div style={{ width: 5, height: 5, borderRadius: 3, background: T.leaf }} />
            <span style={{ fontSize: 10, fontWeight: 600, color: T.leafDark }}>Live</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div ref={scrollRef} style={{ flex: 1, overflowY: "auto", overflowX: "hidden", opacity: loaded ? 1 : 0, transition: "opacity 0.4s" }}>
        {renderScreen()}
      </div>

      {/* Bottom nav */}
      <nav style={{ display: "flex", flexShrink: 0, borderTop: `1px solid ${T.sand}`, background: T.cream, padding: "4px 8px 18px" }}>
        {TABS.map(t => {
          const active = tab === t.id;
          const Ic = I[t.icon];
          return (
            <button key={t.id} onClick={() => setTab(t.id)} style={{
              flex: 1, display: "flex", flexDirection: "column", alignItems: "center",
              gap: 2, padding: "6px 0", border: "none", cursor: "pointer", background: "transparent",
            }}>
              <div style={{
                width: 34, height: 34, borderRadius: 10,
                display: "flex", alignItems: "center", justifyContent: "center",
                background: active ? T.leafBg : "transparent", transition: "background 0.2s",
              }}>
                {Ic && <Ic s={20} c={active ? T.leaf : T.bark} />}
              </div>
              <span style={{ fontSize: 9, fontWeight: active ? 700 : 500, color: active ? T.leafDark : T.bark }}>{t.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Modals */}
      {renderModal()}
      <HelpModal open={!!helpKey} onClose={closeHelp} helpKey={helpKey} />
    </div>
  );
}
