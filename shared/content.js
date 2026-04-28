// Shared portfolio content. All three directions read from this so we keep one source of truth.
// Misha — Full Stack Engineer / MLOps Intern, AI Platforms Division, Group Data Office.
// Company is intentionally generic ("Group Data Office, financial services") — edit freely.

window.PORTFOLIO = {
  identity: {
    name: "Misha",
    role: "Full Stack Engineer / MLOps Intern",
    company: "OCBC Bank, Full Stack Engineer Intern/MLOps, AI Platforms Division",
    sector: "Financial Services",
    location: "Singapore",
    period: "March 2026 - March 2026",
    email: "icyneonlights@gmail.com",
    linkedin: "https://www.linkedin.com/in/misha-ariana-4310a331a/",
    github: "https://github.com/ka-short",
    tagline: "Shipping internal ML platforms that turn notebooks into production endpoints.",
  },

  about: {
    company: "The AI Platforms division within the Group Data Office builds the internal tooling that lets the bank's ~200 data scientists move models from experimentation to production. Think feature stores, model registries, batch + online inference, governance.",
    role: "I sit between the platform's React UI and its Python services. My remit splits roughly 60/40 between full-stack feature work on the model-management portal and MLOps infrastructure for the inference runtime.",
    project: "Project MMP — a self-service portal for model registration, deployment approvals, and post-deployment drift monitoring.",
  },

  ksa: {
    knowledge: [
      { name: "Full-stack web architecture", level: 4, note: "React 18, FastAPI, PostgreSQL, Redis. Built multiple end-to-end features." },
      { name: "MLOps lifecycle", level: 3, note: "Model registry, CI/CD for models, drift detection." },
      { name: "Data governance & risk", level: 2, note: "MAS TRM guidelines, model risk management, audit trails." },
      { name: "Observability", level: 3, note: "Prometheus, Grafana, OpenTelemetry — built custom dashboards." },
    ],
    skills: [
      { name: "TypeScript / React", level: 4 },
      { name: "Python / FastAPI", level: 4 },
      { name: "PostgreSQL / SQL", level: 3 },
      { name: "CI/CD (GitHub Actions, ArgoCD)", level: 3 },
      { name: "Testing (pytest, vitest, Playwright)", level: 3 },
      { name: "ML model serving (BentoML, KServe)", level: 2 },
    ],
    attitudes: [
      { name: "Ownership", note: "Took features from spec to prod with one mentor check-in per week." },
      { name: "Communication", note: "Wrote three RFCs read by ~14 engineers; ran two cross-team demos." },
      { name: "Curiosity", note: "Self-studied optimisation so that loading times could go down." },
      { name: "Resilience", note: "Survived the mutiple upgrade incidents with quarantined resources." },
      { name: "Collaboration", note: "Paired with senior MLEs on model-registry schema migration." },
    ],
  },

  // Skills Framework for Infocomm Technology — TSC mapping (Singapore SkillsFuture).
  // Levels: 1=Basic, 2=Intermediate, 3=Proficient, 4=Advanced, 5=Expert.
  tsc: [
    { code: "ICT-DEV-3001", name: "Software Design", level: 3, evidence: "ATLAS deployment-approval module" },
    { code: "ICT-DEV-3002", name: "Software Construction", level: 4, evidence: "5,400 LOC across 7 PRs merged" },
    { code: "ICT-DAT-3003", name: "Data Engineering", level: 2, evidence: "Feature-store ingestion DAGs" },
    { code: "ICT-INF-3004", name: "Infrastructure Deployment", level: 3, evidence: "Helm chart for inference runtime" },
    { code: "ICT-DEV-3005", name: "Test Planning", level: 3, evidence: "Playwright E2E suite, 84% coverage" },
    { code: "ICT-SEC-3006", name: "Security Governance", level: 2, evidence: "Audit-log RFC adopted in v1.4" },
  ],

  // Critical Core Skills (CCS).
  ccs: [
    { name: "Problem Solving", level: "Intermediate", task: "Diagnosed a 12-minute model-deploy hang to a missing IAM policy on a sidecar." },
    { name: "Communication", level: "Intermediate", task: "Authored RFC-031 on drift-alert thresholds; ran the review meeting." },
    { name: "Collaboration", level: "Intermediate", task: "Paired with platform SRE on the K8s 1.29 upgrade runbook." },
    { name: "Self-Management", level: "Advanced", task: "Owned the drift-alerts feature solo across 4 sprints." },
    { name: "Sense Making", level: "Intermediate", task: "Reduced 1,200-row deploy spreadsheet into a 6-table relational schema." },
    { name: "Digital Fluency", level: "Advanced", task: "Built three Grafana dashboards used daily by the platform team." },
  ],

  artifacts: [
    {
      id: "atlas-portal",
      title: "ATLAS — Model Registration Portal",
      kind: "Full-stack feature",
      stack: ["React", "TypeScript", "FastAPI", "PostgreSQL"],
      summary: "Self-service UI replacing a 1,200-row deploy spreadsheet. Cut median time-to-deploy from 11 days to 2.",
      contribution: "Owned the React frontend (12 screens, 38 components) and the FastAPI approval-workflow endpoints (9 routes, 84% test coverage). Designed the schema with my mentor.",
      impact: "Used by 6 model-owner teams; 41 models registered through it in the first 6 weeks.",
      proof: ["Code: /atlas (private)", "Demo: internal Loom (link in handover)", "RFC-027"],
    },
    {
      id: "drift-alerts",
      title: "Drift Detection & Alerting Service",
      kind: "MLOps infra",
      stack: ["Python", "Prometheus", "Grafana", "Helm"],
      summary: "Streaming PSI / KS-test job that flags input-distribution drift on production models and routes alerts to model owners via Slack + PagerDuty.",
      contribution: "Wrote the detector job, the Helm chart, and the Grafana dashboard. Calibrated thresholds against 90 days of replayed traffic.",
      impact: "Caught two real drift events in week 14 (a feature pipeline regression and an upstream schema change).",
      proof: ["Helm chart: charts/drift-detector", "Grafana: dashboard #DRF-01", "Postmortem PM-2026-04"],
    },
    {
      id: "audit-logs",
      title: "Immutable Audit Log RFC",
      kind: "Design + governance",
      stack: ["Markdown", "PostgreSQL", "OpenTelemetry"],
      summary: "RFC for tamper-evident audit logging on all ATLAS write paths, aligned with MAS TRM section 6.",
      contribution: "Sole author. Researched hash-chain vs append-only-ledger options; chose hash-chained Postgres for ops simplicity.",
      impact: "Adopted in ATLAS v1.4. Cited in two subsequent platform RFCs.",
      proof: ["RFC-031", "Migration: 0007_audit_chain.sql"],
    },
    {
      id: "ci-pipeline",
      title: "Model CI/CD Pipeline",
      kind: "DevOps",
      stack: ["GitHub Actions", "ArgoCD", "BentoML"],
      summary: "GitHub Actions → BentoML → ArgoCD pipeline that takes a tagged model artifact and rolls it out to a canary, then promotes on green metrics.",
      contribution: "Wrote the canary-promotion controller and the GitHub Actions composite action that wraps BentoML build + push.",
      impact: "Reduced manual deploy steps from 14 to 2. Standard for all 8 production models.",
      proof: ["Action: actions/bentoml-publish", "ArgoCD app: model-canary"],
    },
    {
      id: "drift-dashboard",
      title: "Platform Health Dashboard",
      kind: "Observability",
      stack: ["Grafana", "PromQL", "OpenTelemetry"],
      summary: "Single-pane-of-glass for the platform team: inference latency p50/p95/p99, drift score per model, ingestion-DAG status, on-call rotation.",
      contribution: "Designed the panel layout with the platform lead. Wrote 23 PromQL queries.",
      impact: "Replaced a tab-jumble of 4 separate dashboards. Used in the daily standup.",
      proof: ["Dashboard JSON: dashboards/PLAT-overview.json"],
    },
  ],

  timeline: [
    { week: "W1–2", phase: "Onboarding", title: "Environment, security clearance, mentor pairing", note: "Set up dev env, completed MAS TRM training, paired-coded my first PR (a typo fix and a unit test)." },
    { week: "W3–4", phase: "First feature", title: "ATLAS — model-list view", note: "Shipped a paginated, filterable table. First time using React Query at scale; over-fetched everything in week 1, fixed in week 2." },
    { week: "W5–7", phase: "Spec → Code", title: "Approval workflow", note: "Wrote my first RFC (RFC-027). Realised mid-implementation that the state machine had a deadlock; refactored before merge." },
    { week: "W8–9", phase: "Incident", title: "K8s 1.29 upgrade", note: "Helped shadow the platform SRE through a cluster upgrade. A side-car missed an IAM policy; we caught it in pre-prod, not prod." },
    { week: "W10–12", phase: "Solo project", title: "Drift detection service", note: "Owned end-to-end. Calibrated thresholds the wrong way once (false-positive storm in dev), recalibrated against replayed traffic." },
    { week: "W13–14", phase: "Real value", title: "First real drift catches", note: "Two genuine drift events flagged. Wrote a postmortem for the feature-pipeline one." },
    { week: "W15–17", phase: "Governance", title: "Audit-log RFC", note: "Self-studied MAS TRM section 6. Argued for hash-chained Postgres over an append-only ledger; adopted in v1.4." },
    { week: "W18–20", phase: "Wind-down", title: "Handover & demos", note: "Cross-team demo to ~14 engineers. Wrote handover docs. Two PRs merged in the final week." },
  ],

  reflections: [
    {
      theme: "Shipping vs. shipping right",
      challenge: "Week 5: I had merged the approval-workflow state machine before noticing two terminal states could deadlock. The PR had passed review.",
      action: "Pulled the change behind a feature flag, wrote a state-diagram test that exhaustively walked every transition, refactored the FSM, then re-enabled.",
      outcome: "Caught two more edge cases in the rewrite. The exhaustive-walk test now lives in CI for every state-machine change. I learned that 'done' for stateful code means 'covered', not 'green'.",
    },
    {
      theme: "Calibration, not intuition",
      challenge: "My drift-alert thresholds were eyeballed off a single week of traffic. In dev they fired ~40 times an hour — useless.",
      action: "Replayed 90 days of production traffic against the detector, computed empirical PSI distributions per model, and set thresholds at the 99.5th percentile of in-distribution shifts.",
      outcome: "Alert volume dropped to ~3/week, two of which were real. Lesson: when you can replay history, do; intuition is a poor calibrator of statistical thresholds.",
    },
    {
      theme: "Reading the room",
      challenge: "My first RFC was technically thorough but landed flat in review — reviewers asked questions I had already answered in section 4.",
      action: "Rewrote the next RFC with a one-paragraph TL;DR, a decision matrix at the top, and the deep-dive in an appendix. Asked my mentor to read the TL;DR first and predict the conclusion.",
      outcome: "RFC-031 was approved in one round with three substantive comments. Senior engineers' attention is the scarce resource; structure for it.",
    },
    {
      theme: "Asking earlier",
      challenge: "I burned a day in week 9 trying to debug a Helm template that was rendering an empty container spec.",
      action: "Asked the platform SRE on day 2 morning. He spotted the missing `with` block in 90 seconds.",
      outcome: "Set a personal '30-minute rule' — if I'm stuck for 30 minutes on infra glue code, I ask. My mentor told me this is the single most common intern failure mode and I'd just exhibited it.",
    },
  ],

  outlook: {
    nature: "I want to keep working at the seam between application engineering and ML infrastructure — places where the work is full-stack but the system being served is stochastic. Platform-engineering teams at fintechs, AI labs, and infra-heavy startups all sit in this space.",
    challenges: "The hardest part of this internship was not the code; it was learning to write for an audience that already knew the answer and was checking if I did. Communication, RFC-writing, and reading the org chart took more deliberate practice than any technical skill.",
    growth: "Six months ago I would have called myself a 'React developer who knows some Python'. Now I think of myself as a generalist who is comfortable owning a vertical slice from UI to k8s manifest. The platform-engineering mental model — that infrastructure is a product with users — is the most useful thing I learned.",
    accomplishments: "Two real drift catches in production. One RFC adopted. ATLAS portal in daily use by six teams. But the accomplishment I'm proudest of is writing that postmortem in week 14 without making it sound like an excuse.",
    next: "Final-year capstone on ML observability tooling. Then either a platform-eng new-grad role or a master's in distributed systems.",
  },
};
