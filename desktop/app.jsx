/* global React, ReactDOM, DESKTOP_APPS */
/* MISHA-OS — desktop, boot/login, draggable window manager. */

const P = window.PORTFOLIO;
const APPS = window.DESKTOP_APPS;
const APP_BY_ID = Object.fromEntries(APPS.map((a) => [a.id, a]));

/* ---------------- Clock ---------------- */
function Clock() {
  const [t, setT] = React.useState("");
  React.useEffect(() => {
    const fmt = () => {
      const d = new Date();
      const hh = String(d.getHours()).padStart(2, "0");
      const mm = String(d.getMinutes()).padStart(2, "0");
      setT(`${hh}:${mm}`);
    };
    fmt();
    const i = setInterval(fmt, 10000);
    return () => clearInterval(i);
  }, []);
  return <span>{t}</span>;
}

/* ---------------- Window ---------------- */
function Win({ data, active, onClose, onFocus, onDrag, onResize }) {
  const app = APP_BY_ID[data.id];
  const Body = app.Body;
  const winRef = React.useRef(null);
  const sized = data.h != null;
  const startResize = (e) => {
    e.stopPropagation();
    if (e.button !== 0) return;
    onFocus(data.id);
    const sx = e.clientX, sy = e.clientY;
    const rect = winRef.current.getBoundingClientRect();
    const ow = rect.width, oh = rect.height;
    const move = (ev) => {
      const nw = Math.max(240, ow + (ev.clientX - sx));
      const nh = Math.max(150, oh + (ev.clientY - sy));
      onResize(data.id, nw, nh);
    };
    const up = () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseup", up);
      document.body.classList.remove("is-resizing");
    };
    document.body.classList.add("is-resizing");
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseup", up);
  };
  const startDrag = (e) => {
    if (e.button !== 0) return;
    onFocus(data.id);
    const sx = e.clientX, sy = e.clientY, ox = data.x, oy = data.y;
    const screen = document.querySelector(".screen").getBoundingClientRect();
    const move = (ev) => {
      let nx = ox + (ev.clientX - sx);
      let ny = oy + (ev.clientY - sy);
      nx = Math.max(-app.w + 80, Math.min(nx, screen.width - 60));
      ny = Math.max(0, Math.min(ny, screen.height - 40));
      onDrag(data.id, nx, ny);
    };
    const up = () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseup", up);
      document.body.classList.remove("is-dragging");
    };
    document.body.classList.add("is-dragging");
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseup", up);
  };
  return (
    <div
      ref={winRef}
      className={"win" + (data.drag ? " dragging" : "")}
      style={{ left: data.x, top: data.y, zIndex: data.z, width: data.w || app.w, height: data.h || undefined, maxWidth: "calc(100% - 24px)" }}
      onMouseDown={() => onFocus(data.id)}
    >
      <div className={"win-title" + (active ? "" : " inactive")} onMouseDown={startDrag}>
        <span>{app.title}</span>
        <span className="t-stripes" />
        <span className="win-controls">
          <span className="ctrl" title="—">_</span>
          <span className="ctrl" title="close" onClick={(e) => { e.stopPropagation(); onClose(data.id); }}>✕</span>
        </span>
      </div>
      <div className="win-body" style={sized ? { maxHeight: "none", flex: "1 1 auto", minHeight: 0 } : undefined}><Body /></div>
      <div className="win-resize" onMouseDown={startResize} title="resize" />
    </div>
  );
}

/* ---------------- Desktop icon ---------------- */
function DeskIcon({ app, selected, onSelect, onOpen }) {
  const Icon = app.Icon;
  return (
    <div
      className={"icon" + (selected ? " sel" : "")}
      onMouseDown={(e) => { e.stopPropagation(); onSelect(app.id); }}
      onDoubleClick={() => onOpen(app.id)}
      onClick={(e) => { if (e.detail === 1) onSelect(app.id); }}
    >
      <span className="icon-art"><Icon /></span>
      <span className="icon-label">{app.label}</span>
    </div>
  );
}

