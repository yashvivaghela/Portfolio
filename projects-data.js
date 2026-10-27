const PROJECTS = [
  {
  slug: "rateshield",
  title: "RateShield",
  tags: ["TypeScript", "AWS Lambda", "API Gateway", "DynamoDB", "CloudWatch", "CDK", "k6"],
  overview: "A serverless API rate-limiting and usage-metering service that enforces per-client request quotas with a token-bucket algorithm but the real problem it's built around is making that enforcement correct when many requests for the same client arrive at the exact same instant.",
  problem: "A naive rate limiter reads a client's remaining tokens, checks the count in code, then writes the updated value back - three separate steps with a gap between them. Under concurrent traffic, multiple requests can all read the same token count before any of them writes, each thinks it's allowed, and the limit gets silently violated. Most rate-limiter write-ups skip past this; RateShield is built around proving it doesn't happen.",
  features: {
    intro: "",
    bullets: [
      {
        label: "Atomic token-bucket enforcement.",
        detail: "Reads a client's bucket, computes a lazy refill from elapsed time, then writes the result back with a DynamoDB conditional write that only commits if nothing changed since the read - serializing concurrent requests against the same bucket instead of letting them race."
      },
      {
        label: "Hot-partition-resistant sharding.",
        detail: "Splits a single high-traffic client's bucket across multiple DynamoDB partition keys, with each request routed to a random shard, trading a small amount of enforcement precision for genuine load distribution across physical partitions - a deliberate, documented tradeoff rather than a perfect guarantee."
      },
      {
        label: "Per-tier quota resolution.",
        detail: "Looks up each API key's plan (free, pro, enterprise) from a separate config table and applies that tier's own capacity and refill rate, with unrecognized keys denied by default - cached per warm Lambda container to cut a DynamoDB round-trip off the common path."
      },
      {
        label: "Fail-open circuit breaker.",
        detail: "Tracks DynamoDB errors in a rolling window and trips to an unenforced fail-open state rather than rejecting all traffic when the dependency is struggling, with a global API Gateway throttle as an independent backstop for the window where per-client enforcement is down."
      },
      {
        label: "Usage metering.",
        detail: "Increments an hourly per-key request counter using DynamoDB's native atomic ADD operation, written fire-and-forget so a metering hiccup can never affect the authorization decision itself."
      }
    ]
  },
  results: "Verified with k6 under genuine concurrent load, not just sequential requests: 15 simultaneous requests against a single bucket allowed exactly the configured capacity and denied the rest, with zero over-allowance, across repeated runs. A sustained load test ramping to 50 concurrent users across all three tiers found a real bottleneck - a per-request DynamoDB lookup - and fixing it with per-container caching and a Lambda memory tune lifted sustained throughput 63% (198 to 322 req/sec) and cut P99 latency 40% (409ms to 244ms), with zero errors in either run.",
  resultsPlaceholder: false,
  github: "https://github.com/yashvivaghela/RateShield",
  placeholder: true,
  demo: "",
  iconColor: "#e3b23c",
iconPath: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>',
},
{
  slug: "studybot",
  title: "StudyBot - AI Study Assistant",
  tags: ["Python", "FastAPI", "LangChain", "Qdrant", "Gemini API", "Next.js"],
  overview: "A full-stack RAG-powered study assistant where students can create structured study plans, chat with an AI tutor that remembers their conversation history within each topic. The AI retrieves past questions and struggles to give personalized, context-aware explanations, surfaces concept connections across sessions, and lets students evolve their plan through natural conversation when their goals or timeline change.",
  problem: "Most study tools answer a question and forget the conversation ever happened. They don't notice when a student keeps stumbling on the same concept, can't adjust a plan when someone falls behind, and have no way to connect what you're asking today to what confused you last week.",
  features: {
    intro: "A chat-driven assistant where every response is grounded in the student's own history, built around a few key pieces:",
    bullets: [
      {
        label: "Core chat interface.",
        detail: "A conversational assistant students can ask anything in - StudyBot answers questions, explains concepts, and generates full study plans on request, all from the same chat window."
      },
      {
        label: "Semantic memory.",
        detail: "Retrieves top-3 semantically similar past conversations per query using LangChain and a Qdrant vector index, detecting recurring struggle patterns and tailoring explanations without the student having to re-explain context."
      },
      {
        label: "Agentic task control.",
        detail: "Students can update their study plan directly through chat saying 'mark arrays as done' triggers intent detection, surfaces a confirmation pill, and updates the database on confirmation. No manual clicking required."
      },
      {
        label: "Adaptive study plan.",
        detail: "Gemini generates a structured 4–6 week plan with 15–20 concrete tasks. If a student struggles with a concept or runs out of time, the plan auto-adjusts inserting remedial content or compressing weeks with a preview before any changes are saved."
      },
      {
        label: "Real-time streaming.",
        detail: "Responses streamed token-by-token over SSE with a visible 'searching your study history' indicator while retrieval runs making the memory layer a visible feature, not a hidden implementation detail."
      },
      {
        label: "Storage architecture.",
        detail: "FastAPI backend with dual storage SQLite for structured chat history and plan data, Qdrant for vector search with a 3-model LLM fallback chain and sub-500ms end-to-end retrieval latency."
      }
    ]
  },
  results: "Built as a personal project to explore production RAG patterns. Covers the full AI engineering stack from vector indexing and streaming APIs to agentic tool use and adaptive planning in a single cohesive product rather than isolated demos.",
  resultsPlaceholder: false,
  github: "https://github.com/yashvivaghela/StudyBot",
  placeholder: false,
  demo: "https://www.loom.com/share/768834cef5924e378e3a347d2a54bc46",
  iconColor: "#7f77dd",
iconPath: '<path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>',
},
{
  slug: "resume-tailor-agent",
  title: "Multi-Agent Resume Tailoring System",
  tags: ["Python", "Streamlit", "Groq", "python-docx", "Pydantic", "Multi-Agent"],
  overview: "A multi-agent system that tailors a resume to a specific job description by rewriting bullet points section by section - but every rewritten claim has to be independently fact-checked against the user's real project data before it's allowed into the final resume, not just generated and trusted.",
  problem: "Asking an LLM to 'tailor my resume' usually means it quietly invents experience to better match the job description - a stronger metric here, a technology there, none of it real. Most tools have no step that actually checks whether a rewritten bullet is still true to what the person did.",
  features: {
    intro: "A three-agent pipeline where no single agent both writes and grades its own work, built around a few key pieces:",
    bullets: [
      {
        label: "Planning.",
        detail: "Matches each resume section to the past project or experience entry that best targets the job description's requirements, deciding whether to re-tailor the existing entry or replace it outright."
      },
      {
        label: "Drafting.",
        detail: "Writes new bullet points for that section using only the matched project's real data as source material - descriptions, skills, and stated metrics - with no outside invention allowed."
      },
      {
        label: "Independent grounding critic.",
        detail: "A separate agent fact-checks every drafted bullet against the source project description, classifying it as verified, overstated, unsupported, or fabricated - run independently of the agent that wrote the bullet, so nothing grades its own work."
      },
      {
        label: "Revision loop.",
        detail: "Any bullet the critic rejects goes through an automated critique-and-redraft cycle guided by the critic's specific suggested fix, not a blind retry - capped after a few attempts, with a safe fallback bullet built only from verified metadata if nothing ever passes."
      },
      {
        label: "Fit evaluation.",
        detail: "A separate scoring agent judges the finished resume as a whole against the job description once every section is done, surfacing an overall fit score plus the gaps the pipeline honestly couldn't address."
      },
      {
        label: "Style-matching docx output.",
        detail: "Detects the uploaded resume's own formatting conventions - inline bold usage, title-line style - per resume, and reproduces them in the tailored output rather than imposing a fixed template."
      }
    ]
  },
  results: "Validated with a controlled ablation study: the same pipeline run across identical job-description test cases with the grounding critic on vs. off. With it off, only 34.5% of bullets held up against the real project data. With it on, 100% did - a 65.5-percentage-point drop in fabricated and unsupported claims, confirming the critic, not the LLM's own judgment, is what keeps the output honest.",
  resultsPlaceholder: false,
  github: "https://github.com/yashvivaghela/resume-tailor-agent.git",
  placeholder: true,
  demo: "",
  iconColor: "#d4537e",
iconPath: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>',
},
{
    slug: "meeting-assistant",
    title: "Meeting Assistant - Real-Time Speech Suggestions",
    tags: ["FastAPI", "Groq API", "Speech-to-Text", "LLM"],
    overview: "A web app that listens to live audio from your mic and continuously surfaces context-aware suggestions questions to ask, talking points, answers, or fact-checks so you always have something useful to say next.",
    problem: "In the middle of a live conversation there's no time to pause and think through the sharpest way to respond by the time a good reply comes to mind, the conversation has moved on.",
    features: {
      intro: "A three-column FastAPI app that turns a live mic feed into structured, actionable suggestions in near real time:",
      bullets: [
        { label: "Live transcript.", detail: "Start/stop mic capture streams audio through speech-to-text, appending new transcript chunks roughly every 30 seconds and auto-scrolling to the latest line." },
        { label: "Context-aware suggestions.", detail: "Every ~30 seconds (or on manual refresh), the recent transcript is sent to an LLM via the Groq API, which returns exactly 3 fresh suggestions a mix of questions to ask, talking points, direct answers, or fact-checks, chosen based on what's actually being discussed. New batches stack above older ones so nothing gets lost." },
        { label: "Tappable suggestion cards.", detail: "Each suggestion shows a short, useful preview on its own tapping it pulls in full transcript context and returns a longer, more detailed answer in the chat panel." },
        { label: "Session export.", detail: "A single export captures the full transcript, every suggestion batch, and the complete chat history with timestamps for later review." }
      ]
    },
    results: "Add impact metrics or outcomes here — e.g. usage numbers, performance improvements, or what you learned.",
    resultsPlaceholder: true,
    github: "https://github.com/yashvivaghela/TwinMind_LiveSuggestions",
    placeholder: false,
    iconColor: "#7f77dd",
iconPath: '<path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/>',
  },
{
    slug: "stock-search",
    title: "Stock Search Website",
    tags: ["Angular", "TypeScript", "Node.js", "MongoDB", "GCP"],
    overview: "A stock search platform where users pull up any ticker and get a full picture live pricing, news, charts, and company insights while also being able to simulate trades and track favorites in a personal watchlist.",
    problem: "Checking live stock prices and simulating trades usually means juggling multiple sites there was no single, fast place to search a ticker and act on it.",
    features: {
      intro: "A search-first experience backed by Angular and a Node/Express API, built around a few core flows:",
      bullets: [
        { label: "Search & company view.", detail: "Ticker search with live autocomplete via the Finnhub API, opening into a company page with live price, market status, and tabs for Summary, Top News, Charts, and Insights including interactive historical charts across 1-month to 1-year ranges with zoom and scroll." },
        { label: "Simulated trading.", detail: "Users can buy and sell at real-time prices, with a confirmation banner and instant portfolio update on every transaction." },
        { label: "Watchlist & portfolio.", detail: "A one-tap star toggle adds or removes stocks from a personal watchlist, while the portfolio view shows real-time price, cost basis, market value, and gain/loss for every holding, with the option to sell directly from that screen." },
        { label: "Deployment & storage.", detail: "User and portfolio data persisted in MongoDB, with the backend deployed on Google App Engine." }
      ]
    },
    results: "Cached responses for frequently searched tickers, which noticeably cut load times on repeat lookups and reduced redundant calls to the Finnhub and Polygon APIs.",
    resultsPlaceholder: false,
    github: "https://github.com/yashvivaghela/StockSearchWebsite",
    placeholder: false,
    iconColor: "#378add",
iconPath: '<polyline points="3 17 9 11 13 15 21 7"/><polyline points="14 7 21 7 21 14"/>',
  },
  {
    slug: "image-caption-generator",
    title: "Image Caption Generator - Model Benchmarking",
    tags: ["Python", "TensorFlow", "Hugging Face", "Computer Vision"],
    overview: "A systematic benchmark of 9 image captioning architectures, comparing older encoder-decoder approaches against modern transformer-based models to see how much captioning quality actually varies in practice.",
    problem: "There's no shortage of image captioning models, but picking one usually means trusting a paper's reported numbers rather than testing them side by side on the same data.",
    features: {
      intro: "An evaluation pipeline built to compare models fairly, under identical conditions:",
      bullets: [
        { label: "Benchmark scope.", detail: "9 models spanning encoder-decoder (VGG16/InceptionV3 + RNN) and transformer-based (BLIP, ClipCap, GPT-2, GIT) architectures." },
        { label: "Automated pipeline.", detail: "Preprocessing and BLEU-2 evaluation automated across 400 curated images from Flickr8k." },
        { label: "Findings.", detail: "Found 15–20% variance in BLEU-2 scores across models, exposing meaningful gaps in captioning quality." },
        { label: "Validation.", detail: "Cross-checked automated scores against manual annotation on a subset of images to confirm the metric matched real-world caption quality." }
      ]
    },
    results: "Add impact metrics or outcomes here — e.g. usage numbers, performance improvements, or what you learned.",
    resultsPlaceholder: true,
    github: "#",
    placeholder: false,
    iconColor: "#1d9e75",
iconPath: '<rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-5-5L5 21"/>',
  },
{
    slug: "interview-feedback-assistant",
    title: "Interview Feedback Assistant",
    tags: ["Python", "Flask", "spaCy", "FER", "Librosa", "Machine Learning"],
    overview: "A mock-interview platform that pulls a random question, records a candidate's response, and turns it into structured feedback on delivery, tone, and word choice instead of just a pass/fail impression.",
    problem: "Practicing interviews alone means you have no way to know how you actually came across — whether your delivery, tone, or word choice would raise a flag with a real interviewer.",
    features: {
      intro: "A Flask app that runs a recorded response through several ML models to score how it actually landed:",
      bullets: [
        { label: "Expression scoring.", detail: "Facial Expression Recognition (FER) scores each detected emotion frame-by-frame and surfaces the dominant expression across the response." },
        { label: "Tone analysis.", detail: "Vocal tone is analyzed with librosa for audio feature extraction, then classified into speech emotions using an MLP classifier." },
        { label: "Language flagging.", detail: "The response is transcribed from speech to text, run through NLP preprocessing, and checked against a curated word list with spaCy's matcher to flag phrasing that shouldn't come up in an interview." },
        { label: "Relevance check.", detail: "Keyword matching specific to each question determines whether the candidate's answer actually stayed on-topic." },
        { label: "Resume matching.", detail: "A separate tool scores resume-to-job-description similarity using cosine similarity." }
      ]
    },
    results: "Add impact metrics or outcomes here - e.g. usage numbers, performance improvements, or what you learned.",
    resultsPlaceholder: true,
    github: "https://github.com/yashvivaghela/MockwithUs",
    placeholder: false,
    iconColor: "#d85a30",
iconPath: '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>',
  },
{
    slug: "signsync",
    title: "SignSync - ASL Detection",
    tags: ["Flask", "TensorFlow", "OpenCV", "Computer Vision"],
    overview: "A web app that detects American Sign Language from a live camera feed and converts it to text, aimed at making everyday communication easier for people with speech disabilities.",
    problem: "Real-time communication between ASL signers and non-signers usually depends on a human interpreter being available there's no lightweight, always-on option for quick, everyday exchanges.",
    features: {
      intro: "A Flask app combining hand detection and sign classification to turn ASL into text in real time:",
      bullets: [
        { label: "Sign detection.", detail: "OpenCV isolates and tracks the signer's hand from the live camera feed, then TensorFlow's Object Detection API classifies the hand shape as an ASL sign." },
        { label: "Live translation.", detail: "Recognized signs are converted into readable text on screen as they happen." },
        { label: "Bonus tool.", detail: "A photo upload feature lets users click anywhere on an image to read out the RGB value at that point." }
      ]
    },
    results: "Add impact metrics or outcomes here - e.g. usage numbers, performance improvements, or what you learned.",
    resultsPlaceholder: true,
    github: "https://github.com/yashvivaghela/SignSync",
    placeholder: false,
    iconColor: "#1d9e75",
iconPath: '<path d="M23 7l-7 5 7 5V7z"/><rect x="1" y="5" width="15" height="14" rx="2"/>',
  }
];