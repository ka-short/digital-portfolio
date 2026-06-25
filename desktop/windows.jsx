/* global React */
/* MISHA-OS — desktop icons (simple geometric SVG only) + window content.
   Reads everything from window.PORTFOLIO. Exported to window for app.jsx. */

const P = window.PORTFOLIO;

/* ---------- ICONS (squares / rects / circles / simple polys only) ---------- */
const S = { stroke: "#000", strokeWidth: 2, strokeLinejoin: "round" };
const BONE = "#efe6d2", RED = "#d4271f", BLACK = "#16110f";

const IconDoc = () => (
  <svg viewBox="0 0 40 38">
    <polygon points="8,3 26,3 33,11 33,35 8,35" fill={BONE} {...S} />
    <polygon points="26,3 26,11 33,11" fill="#d4c5a6" {...S} />
    <line x1="12" y1="17" x2="29" y2="17" stroke={RED} strokeWidth="2" />
    <line x1="12" y1="22" x2="29" y2="22" stroke="#000" strokeWidth="1.5" />
    <line x1="12" y1="27" x2="24" y2="27" stroke="#000" strokeWidth="1.5" />
  </svg>
);
const IconSkills = () => (
  <svg viewBox="0 0 40 38">
    <rect x="6" y="20" width="7" height="13" fill={BONE} {...S} />
    <rect x="16" y="12" width="7" height="21" fill={RED} {...S} />
    <rect x="26" y="6" width="7" height="27" fill={BONE} {...S} />
  </svg>
);
const IconFolder = () => (
  <svg viewBox="0 0 40 38">
    <polygon points="5,9 16,9 19,13 35,13 35,32 5,32" fill={RED} {...S} />
    <rect x="5" y="16" width="30" height="16" fill={BONE} {...S} />
  </svg>
);
const IconClock = () => (
  <svg viewBox="0 0 40 38">
    <circle cx="20" cy="19" r="15" fill={BONE} {...S} />
    <line x1="20" y1="19" x2="20" y2="9" stroke={RED} strokeWidth="2.4" />
    <line x1="20" y1="19" x2="28" y2="23" stroke="#000" strokeWidth="2" />
    <circle cx="20" cy="19" r="2" fill="#000" />
  </svg>
);
const IconChat = () => (
  <svg viewBox="0 0 40 38">
    <rect x="5" y="6" width="30" height="20" fill={BONE} {...S} />
    <polygon points="13,26 13,33 21,26" fill={BONE} {...S} />
    <line x1="11" y1="13" x2="29" y2="13" stroke={RED} strokeWidth="2" />
    <line x1="11" y1="19" x2="24" y2="19" stroke="#000" strokeWidth="1.5" />
  </svg>
);
const IconStar = () => (
  <svg viewBox="0 0 40 38">
    <polygon points="20,3 24,15 36,19 24,23 20,35 16,23 4,19 16,15" fill={RED} {...S} />
  </svg>
);
const IconCard = () => (
  <svg viewBox="0 0 40 38">
    <rect x="4" y="8" width="32" height="22" fill={BONE} {...S} />
    <rect x="4" y="8" width="32" height="6" fill={RED} {...S} />
    <circle cx="13" cy="22" r="4" fill="#d4c5a6" {...S} />
    <line x1="21" y1="20" x2="31" y2="20" stroke="#000" strokeWidth="1.5" />
    <line x1="21" y1="24" x2="31" y2="24" stroke="#000" strokeWidth="1.5" />
  </svg>
);
const IconMonitor = () => (
  <svg viewBox="0 0 40 38">
    <rect x="5" y="5" width="30" height="22" fill={BLACK} {...S} />
    <rect x="9" y="9" width="22" height="14" fill={RED} />
    <rect x="16" y="27" width="8" height="4" fill={BONE} {...S} />
    <rect x="12" y="31" width="16" height="3" fill={BONE} {...S} />
  </svg>
);

/* ---------- helpers ---------- */
const Blocks = ({ n, max = 5 }) => (
  <span className="m-blocks">
    {Array.from({ length: max }, (_, i) => (
      <span key={i} className={i < n ? "" : "off"}>{i < n ? "■" : "□"}</span>
    ))}
  </span>
);
const Meter = ({ name, n, max }) => (
  <div className="meter"><span className="m-name">{name}</span><Blocks n={n} max={max} /></div>
);
const Chips = ({ items }) => (
  <div className="chips">{items.map((c) => <span key={c} className="chip">{c}</span>)}</div>
);

