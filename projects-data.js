const PROJECTS = [
{
  slug: "studybot",
  title: "StudyBot — AI Study Assistant",
  tags: ["Python", "FastAPI", "LangChain", "Qdrant", "Gemini API", "Next.js"],
  overview: "A full-stack RAG-powered study assistant that remembers how a student has struggled across sessions, adapts explanations to their level, and evolves their study plan automatically instead of treating every question as a blank slate.",
  problem: "Most study tools answer a question and forget the conversation ever happened. They don't notice when a student keeps stumbling on the same concept, can't adjust a plan when someone falls behind, and have no way to connect what you're asking today to what confused you last week.",
  features: {
    intro: "A chat-driven assistant where every response is grounded in the student's own history, built around a few key pieces:",
    bullets: [
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
        label: "Concept connections.",
        detail: "When retrieved context surfaces a related past question, the bot explicitly connects it 'this is similar to what you asked about two pointers last week' building a web of understanding rather than isolated answers."
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
  placeholder: false
},
{
    slug: "meeting-assistant",
    title: "Meeting Assistant — Real-Time Speech Suggestions",
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
    placeholder: false
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
    placeholder: false
  },
  {
    slug: "image-caption-generator",
    title: "Image Caption Generator — Model Benchmarking",
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
    placeholder: false
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
    results: "Add impact metrics or outcomes here — e.g. usage numbers, performance improvements, or what you learned.",
    resultsPlaceholder: true,
    github: "https://github.com/yashvivaghela/MockwithUs",
    placeholder: false
  },
{
    slug: "signsync",
    title: "SignSync — ASL Detection",
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
    results: "Add impact metrics or outcomes here — e.g. usage numbers, performance improvements, or what you learned.",
    resultsPlaceholder: true,
    github: "https://github.com/yashvivaghela/SignSync",
    placeholder: false
  }
];