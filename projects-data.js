const PROJECTS = [
  {
    slug: "studybot",
    title: "StudyBot — AI Study Assistant",
    tags: ["Python", "FastAPI", "LangChain", "Qdrant", "Gemini API", "Next.js"],
    overview: "A full-stack RAG-powered study assistant that remembers how a student has struggled in past sessions and adapts its explanations accordingly, instead of treating every question as a blank slate.",
    problem: "Most study tools answer a question and forget the conversation ever happened — they don't notice when a student keeps stumbling on the same concept, and they don't turn that into a plan.",
    features: {
      intro: "A chat-driven assistant where every response is grounded in the student's own history, built around a few key pieces:",
      bullets: [
        { label: "Semantic memory.", detail: "Retrieval over past conversations to detect recurring struggle patterns and tailor explanations, using LangChain and a Qdrant vector index." },
        { label: "Real-time streaming.", detail: "Responses streamed token-by-token over SSE instead of waiting for a full reply." },
        { label: "Storage architecture.", detail: "FastAPI backend with dual storage — SQLite for structured data, Qdrant for vector search — hitting sub-500ms retrieval." },
        { label: "Study planning.", detail: "A Gemini-powered planner turns a topic into a structured 4–6 week study plan with 15–20 concrete, trackable tasks." },
        { label: "Progress tracking.", detail: "Each task links directly back into the chat, so a student can jump from 'what should I study' to 'explain this' without leaving the flow." }
      ]
    },
    results: "Add impact metrics or outcomes here — e.g. usage numbers, performance improvements, or what you learned.",
    resultsPlaceholder: true,
    github: "#",
    placeholder: false
  },
  {
    slug: "meeting-assistant",
    title: "Meeting Assistant — Real-Time Speech Suggestions",
    tags: ["FastAPI", "Groq API", "Speech-to-Text", "LLM"],
    overview: "A side project that listens in on a live meeting and quietly suggests what you could say next, built to test how fast a speech-to-LLM loop can run and still feel usable in real time.",
    problem: "In the middle of a live meeting there's no time to pause and think through the sharpest way to respond — by the time a good reply comes to mind, the conversation has moved on.",
    features: {
      intro: "A FastAPI pipeline built to turn live audio into usable suggestions fast enough for mid-conversation use:",
      bullets: [
        { label: "Audio capture.", detail: "Live audio captured and piped through speech-to-text in real time." },
        { label: "LLM suggestions.", detail: "Transcripts sent straight to an LLM through the Groq API to generate real-time response suggestions." },
        { label: "Lightweight frontend.", detail: "A simple HTML/CSS interface built for glanceable, in-the-moment suggestions rather than a full transcript view." },
        { label: "Low latency.", detail: "The full pipeline — audio in, suggestion out — was built to stay fast enough to be useful mid-conversation, not as a post-meeting summary tool." }
      ]
    },
    results: "Add impact metrics or outcomes here — e.g. usage numbers, performance improvements, or what you learned.",
    resultsPlaceholder: true,
    github: "#",
    placeholder: false
  },
  {
    slug: "stock-search",
    title: "Stock Search Website",
    tags: ["Angular", "Node.js", "MongoDB", "GCP"],
    overview: "A stock search web application built with Angular and Node.js, integrating the Finnhub and Polygon APIs to display real-time market data for 50+ stocks.",
    problem: "Checking live stock prices and simulating trades usually means juggling multiple sites — there was no single, fast place to search a ticker and act on it.",
    features: {
      intro: "A search-first web app where users look up any of 50+ stocks and act on live data, built around a few key pieces:",
      bullets: [
        { label: "Live market data.", detail: "Real-time pricing for 50+ stocks pulled from the Finnhub and Polygon APIs." },
        { label: "Trade simulation.", detail: "Buy/sell trade simulation with persistent watchlists." },
        { label: "Deployment & storage.", detail: "User data stored in MongoDB, backend deployed on Google App Engine." },
        { label: "Caching layer.", detail: "Added for frequently requested tickers to cut redundant API calls." }
      ]
    },
    results: "Add impact metrics or outcomes here — e.g. usage numbers, performance improvements, or what you learned.",
    resultsPlaceholder: true,
    github: "#",
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
    tags: ["Python", "Flask", "spaCy", "Machine Learning"],
    overview: "A mock-interview platform that records a candidate's response and turns it into structured, actionable feedback instead of just a pass/fail impression.",
    problem: "Practicing interviews alone means you have no way to know how you actually came across — whether your delivery, expressions, or word choice would raise a flag with a real interviewer.",
    features: {
      intro: "A Flask app built around ML-driven feedback on how a response actually comes across:",
      bullets: [
        { label: "Delivery feedback.", detail: "ML analysis of speaking style and facial expression from recorded responses." },
        { label: "Language flagging.", detail: "spaCy's matcher scans responses in real time for words or phrases that shouldn't come up in an interview." },
        { label: "Resume matching.", detail: "Resume-to-job-description similarity scoring computed with cosine similarity." },
        { label: "End-to-end flow.", detail: "From recording a response to receiving structured feedback, all in the browser." }
      ]
    },
    results: "Add impact metrics or outcomes here — e.g. usage numbers, performance improvements, or what you learned.",
    resultsPlaceholder: true,
    github: "#",
    placeholder: false
  },
  {
    slug: "signsync",
    title: "SignSync — ASL Detection",
    tags: ["Flask", "TensorFlow", "OpenCV", "Computer Vision"],
    overview: "A web app that reads American Sign Language from a camera feed and converts it to text in real time, aimed at making everyday communication easier for people who are deaf or speech-impaired.",
    problem: "Real-time communication between ASL signers and non-signers usually depends on a human interpreter being available — there's no lightweight, always-on option for quick, everyday exchanges.",
    features: {
      intro: "A Flask app built to make ASL communication real-time and accessible:",
      bullets: [
        { label: "Real-time detection.", detail: "ASL sign recognition from live camera input using TensorFlow's Object Detection API." },
        { label: "Live translation.", detail: "Detected signs converted into readable text on screen as they happen." },
        { label: "Bonus tool.", detail: "A photo upload tool where users can click anywhere on an image to read out the RGB value at that point." },
        { label: "Accessibility-first design.", detail: "Built with accessibility as the core use case, not an add-on feature." }
      ]
    },
    results: "Add impact metrics or outcomes here — e.g. usage numbers, performance improvements, or what you learned.",
    resultsPlaceholder: true,
    github: "#",
    placeholder: false
  }
];