/* ====================== WINDOWS ====================== */

function AboutWin() {
  return (
    <div className="sysinfo">
      <h2>// THE PLACEMENT</h2>
      <div className="field-row"><span className="lbl">ROLE</span><span>{P.identity.role}</span></div>
      <div className="field-row"><span className="lbl">DIVISION</span><span>{P.identity.company}</span></div>
      <div className="field-row"><span className="lbl">SECTOR</span><span>{P.identity.sector} · {P.identity.location}</span></div>
      <div className="field-row"><span className="lbl">TERM</span><span>{P.identity.period}</span></div>
      <div className="rule" />
      <h3>THE TEAM</h3>
      <p>{P.about.company}</p>
      <h3>MY REMIT</h3>
      <p>{P.about.role}</p>
      <h3>FLAGSHIP — PROJECT ATLAS</h3>
      <p>{P.about.project}</p>
    </div>
  );
}

function SkillsWin() {
  const [tab, setTab] = React.useState("ksa");
  const k = P.ksa;
  return (
    <div>
      <div className="tabs">
        <span className={"tab" + (tab === "ksa" ? " active" : "")} onClick={() => setTab("ksa")}>K.S.A</span>
        <span className={"tab" + (tab === "fw" ? " active" : "")} onClick={() => setTab("fw")}>FRAMEWORKS</span>
      </div>
      {tab === "ksa" && (
        <div>
          <h3>KNOWLEDGE</h3>
          {k.knowledge.map((x) => <Meter key={x.name} name={x.name} n={x.level} max={5} />)}
          <h3>SKILLS</h3>
          {k.skills.map((x) => <Meter key={x.name} name={x.name} n={x.level} max={5} />)}
          <h3>ATTITUDES</h3>
          {k.attitudes.map((x) => (
            <p key={x.name}><span className="kbd" style={{ color: "var(--red-dark)" }}>{x.name.toUpperCase()} — </span>{x.note}</p>
          ))}
        </div>
      )}
      {tab === "fw" && (
        <div>
          <h3>TSC · SKILLS FRAMEWORK (ICT)</h3>
          {P.tsc.map((x) => (
            <div key={x.code} style={{ marginBottom: 8 }}>
              <Meter name={`${x.name}`} n={x.level} max={5} />
              <div className="muted" style={{ fontSize: 15 }}><span className="kbd">{x.code}</span> · {x.evidence}</div>
            </div>
          ))}
          <h3>CRITICAL CORE SKILLS</h3>
          {P.ccs.map((x) => (
            <p key={x.name}><span className="kbd" style={{ color: "var(--red-dark)" }}>{x.name.toUpperCase()} [{x.level}] — </span>{x.task}</p>
          ))}
        </div>
      )}
    </div>
  );
}

