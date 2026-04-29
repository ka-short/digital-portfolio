/* global React, ReactDOM */
const { useState, useEffect, useMemo } = React;
const P = window.PORTFOLIO;

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver((ents) => {
      ents.forEach((e) => { if (e.isIntersecting) e.target.classList.add("in"); });
    }, { threshold: 0.1 });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function Masthead() {
  const [date, setDate] = useState("");
  useEffect(() => {
    const d = new Date();
    setDate(d.toLocaleDateString("en-GB", { day: "2-digit", month: "long", year: "numeric" }).toUpperCase());
  }, []);
  return (
    <header className="mast">
      <div className="shell">
        <div className="mast-row">
          <div className="left">
            VOL. I · NO. 1<br />
            CIT2C27 — IND1<br />
            DIGITAL PORTFOLIO · 40%
          </div>
          <div className="center">
            The Internship Dossier
            <span className="red">FILE: MISHA / 0001 / 2026</span>
          </div>
          <div className="right">
            {date}<br />
            SINGAPORE EDITION<br />
            ESTABLISHED MAR 2026
          </div>
        </div>
        <div className="mast-bar">
          <span>56 weeks · ∞ artifacts · 2 RFCs · 1 internship</span>
          <span>icyneonlights@gmail.com · linkedin · github</span>
          <span>"Calibration, not intuition."</span>
        </div>
      </div>
    </header>
  );
}

function Hero() {
  const id = P.identity;
  return (
    <section className="hero crop">
      <div className="shell">
        <div className="hero-grid reveal">
          <aside className="id-card">
            <div className="id-photo">
              <img src="images/photo.jpg" alt={id.name} />
            </div>
            <dl>
              <dt>NAME</dt><dd>{id.name}</dd>
              <dt>ROLE</dt><dd>{id.role}</dd>
              <dt>TEAM</dt><dd>{id.company}</dd>
              <dt>SECTOR</dt><dd>{id.sector}</dd>
              <dt>PERIOD</dt><dd>{id.period}</dd>
              <dt>EMAIL</dt><dd><a href={`mailto:${id.email}`}>{id.email}</a></dd>
              <dt>LI</dt><dd><a href={`https://${id.linkedin}`}>{id.linkedin}</a></dd>
              <dt>GH</dt><dd><a href={`https://${id.github}`}>{id.github}</a></dd>
            </dl>
          </aside>
          <div className="hero-title">
            <div className="eyebrow">— A FIELD REPORT FROM 20 WEEKS INSIDE A PLATFORM TEAM</div>
            <h1 className="display">Notebooks<br />into <em>endpoints.</em></h1>
            <p className="lede">{id.tagline} An honest account of what was built, what broke, what was learned — and what the work is becoming.</p>
            <div className="byline">
              <div>BY<span className="v">{id.name}</span></div>
              <div>AT<span className="v">AI Platforms</span></div>
              <div>OVER<span className="v">20 weeks</span></div>
              <div>STATUS<span className="v">Submitted</span></div>
            </div>
            <div className="stamp">CLEARED FOR<br />SUBMISSION<span className="sub">CIT2C27 / IND1</span></div>
          </div>
        </div>
      </div>
    </section>
  );
}

function About() {
  const a = P.about;
  return (
    <section className="crop" id="about">
      <div className="shell">
        <div className="sec-head reveal">
          <div className="num">I.</div>
          <div className="ttl">
            <span className="kicker">— SECTION ONE</span>
            <h2>The Setting</h2>
          </div>
          <div className="stub">PP. 03 — 04</div>
        </div>
        <div className="about reveal">
          <article data-num="01">
            <div className="lbl">— THE TEAM</div>
            <h3>AI Platforms · Group Data Office</h3>
            <p>{a.company}</p>
          </article>
          <article data-num="02">
            <div className="lbl">— THE ROLE</div>
            <h3>Full-stack & MLOps</h3>
            <p>{a.role}</p>
          </article>
          <article data-num="03">
            <div className="lbl">— THE PROJECT</div>
            <h3>Project MMP</h3>
            <p>{a.project}</p>
          </article>
        </div>
      </div>
    </section>
  );
}

