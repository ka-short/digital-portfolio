// Shared portfolio content. All three directions read from this so we keep one source of truth.
// Misha — Full Stack Engineer / MLOps Intern, AI Platforms, Group Data Office, OCBC.

window.PORTFOLIO = {
  identity: {
    name: "Misha",
    role: "Full Stack Engineer / MLOps Intern",
    employer: "OCBC",
    company: "AI Platforms · Group Data Office",
    sector: "Fintech",
    location: "Singapore",
    period: "Mar 2026 — Mar 2027",
    email: "icyneonlights@gmail.com",
    linkedin: "linkedin.com/in/misha-ariana-4310a331a",
    github: "github.com/ka-short",
    pronouns: "she/her",
    tagline: "Building AI governance and LLM observability tooling inside a bank.",
  },

  about: {
    company: "AI Platforms sits within OCBC's Group Data Office. The team builds AI governance, documentation, and observability tooling for the bank's model teams.",
    role: "I work across three projects: MMP, an AI governance and documentation platform; GM Capture, a document-to-report tool; and evaluation work with Arize AI on LLM observability. I also help with MLOps work comparing LLM configurations for GPU deployment.",
    project: "MMP (Model Management Platform) — an AI governance and documentation platform that tracks drift in models and their runs. My main project so far. I rebuilt its frontend and migrated it from React 18 to React 19 on Vite.",
  },

  ksa: {
    knowledge: [
      { name: "Full-stack web development", level: 4, note: "React 18 to 19, Vite, Python. Shipped 8+ features end to end in GM Capture, fixed the MMP frontend." },
      { name: "AI governance & model observability", level: 3, note: "MMP tracks drift in models and their runs. Arize AI for trace submission, latency, and evaluation." },
      { name: "MLOps / LLM deployment", level: 2, note: "GPU-hosted LLMs inside OCBC. Comparing Gemma model configurations for quality vs. memory footprint." },
      { name: "Security", level: 2, note: "Learned banking-specific security practices, different from how I worked in poly." },
    ],
    skills: [
      { name: "React (18 → 19)", level: 4 },
      { name: "Vite", level: 4 },
      { name: "Python", level: 3 },
      { name: "Bloomberg data integration", level: 3 },
      { name: "Arize AI (Phoenix + enterprise)", level: 2 },
      { name: "Security practices (banking)", level: 2 },
    ],
    attitudes: [
      { name: "Ownership", note: "Built GM Capture almost entirely solo, asking coworkers for help when needed." },
      { name: "Initiative", note: "Migrated MMP from React 18 to React 19 and moved it to Vite, cutting FE build memory from 16GB to 4GB." },
      { name: "Collaboration", note: "Pushed code to master and assisted with post-mortem bugs on MMP." },
      { name: "Curiosity", note: "Started exploring Arize AI's enterprise platform and how to use it inside OCBC, including live evaluations for agentic flows." },
    ],
  },

  // Critical Core Skills (CCS).
  ccs: [
    { name: "Problem Solving", level: "Intermediate", task: "Compared Gemma model configurations to find one with the same quality but a smaller memory footprint." },
    { name: "Communication", level: "Intermediate", task: "Drafted a tutorial and client library plan for Arize AI, for data scientists to use." },
    { name: "Collaboration", level: "Intermediate", task: "Worked with coworkers on GM Capture when stuck, despite owning it mostly solo." },
    { name: "Self-Management", level: "Advanced", task: "Owned GM Capture end to end, shipping 8+ features." },
    { name: "Sense Making", level: "Intermediate", task: "Cut MMP's frontend build memory from 16GB to 4GB by migrating to React 19 and Vite." },
    { name: "Digital Fluency", level: "Advanced", task: "Learned Vite, React 19, Python, and OCBC's security practices, on top of the Arize observability stack." },
  ],

  artifacts: [
    {
      id: "mmp",
      title: "MMP — Model Management Platform",
      kind: "AI governance / full-stack",
      stack: ["React", "Vite", "Python"],
      summary: "AI governance and documentation platform for OCBC's models. Tracks drift in models and their runs.",
      contribution: "Fixed and rebuilt the frontend. Migrated the codebase from React 18 to React 19 and moved the build to Vite.",
      impact: "Cut frontend build memory from 16GB to 4GB. All code pushed to master; assisted with post-mortem bugs after release.",
      proof: ["Internal to OCBC, not public"],
    },
    {
      id: "gm-capture",
      title: "GM Capture",
      kind: "Full-stack, built solo",
      stack: ["React", "Python", "Bloomberg data"],
      summary: "Lets workers upload documents and generates a report on the stock, using data pulled from Bloomberg.",
      contribution: "Built almost entirely by myself, with help from coworkers when needed. Shipped 8+ features end to end.",
      impact: "Working tool used to generate stock reports from uploaded documents.",
      proof: ["Internal to OCBC, not public"],
    },
    {
      id: "arize-ai",
      title: "Arize AI Integration",
      kind: "LLM observability / evaluation",
      stack: ["Arize", "Python"],
      summary: "Submitting traces to the Arize platform to see what happened step to step and measure latency. Moving from Arize Phoenix to the enterprise version.",
      contribution: "Exploring enterprise features, including live evaluations for agentic flows. Evaluating two different LLM configurations on a shared dataset to check they're on par. Setting up a test space and writing a tutorial and client library for data scientists.",
      impact: "Ongoing, early stage.",
      proof: ["Internal to OCBC, not public"],
    },
    {
      id: "llm-deployment",
      title: "LLM Deployment Comparison (Gemma)",
      kind: "MLOps",
      stack: ["GPU", "Gemma"],
      summary: "OCBC's MLOps team deploys LLMs on GPU inside the bank. The Gemma model is deployed; found a different configuration with similar quality but a smaller memory footprint.",
      contribution: "Comparing the two configurations on the same dataset to check quality actually holds up.",
      impact: "Ongoing.",
      proof: ["Internal to OCBC, not public"],
    },
  ],

  timeline: [
    { week: "First 2 weeks", phase: "Onboarding", title: "Waiting on access", note: "Slow start. Mostly onboarding, waiting for internet and system access." },
    { week: "Since then", phase: "All 3 projects", title: "MMP, GM Capture, Arize AI", note: "Working across all three at the same time rather than one after another. See Projects for what I did on each." },
  ],

  reflections: [
    {
      theme: "Slow start, then the deep end",
      challenge: "The first two weeks were kind of boring. Mostly waiting for onboarding and for internet and system access.",
      action: "Once access came through, I started reading through the existing codebases. First time seeing fully built production apps instead of school projects.",
      outcome: "It was interesting piecing together how everything fit together, and it set up the rest of the internship.",
    },
    {
      theme: "Learning React and real apps on the job",
      challenge: "Never used ReactJS in school, and never built a full application either, only prototypes.",
      action: "Learned ReactJS and how full applications are structured while actually working on MMP and GM Capture instead of in a classroom.",
      outcome: "Picked it up fast enough that coworkers were impressed, but that wasn't luck. I put in a lot of effort to actually understand the underlying architecture of the codebases I was working in, so my fixes matched the style my predecessors used.",
    },
  ],

  outlook: {
    nature: "I want to keep working on MLOps and explore Arize AI further. Planning to continue with this internship.",
    challenges: "The learning curve was the hardest part. I'd never used ReactJS in school and never built a full application, only prototypes. On top of that, security practices in a bank are different from anything I did in poly, so I had to pick that up on the job too.",
    growth: "I went from someone who hadn't touched ReactJS or shipped a full application to owning GM Capture end to end (8+ features) and rebuilding the MMP frontend on my own, migrating it from React 18 to React 19 on Vite. I also learned to read and match the coding style of the engineers who came before me instead of just making things work.",
    accomplishments: "Cutting MMP's frontend build memory from 16GB to 4GB, and shipping GM Capture almost entirely solo.",
    next: "After this internship, I realised I need more social interaction in my day to day work. I'm considering a pivot into a pre-sales engineer role, where I can combine being extroverted with the technical knowledge I've built here.",
  },
};