function ProjectsWin() {
  const [open, setOpen] = React.useState(P.artifacts[0].id);
  return (
    <div>
      <p className="muted" style={{ fontSize: 16 }}>{P.artifacts.length} items · click to open</p>
      {P.artifacts.map((a) => {
        const isOpen = open === a.id;
        return (
          <div className="row-item" key={a.id}>
            <div className="row-head" onClick={() => setOpen(isOpen ? null : a.id)}>
              <span className="ri-tog">{isOpen ? "▼" : "►"}</span>
              <span className="ri-title">{a.title}</span>
              <span className="ri-kind">{a.kind}</span>
            </div>
            {isOpen && (
              <div className="row-body">
                <p>{a.summary}</p>
                <Chips items={a.stack} />
                <h3>WHAT I DID</h3>
                <p>{a.contribution}</p>
                <h3>IMPACT</h3>
                <p>{a.impact}</p>
                <h3>PROOF</h3>
                {a.proof.map((pr) => <div key={pr} className="kbd" style={{ marginBottom: 3 }}>› {pr}</div>)}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

function TimelineWin() {
  return (
    <div>
      <h2>// 20 WEEKS — RUN LOG</h2>
      {P.timeline.map((t) => (
        <div className="tl-item" key={t.week}>
          <div className="tl-week">{t.week}</div>
          <div className="tl-main">
            <div className="tl-phase">{t.phase.toUpperCase()}</div>
            <div style={{ fontSize: 18, marginBottom: 2 }}><b>{t.title}</b></div>
            <div className="muted">{t.note}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

function ReflectionsWin() {
  return (
    <div>
      {P.reflections.map((r) => (
        <div className="refl" key={r.theme}>
          <div className="r-theme">◆ {r.theme}</div>
          <p><span className="r-leg">CHALLENGE — </span>{r.challenge}</p>
          <p><span className="r-leg">ACTION — </span>{r.action}</p>
          <p style={{ marginBottom: 0 }}><span className="r-leg">OUTCOME — </span>{r.outcome}</p>
        </div>
      ))}
    </div>
  );
}

function OutlookWin() {
  const o = P.outlook;
  return (
    <div>
      <h3>WHAT I WANT NEXT</h3>
      <p>{o.nature}</p>
      <h3>HARDEST PART</h3>
      <p>{o.challenges}</p>
      <h3>HOW I GREW</h3>
      <p>{o.growth}</p>
      <h3>PROUDEST OF</h3>
      <p>{o.accomplishments}</p>
      <h3>THEN WHAT</h3>
      <p style={{ marginBottom: 0 }}>{o.next}</p>
    </div>
  );
}

function ContactWin() {
  const id = P.identity;
  return (
    <div>
      <div className="idcard">
        <div className="idc-top"><span className="t1">{id.name.toUpperCase()}</span><span className="t2">INTERN ID · {id.pronouns}</span></div>
        <div className="idc-body">
          <div className="idc-photo"><span>PHOTO<br />HERE</span></div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 17, marginBottom: 6 }}>{id.role}</div>
            <div className="field-row"><span className="lbl">EMAIL</span><span>{id.email}</span></div>
            <div className="field-row"><span className="lbl">LINKEDIN</span><span>{id.linkedin}</span></div>
            <div className="field-row"><span className="lbl">GITHUB</span><span>{id.github}</span></div>
          </div>
        </div>
      </div>
      <p className="muted" style={{ marginTop: 12 }}>{id.tagline}</p>
    </div>
  );
}

function SystemWin() {
  const id = P.identity;
  const stats = [
    ["USER", id.name], ["BUILD", "INTERN.OS v1.4"], ["UPTIME", id.period],
    ["PRs MERGED", "7"], ["LOC SHIPPED", "5,400"], ["RFCs ADOPTED", "1 of 3 authored"],
    ["DRIFT CATCHES", "2 (production)"], ["DASHBOARDS", "3"], ["TEAMS SERVED", "6"],
  ];
  return (
    <div className="sysinfo">
      <h2>// ABOUT THIS MACHINE</h2>
      {stats.map(([k, v]) => (
        <div className="si-row" key={k}><span className="si-k">{k}</span><span>{v}</span></div>
      ))}
      <div className="rule" />
      <p className="muted" style={{ marginBottom: 0 }}>{id.tagline}</p>
    </div>
  );
}

/* ---------- desktop registry: order = on-screen order ---------- */
const DESKTOP_APPS = [
  { id: "about",   label: "README.TXT",     title: "README.TXT — The Placement",      Icon: IconDoc,     Body: AboutWin,       w: 440 },
  { id: "skills",  label: "SKILLS.EXE",     title: "SKILLS.EXE",                       Icon: IconSkills,  Body: SkillsWin,      w: 430 },
  { id: "projects",label: "PROJECTS",       title: "PROJECTS — \\artifacts",           Icon: IconFolder,  Body: ProjectsWin,    w: 470 },
  { id: "timeline",label: "TIMELINE.LOG",   title: "TIMELINE.LOG",                     Icon: IconClock,   Body: TimelineWin,    w: 460 },
  { id: "reflect", label: "DIARY.MD",       title: "DIARY.MD — Reflections",           Icon: IconChat,    Body: ReflectionsWin, w: 450 },
  { id: "outlook", label: "OUTLOOK.DAT",    title: "OUTLOOK.DAT",                      Icon: IconStar,    Body: OutlookWin,     w: 430 },
  { id: "contact", label: "ID.CARD",        title: "ID.CARD",                          Icon: IconCard,    Body: ContactWin,     w: 420 },
  { id: "system",  label: "SYSTEM",         title: "SYSTEM INFO",                      Icon: IconMonitor, Body: SystemWin,      w: 360 },
];

Object.assign(window, { DESKTOP_APPS });