/* ---------------- Boot / Login ---------------- */
function Boot({ onDone }) {
  const [phase, setPhase] = React.useState("login"); // login -> loading
  const [pw, setPw] = React.useState("••••••••");
  const [prog, setProg] = React.useState(0);

  const enter = () => {
    setPhase("loading");
  };
  const doneRef = React.useRef(onDone);
  doneRef.current = onDone;
  React.useEffect(() => {
    if (phase !== "loading") return;
    const i = setInterval(() => {
      setProg((p) => Math.min(100, p + Math.random() * 22 + 8));
    }, 130);
    return () => clearInterval(i);
  }, [phase]);
  React.useEffect(() => {
    if (phase === "loading" && prog >= 100) {
      const t = setTimeout(() => doneRef.current(), 350);
      return () => clearTimeout(t);
    }
  }, [phase, prog]);

  return (
    <div className="boot crt">
      <div className="login">
        <div className="lg-title">▚ LOGIN ▚▚▚▚▚▚▚▚▚▚▚▚▚▚</div>
        <div className="lg-body">
          <div className="lg-logo">MISHA·OS</div>
          <div className="lg-sub">INTERN TERMINAL — v1.4</div>
          {phase === "login" && (
            <div>
              <input className="input" value={P.identity.name.toLowerCase()} readOnly />
              <input
                className="input" type="password" value={pw}
                onChange={(e) => setPw(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && enter()}
              />
              <div className="login-row">
                <button className="btn primary" onClick={enter}>↵ ENTER</button>
              </div>
            </div>
          )}
          {phase === "loading" && (
            <div>
              <div style={{ fontSize: 17, color: "#6a5d4d" }}>Loading desktop…</div>
              <div className="bootbar-wrap"><div className="bootbar" style={{ width: prog + "%" }} /></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ---------------- OS ---------------- */
function OS() {
  const [booted, setBooted] = React.useState(location.hash === "#desktop");
  const [wins, setWins] = React.useState([]);
  const [sel, setSel] = React.useState(null);
  const [topZ, setTopZ] = React.useState(100);
  const activeId = wins.length ? wins.reduce((a, b) => (a.z > b.z ? a : b)).id : null;

  const openApp = (id) => {
    setSel(id);
    setWins((cur) => {
      const ex = cur.find((w) => w.id === id);
      const z = topZ + 1; setTopZ(z);
      if (ex) return cur.map((w) => (w.id === id ? { ...w, z } : w));
      const n = cur.length;
      return [...cur, { id, x: 120 + n * 30, y: 50 + n * 26, z }];
    });
  };
  const closeApp = (id) => setWins((cur) => cur.filter((w) => w.id !== id));
  const focusApp = (id) =>
    setWins((cur) => {
      const z = topZ + 1; setTopZ(z);
      return cur.map((w) => (w.id === id ? { ...w, z } : w));
    });
  const dragApp = (id, x, y) =>
    setWins((cur) => cur.map((w) => (w.id === id ? { ...w, x, y, drag: true } : w)));
  const resizeApp = (id, w, h) =>
    setWins((cur) => cur.map((wn) => (wn.id === id ? { ...wn, w, h } : wn)));

  if (!booted) return <Boot onDone={() => setBooted(true)} />;

  return (
    <div className="desktop-wrap" onMouseDown={() => setSel(null)}>
      {/* menu bar */}
      <div className="menubar">
        <span className="mb-logo"><span className="diamond" /> MISHA·OS</span>
        <span className="mb-item" onClick={(e) => { e.stopPropagation(); openApp("about"); }}>FILE</span>
        <span className="mb-item" onClick={(e) => { e.stopPropagation(); openApp("system"); }}>SYSTEM</span>
        <span className="mb-item" onClick={(e) => { e.stopPropagation(); openApp("contact"); }}>CONTACT</span>
        <span className="mb-right">
          <span>@{P.identity.name.toLowerCase()}</span>
          <Clock />
        </span>
      </div>

      {/* icons */}
      <div className="icon-grid" onMouseDown={(e) => e.stopPropagation()}>
        {APPS.map((a) => (
          <DeskIcon key={a.id} app={a} selected={sel === a.id} onSelect={setSel} onOpen={openApp} />
        ))}
      </div>

      {/* hint */}
      <div style={{ position: "absolute", bottom: 10, right: 14, fontFamily: "var(--chrome)", fontSize: 8, color: "rgba(239,230,210,.45)", textShadow: "1px 1px 0 #000", textAlign: "right", lineHeight: 1.8 }}>
        DOUBLE-CLICK AN ICON TO OPEN<br />DRAG TITLE BARS TO MOVE · DRAG CORNER TO RESIZE
      </div>

      {/* windows */}
      {wins.map((w) => (
        <Win key={w.id} data={w} active={w.id === activeId}
          onClose={closeApp} onFocus={focusApp} onDrag={dragApp} onResize={resizeApp} />
      ))}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<OS />);