function Pips({ n, max = 5 }) {
  return (
    <div className="lvl">
      {Array.from({ length: max }).map((_, i) => (
        <span key={i} className={i < n ? "on" : ""} />
      ))}
    </div>
  );
}

function KSA() {
  const k = P.ksa;
  return (
    <section className="crop" id="ksa">
      <div className="shell">
        <div className="sec-head reveal">
          <div className="num">II.</div>
          <div className="ttl">
            <span className="kicker">— SECTION TWO</span>
            <h2>Knowledge, Skills, Attitudes</h2>
          </div>
          <div className="stub">PP. 05 — 08</div>
        </div>

        <div className="ksa-wrap reveal">
          <div className="ksa-col">
            <h4>Knowledge.<em>—</em></h4>
            <div className="col-lbl">domains worked in</div>
            {k.knowledge.map((it) => (
              <div className="k-item" key={it.name}>
                <div className="row"><div className="name">{it.name}</div><Pips n={it.level} /></div>
                <div className="note">{it.note}</div>
              </div>
            ))}
          </div>
          <div className="ksa-col">
            <h4>Skills.<em>—</em></h4>
            <div className="col-lbl">tools used hands-on</div>
            {k.skills.map((it) => (
              <div className="k-item" key={it.name}>
                <div className="row"><div className="name">{it.name}</div><Pips n={it.level} /></div>
              </div>
            ))}
          </div>
          <div className="ksa-col">
            <h4>Attitudes.<em>—</em></h4>
            <div className="col-lbl">how I showed up</div>
            {k.attitudes.map((it) => (
              <div className="k-item" key={it.name}>
                <div className="row"><div className="name">{it.name}</div></div>
                <div className="note">{it.note}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="refs reveal">
          <div>
            <h4>— Mapped to SkillsFuture · Technical Skills & Competencies</h4>
            <table>
              <thead><tr><th>Code</th><th>Competency</th><th>Lvl</th></tr></thead>
              <tbody>
                {P.tsc.map((t) => (
                  <tr key={t.code}>
                    <td style={{ width: 110, color: "var(--ink-3)", fontSize: 11 }}>{t.code}</td>
                    <td><div className="nm">{t.name}</div><div className="evi">{t.evidence}</div></td>
                    <td className="lvl" style={{ width: 60 }}>L{t.level}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div>
            <h4>— Mapped to SkillsFuture · Critical Core Skills</h4>
            <table>
              <thead><tr><th>Skill</th><th>Level</th><th>Evidence</th></tr></thead>
              <tbody>
                {P.ccs.map((c) => (
                  <tr key={c.name}>
                    <td className="nm" style={{ width: 130 }}>{c.name}</td>
                    <td className="lvl" style={{ width: 100 }}>{c.level}</td>
                    <td className="evi">{c.task}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}

function Artifacts() {
  return (
    <section className="crop" id="artifacts">
      <div className="shell">
        <div className="sec-head reveal">
          <div className="num">III.</div>
          <div className="ttl">
            <span className="kicker">— SECTION THREE</span>
            <h2>The Evidence</h2>
          </div>
          <div className="stub">PP. 09 — 18</div>
        </div>
        <div className="artifact-wrap">
          {P.artifacts.map((a, i) => (
            <article className="artifact-feat reveal" key={a.id}>
              <div className="a-img">
                <span className="corner">FIG. {String(i + 1).padStart(2, "0")}</span>
                <img src={`images/${a.id}.jpg`} alt={a.title} />
              </div>
              <div>
                <div className="a-num">No. {String(i + 1).padStart(2, "0")} of {P.artifacts.length}</div>
                <div className="kind">— {a.kind}</div>
                <h3>{a.title}</h3>
                <p className="summary">"{a.summary}"</p>
                <dl className="meta">
                  <div><dt>Contribution</dt><dd>{a.contribution}</dd></div>
                  <div><dt>Impact</dt><dd>{a.impact}</dd></div>
                  <div><dt>Stack</dt><dd className="stack">{a.stack.map((s) => <span key={s}>{s}</span>)}</dd></div>
                  <div><dt>Proof</dt><dd className="proof">{a.proof.map((p) => <span key={p}>{p}</span>)}</dd></div>
                </dl>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Timeline() {
  return (
    <section className="crop" id="timeline">
      <div className="shell">
        <div className="sec-head reveal">
          <div className="num">IV.</div>
          <div className="ttl">
            <span className="kicker">— SECTION FOUR</span>
            <h2>The Twenty Weeks</h2>
          </div>
          <div className="stub">PP. 19 — 22</div>
        </div>
        <div className="strip reveal">
          <div className="strip-axis"></div>
          <div className="strip-frames">
            {P.timeline.map((t) => (
              <div className="frame" key={t.week}>
                <div className="week-tag">{t.week}</div>
                <div className="phase">▸ {t.phase}</div>
                <h4>{t.title}</h4>
                <p>{t.note}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Reflect() {
  return (
    <section className="crop" id="reflect">
      <div className="shell">
        <div className="sec-head reveal">
          <div className="num">V.</div>
          <div className="ttl">
            <span className="kicker">— SECTION FIVE</span>
            <h2>Reflections, in three acts</h2>
          </div>
          <div className="stub">PP. 23 — 28</div>
        </div>
        <div className="reflect-wrap">
          {P.reflections.map((r, i) => (
            <article className="reflect-piece reveal" key={i}>
              <div className="left">
                <div className="num">No. {String(i + 1).padStart(2, "0")} / 04</div>
                <div className="quote">{r.theme}</div>
              </div>
              <div className="acts">
                <div className="act"><h5>I. Challenge</h5><p>{r.challenge}</p></div>
                <div className="act"><h5>II. Action</h5><p>{r.action}</p></div>
                <div className="act"><h5>III. Outcome</h5><p>{r.outcome}</p></div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Outlook() {
  const o = P.outlook;
  return (
    <section className="crop" id="outlook">
      <div className="shell">
        <div className="sec-head reveal">
          <div className="num">VI.</div>
          <div className="ttl">
            <span className="kicker">— SECTION SIX</span>
            <h2>The Future Self</h2>
          </div>
          <div className="stub">PP. 29 — 32</div>
        </div>
        <div className="outlook reveal">
          <article><div className="lbl">— Nature of work</div><h3>The seam I want to keep working on</h3><p>{o.nature}</p></article>
          <article><div className="lbl">— Challenges faced</div><h3>The harder thing was the writing</h3><p>{o.challenges}</p></article>
          <article><div className="lbl">— Learning & growth</div><h3>Generalist with a vertical slice</h3><p>{o.growth}</p></article>
          <article><div className="lbl">— Accomplishments</div><h3>The postmortem I'm proudest of</h3><p>{o.accomplishments}</p></article>
        </div>
        <div className="next-strip reveal">
          <div className="lbl">NEXT —</div>
          <div className="body">{o.next}</div>
        </div>
      </div>
    </section>
  );
}

function Colophon() {
  return (
    <footer className="colophon">
      <div className="shell">
        <div className="colophon-row reveal">
          <h2>End of <em>file.</em></h2>
          <div className="meta">
            <div>set in Tiempos & JetBrains Mono</div>
            <div>printed digitally · April 2026</div>
            <div>© {P.identity.name} · all rights remembered</div>
            <div>artifacts redacted of proprietary information</div>
          </div>
        </div>
      </div>
    </footer>
  );
}

function App() {
  useReveal();
  return (
    <>
      <Masthead />
      <Hero />
      <About />
      <KSA />
      <Artifacts />
      <Timeline />
      <Reflect />
      <Outlook />
      <Colophon />
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
