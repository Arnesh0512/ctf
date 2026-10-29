/**
 * DELHI FM LIVE - Radio Player Engine
 * Supports 13 Stations: Delhi NCR Broadcasters + World International Channels
 * Features:
 * - High precision, pixel-perfect analog FM dial tracking
 * - Interactive draggable red needle with mouse and touch support
 * - Synthesized authentic FM radio static noise on empty frequencies
 */

(function () {
  'use strict';
  // Safe browser environment check - prevents server-side / SSR execution errors
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return;
  }

const STATIONS = [
  // --- DELHI NCR BROADCASTERS ---
  {
    name: "92.7 Big FM Delhi",
    broadcaster: "Big FM Delhi",
    freq: "92.7",
    category: "delhi",
    flag: "🇮🇳",
    tagline: "Dhun Badal Ke Toh Dekho • Bollywood Retro & 90s Superhits",
    format: "MP3 Stereo",
    quality: "HQ 128 kbps",
    color: "#f59e0b",
    streams: [
      "https://server.mixify.in/listen/listen/radio.mp3",
      "https://2.mystreaming.net/uber/bollywood2000s/icecast.audio",
      "http://stream.radiobollyfm.in:8201/hd?t=1526570335"
    ],
    type: "audio"
  },
  {
    name: "Superhits 93.5 Red FM",
    broadcaster: "Red FM Delhi NCR",
    freq: "93.5",
    category: "delhi",
    flag: "🇮🇳",
    tagline: "Bajaate Raho! • Delhi's Superhit Bollywood Station",
    format: "MP3 Live",
    quality: "HQ 128 kbps",
    color: "#ef233c",
    streams: [
      "https://drive.uber.radio/uber/bollywoodnow/icecast.audio",
      "http://stream.radiobollyfm.in:8201/hd?t=1526570335"
    ],
    type: "audio"
  },
  {
    name: "Radio Mirchi 98.3 FM",
    broadcaster: "Mirchi Delhi",
    freq: "98.3",
    category: "delhi",
    flag: "🇮🇳",
    tagline: "Mirchi Sunnewaale Always Khush! • Delhi Hindi Hits",
    format: "MP3 Icecast",
    quality: "HQ 128 kbps",
    color: "#f97316",
    streams: [
      "https://eu8.fastcast4u.com/proxy/clyedupq/stream",
      "https://drive.uber.radio/uber/bollywoodnow/icecast.audio"
    ],
    type: "audio"
  },
  {
    name: "AIR FM Gold Delhi 100.1",
    broadcaster: "Akashvani Delhi",
    freq: "100.1",
    category: "delhi",
    flag: "🇮🇳",
    tagline: "Akashvani Delhi National • Hindi Classics & Cultural News",
    format: "HLS Official",
    quality: "Auto 64 kbps",
    color: "#eab308",
    streams: [
      "/hls-proxy?url=https://d3r9rhourdc02u.cloudfront.net/assets/radio/airdelhi03/air003_Auto.m3u8",
      "/hls-proxy?url=https://d3r9rhourdc02u.cloudfront.net/assets/radio/airdelhi03/air00364kbps.m3u8"
    ],
    type: "hls"
  },
  {
    name: "AIR FM Rainbow Delhi 102.6",
    broadcaster: "Akashvani Delhi",
    freq: "102.6",
    category: "delhi",
    flag: "🇮🇳",
    tagline: "Dilli Ki Taazi Dhadkan • Live RJ Shows & Youth Hits",
    format: "HLS Official",
    quality: "Auto 64 kbps",
    color: "#06b6d4",
    streams: [
      "/hls-proxy?url=https://d3r9rhourdc02u.cloudfront.net/assets/radio/airdelhi02/air002_Auto.m3u8",
      "/hls-proxy?url=https://d3r9rhourdc02u.cloudfront.net/assets/radio/airdelhi02/air00264kbps.m3u8"
    ],
    type: "hls"
  },
  {
    name: "Vividh Bharati 102.8 FM",
    broadcaster: "All India Radio Delhi",
    freq: "102.8",
    category: "delhi",
    flag: "🇮🇳",
    tagline: "Desh Ki Swar-Ganga • Sangeet Sartaj & Vintage Gold",
    format: "HLS Official",
    quality: "Auto HQ",
    color: "#10b981",
    streams: [
      "/hls-proxy?url=https://d3r9rhourdc02u.cloudfront.net/assets/radio/airdelhi04/air004_Auto.m3u8",
      "https://air.pc.cdn.bitgravity.com/air/live/pbaudio001/playlist.m3u8"
    ],
    type: "hls"
  },
  {
    name: "Ishq 104.8 FM Delhi",
    broadcaster: "Ishq FM Delhi",
    freq: "104.8",
    category: "delhi",
    flag: "🇮🇳",
    tagline: "Do Dil Ek Dhadkan • Hindi Romantic Melodies & Bollywood",
    format: "MP3 Icecast",
    quality: "HQ 128 kbps",
    color: "#ec4899",
    streams: [
      "https://drive.uber.radio/uber/bollywoodlove/icecast.audio",
      "https://drive.uber.radio/uber/lrbollywood/icecast.audio",
      "http://us9.streamingpulse.com:7058/stream"
    ],
    type: "audio"
  },

  // --- INTERNATIONAL BROADCASTERS ---
  {
    name: "YES 933 Chinese Radio",
    broadcaster: "Singapore / Greater China",
    freq: "93.3",
    category: "intl",
    flag: "🇨🇳",
    tagline: "顶尖流行音乐台 • Top Mandarin & Chinese Pop Hits",
    format: "AAC Stereo",
    quality: "HQ 128 kbps",
    color: "#ef4444",
    streams: [
      "http://playerservices.streamtheworld.com/api/livestream-redirect/YES933AAC.aac",
      "https://lhttp.qtfm.cn/live/5022308/64k.mp3",
      "https://lhttp.qtfm.cn/live/15318317/64k.mp3"
    ],
    type: "audio"
  },
  {
    name: "WNYC 93.9 FM New York",
    broadcaster: "New York Public Radio (USA)",
    freq: "93.9",
    category: "intl",
    flag: "🇺🇸",
    tagline: "New York City's Premier Radio • Live News & Conversations",
    format: "MP3 Live",
    quality: "HQ 128 kbps",
    color: "#3b82f6",
    streams: [
      "https://fm939.wnyc.org/wnycfm",
      "https://pureplay.cdnstream1.com/6044_128.mp3"
    ],
    type: "audio"
  },
  {
    name: "Capital FM 95.8 London",
    broadcaster: "Global Media UK (Britain)",
    freq: "95.8",
    category: "intl",
    flag: "🇬🇧",
    tagline: "The UK's No. 1 Hit Music Station • London Live",
    format: "MP3 Icecast",
    quality: "HQ 128 kbps",
    color: "#0284c7",
    streams: [
      "http://media-ice.musicradio.com/CapitalMP3",
      "http://stream.live.vc.bbcmedia.co.uk/bbc_world_service"
    ],
    type: "audio"
  },
  {
    name: "FM 100 Pakistan",
    broadcaster: "Islamabad / Lahore / Karachi",
    freq: "100.0",
    category: "intl",
    flag: "🇵🇰",
    tagline: "Pakistan's First & Largest Live FM Network • Urdu Hits",
    format: "MP3 Icecast",
    quality: "HQ 128 kbps",
    color: "#16a34a",
    streams: [
      "http://162.244.80.118:4900/;stream.mp3",
      "https://samaakhi107-itelservices.radioca.st/stream"
    ],
    type: "audio"
  },
  {
    name: "J-Pop Powerplay Tokyo",
    broadcaster: "Tokyo Live (Japan)",
    freq: "105.5",
    category: "intl",
    flag: "🇯🇵",
    tagline: "All Japan Hits • Tokyo Top 40, Anime & Modern J-Pop",
    format: "MP3 Icecast",
    quality: "HQ 128 kbps",
    color: "#e11d48",
    streams: [
      "https://kathy.torontocast.com:3560/stream",
      "http://curiosity.shoutca.st:8019/stream"
    ],
    type: "audio"
  },
  {
    name: "Red FM 106.7 International",
    broadcaster: "RTM Red FM World",
    freq: "106.7",
    category: "intl",
    flag: "🌏",
    tagline: "East Asian, Chinese & Asian Pop Hits • Global Red FM",
    format: "AAC Stereo",
    quality: "HQ 64 kbps",
    color: "#8b5cf6",
    streams: [
      "https://22253.live.streamtheworld.com/RED_FMAAC.aac",
      "https://stream.zeno.fm/f3wvbbqmdg8uv"
    ],
    type: "audio"
  }
];

// App State
let currentStationIndex = 1; // Default to 93.5 Red FM
let currentStreamIndex = 0;
let lastTunedStationIndex = 1;
let clipRepeatTimeout = null;
let currentBackendCarrierFreq = null;
let activeBackendRepeatDelay = 1000;
let isPlaying = false;
let isLoading = false;
let isTunedToStation = true;
let isDraggingNeedle = false;
let hlsInstance = null;
let sessionSeconds = 0;
let sessionInterval = null;

// Web Audio & Synthesizers
let audioContext = null;
let analyser = null;
let audioSourceNode = null;
let visualizerAnimationId = null;

let staticAudioCtx = null;
let staticNoiseSource = null;
let staticGainNode = null;
let staticFilterNode = null;
let isStaticPlaying = false;

// DOM Elements
const audio = document.getElementById("audioElement");
const playBtn = document.getElementById("playBtn");
const playIconSvg = document.getElementById("playIconSvg");
const pauseIconSvg = document.getElementById("pauseIconSvg");
const spinnerSvg = document.getElementById("spinnerSvg");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const volSlider = document.getElementById("volSlider");
const volPercent = document.getElementById("volPercent");
const muteBtn = document.getElementById("muteBtn");
const volIconHigh = document.getElementById("volIconHigh");
const volIconMuted = document.getElementById("volIconMuted");
const retryStreamBtn = document.getElementById("retryStreamBtn");
const altStreamText = document.getElementById("altStreamText");

const freqNumber = document.getElementById("freqNumber");
const stationName = document.getElementById("stationName");
const stationTagline = document.getElementById("stationTagline");
const streamStatus = document.getElementById("streamStatus");
const formatBadge = document.getElementById("formatBadge");
const qualityBadge = document.getElementById("qualityBadge");
const livePill = document.getElementById("livePill");
const liveText = document.getElementById("liveText");
const stereoTag = document.getElementById("stereoTag");
const chipStationText = document.getElementById("chipStationText");
const dialNeedle = document.getElementById("dialNeedle");
const needleTooltip = document.getElementById("needleTooltip");
const dialTrack = document.getElementById("dialTrack");
const sessionTimer = document.getElementById("sessionTimer");
const clockVal = document.getElementById("clockVal");
const canvas = document.getElementById("visualizerCanvas");
const ctx = canvas.getContext("2d");

// Helper: Convert frequency to exact percentage along 88.0 - 108.0 MHz scale
function freqToPercent(freq) {
  return ((freq - 88.0) / 20.0) * 100;
}

function percentToFreq(pct) {
  return 88.0 + (pct / 100.0) * 20.0;
}

// Initialize Application
document.addEventListener("DOMContentLoaded", () => {
  setupClock();
  setupDialScale();
  setupDialDragging();
  setupCategoryFilters();
  setupAudioVisualizer();
  updateStationUI(currentStationIndex);
  bindEvents();
});

// Setup Clock
function setupClock() {
  function tick() {
    const now = new Date();
    const istString = now.toLocaleTimeString("en-US", {
      timeZone: "Asia/Kolkata",
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit"
    });
    clockVal.textContent = istString;
  }
  tick();
  setInterval(tick, 1000);
}

// Setup Ruler Ticks and Station Pins
function setupDialScale() {
  const ticksLayer = document.getElementById("dialTicksLayer");
  const stationsLayer = document.getElementById("dialStationsLayer");
  ticksLayer.innerHTML = "";
  stationsLayer.innerHTML = "";

  // 1. Precise ruler ticks every 0.5 MHz from 88 to 108
  for (let f = 88.0; f <= 108.001; f += 0.5) {
    const pct = freqToPercent(f);
    const isMajor = Math.abs((f % 2.0)) < 0.05 || Math.abs((f % 2.0) - 2.0) < 0.05;
    const isMedium = !isMajor && (Math.abs(f % 1.0) < 0.05 || Math.abs((f % 1.0) - 1.0) < 0.05);

    const tick = document.createElement("div");
    tick.className = `ruler-tick ${isMajor ? "major" : isMedium ? "medium" : "small"}`;
    tick.style.left = `${pct}%`;
    ticksLayer.appendChild(tick);

    if (isMajor) {
      const num = document.createElement("div");
      num.className = "ruler-num";
      num.style.left = `${pct}%`;
      num.textContent = Math.round(f);
      ticksLayer.appendChild(num);
    }
  }

  // 2. Station frequency pins positioned at their exact mathematical percentage
  STATIONS.forEach((s, idx) => {
    const f = parseFloat(s.freq);
    const pct = freqToPercent(f);

    const pin = document.createElement("div");
    pin.className = `station-pin ${idx % 2 === 1 ? "pin-stagger" : ""}`;
    pin.dataset.station = idx;
    pin.dataset.freq = s.freq;
    pin.style.left = `${pct}%`;
    pin.title = `${s.flag} ${s.name} (${s.freq} MHz)`;

    const dot = document.createElement("div");
    dot.className = "pin-dot";
    dot.style.backgroundColor = s.color || "#ffffff";

    const text = document.createElement("div");
    text.className = "pin-text";
    text.textContent = s.freq;

    pin.appendChild(dot);
    pin.appendChild(text);

    pin.addEventListener("click", (e) => {
      e.stopPropagation();
      initWebAudio();
      loadAndPlayStation(idx, 0);
    });

    stationsLayer.appendChild(pin);
  });
}

// Draggable Red Needle & Interactive Tuning
function setupDialDragging() {
  function handlePointer(clientX) {
    const rect = dialTrack.getBoundingClientRect();
    const offsetX = Math.max(0, Math.min(rect.width, clientX - rect.left));
    const pct = (offsetX / rect.width) * 100;
    const freq = percentToFreq(pct);

    // Disable transition while user drags
    dialNeedle.style.transition = "none";
    dialNeedle.style.left = `${pct}%`;
    needleTooltip.textContent = `${freq.toFixed(1)} MHz`;
    freqNumber.textContent = freq.toFixed(1);

    // WHILE DRAGGING OR HOLDING:
    // Audio is always muted, and static noise always plays in transition
    if (audio) {
      audio.volume = 0;
    }
    setStaticNoiseVolume(0.28);
    isTunedToStation = false;
    livePill.classList.remove("active");
    liveText.textContent = "TUNING...";

    // Check if within tolerance of a station to preview carrier
    let matchedStation = null;
    let matchedIdx = -1;
    for (let i = 0; i < STATIONS.length; i++) {
      const s = STATIONS[i];
      const tol = s.tolerance || 0.22;
      if (Math.abs(parseFloat(s.freq) - freq) <= tol) {
        matchedStation = s;
        matchedIdx = i;
        break;
      }
    }

    if (matchedStation) {
      needleTooltip.style.background = matchedStation.color || "#ef233c";
      stationName.textContent = `${matchedStation.flag} ${matchedStation.name}`;
      stationTagline.textContent = "Release pointer to lock frequency & play audio";
      streamStatus.textContent = "CARRIER DETECTED • RELEASE TO LISTEN";
      streamStatus.className = "stream-status playing";
      chipStationText.textContent = `${matchedStation.flag} ${matchedStation.name} (${matchedStation.freq} MHz)`;
      stereoTag.style.opacity = "1";
      updateSignalBars(4);
      updateStationPinsHighlight(matchedIdx);
      highlightStationCard(matchedIdx);
    } else {
      needleTooltip.style.background = "rgba(239, 35, 60, 0.95)";
      stationName.textContent = "📻 FM STATIC NOISE";
      stationTagline.textContent = "Sliding pointer through FM spectrum... release to tune";
      streamStatus.textContent = "SWEEPING SPECTRUM • FM STATIC NOISE";
      streamStatus.className = "stream-status buffering";
      chipStationText.textContent = `${freq.toFixed(1)} MHz (Tuning...)`;
      stereoTag.style.opacity = "0.35";
      updateSignalBars(1);
      updateStationPinsHighlight(-1);
    }
  }

  function onPointerDown(e) {
    isDraggingNeedle = true;
    initWebAudio();
    initStaticNoise();
    if (clipRepeatTimeout) {
      clearTimeout(clipRepeatTimeout);
      clipRepeatTimeout = null;
    }
    // Mute and pause any currently playing station audio, start static noise immediately
    if (audio) {
      audio.volume = 0;
      audio.pause();
    }
    setStaticNoiseVolume(0.28);
    dialTrack.classList.add("dragging");
    dialNeedle.classList.add("dragging");
    handlePointer(e.clientX);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
  }

  function onPointerMove(e) {
    if (!isDraggingNeedle) return;
    handlePointer(e.clientX);
  }

  function onPointerUp(e) {
    if (!isDraggingNeedle) return;
    isDraggingNeedle = false;
    dialTrack.classList.remove("dragging");
    dialNeedle.classList.remove("dragging");
    window.removeEventListener("pointermove", onPointerMove);
    window.removeEventListener("pointerup", onPointerUp);

    const rect = dialTrack.getBoundingClientRect();
    const offsetX = Math.max(0, Math.min(rect.width, e.clientX - rect.left));
    const pct = (offsetX / rect.width) * 100;
    const freq = percentToFreq(pct);

    let nearestIdx = -1;
    let minDiff = 0.35;
    STATIONS.forEach((s, idx) => {
      const tol = s.tolerance || minDiff;
      const diff = Math.abs(parseFloat(s.freq) - freq);
      if (diff <= tol && diff < minDiff) {
        minDiff = diff;
        nearestIdx = idx;
      }
    });

    // STEP 1: If it is a standard radio frequency then simply play that radio
    if (nearestIdx !== -1) {
      currentBackendCarrierFreq = null;
      setStaticNoiseVolume(0);
      loadAndPlayStation(nearestIdx, 0);
      return;
    }

    // STEP 2: If not then send backend call to know whether to continue play noise or play audio sent by backend
    checkBackendCarrier(freq);
  }

  dialTrack.addEventListener("pointerdown", onPointerDown);
}

// Interrogate backend carrier API for secret frequencies (88.0, 96.2, 108.0)
function checkBackendCarrier(freq) {
  if (clipRepeatTimeout) {
    clearTimeout(clipRepeatTimeout);
    clipRepeatTimeout = null;
  }
  dialNeedle.style.transition = "left 0.2s ease-out";
  isTunedToStation = false;
  setStaticNoiseVolume(0.26); // Keep noise humming in transition
  if (audio) {
    audio.pause();
    audio.currentTime = 0;
  }
  lastTunedStationIndex = -1;

  const roundedFreq = parseFloat(freq.toFixed(1));
  stationName.textContent = "📻 SCANNING SPECTRUM...";
  stationTagline.textContent = `Interrogating receiver for carrier signal at ${roundedFreq.toFixed(1)} MHz...`;
  streamStatus.textContent = "CHECKING SPECTRUM CARRIER...";
  streamStatus.className = "stream-status buffering";
  chipStationText.textContent = `${roundedFreq.toFixed(1)} MHz (Querying...)`;
  livePill.classList.remove("active");
  liveText.textContent = "SCANNING";

  // Use the same-origin API locally and on Vercel; no separate port 3001.
  const backendUrl = "/api/tune";

  fetch(backendUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ freq: roundedFreq })
  })
  .then(res => res.json())
  .then(data => {
    // If the user resumed sliding while fetching, ignore stale response
    if (isDraggingNeedle) return;

    if (data && data.match === true && data.audio) {
      // Step 2 (Match): Cut static noise, demodulate and play audio received from backend
      currentBackendCarrierFreq = roundedFreq;
      activeBackendRepeatDelay = data.repeatDelay || 1000;
      isTunedToStation = true;
      setStaticNoiseVolume(0); // Mute static noise completely

      needleTooltip.style.background = "#06b6d4";
      stationName.textContent = `📡 CARRIER LOCKED (${roundedFreq.toFixed(1)} MHz)`;
      const delaySec = Math.round(activeBackendRepeatDelay / 1000);
      stationTagline.textContent = `Encrypted Audio Stream Demodulated • ${delaySec}s Auto-Repeat Loop`;
      streamStatus.textContent = `CARRIER ACTIVE • ${roundedFreq.toFixed(1)} MHz`;
      streamStatus.className = "stream-status playing";
      chipStationText.textContent = `${roundedFreq.toFixed(1)} MHz (Signal Carrier)`;
      livePill.classList.add("active");
      liveText.textContent = "LIVE CARRIER";
      stereoTag.style.opacity = "1";
      updateSignalBars(4);
      updateStationPinsHighlight(-1);
      highlightStationCard(-1);

      audio.src = data.audio;
      audio.currentTime = 0;
      audio.volume = volSlider.value / 100;
      audio.play().then(() => {
        isPlaying = true;
        setLoadingState(false);
        startSessionTimer();
      }).catch(handlePlayError);
    } else {
      // Step 2 (No match): Continue playing noise
      currentBackendCarrierFreq = null;
      isTunedToStation = false;
      setStaticNoiseVolume(0.26);
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }
      stationName.textContent = "📻 FM STATIC NOISE";
      stationTagline.textContent = "No broadcast carrier signal on this frequency • Drag needle to tune";
      streamStatus.textContent = "EMPTY FREQUENCY • NO CARRIER";
      streamStatus.className = "stream-status buffering";
      chipStationText.textContent = `${roundedFreq.toFixed(1)} MHz (Empty Space)`;
      livePill.classList.remove("active");
      liveText.textContent = "STATIC NOISE";
      stereoTag.style.opacity = "0.35";
      updateSignalBars(1);
      updateStationPinsHighlight(-1);
      highlightStationCard(-1);
    }
  })
  .catch(err => {
    console.warn("Backend tune query failed:", err);
    if (!isDraggingNeedle) {
      currentBackendCarrierFreq = null;
      isTunedToStation = false;
      setStaticNoiseVolume(0.26);
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }
      stationName.textContent = "📻 FM STATIC NOISE";
      stationTagline.textContent = "No broadcast carrier signal on this frequency • Drag needle to tune";
      streamStatus.textContent = "EMPTY FREQUENCY • NO CARRIER";
      streamStatus.className = "stream-status buffering";
      chipStationText.textContent = `${roundedFreq.toFixed(1)} MHz (Empty Space)`;
      livePill.classList.remove("active");
      liveText.textContent = "STATIC NOISE";
      stereoTag.style.opacity = "0.35";
      updateSignalBars(1);
      updateStationPinsHighlight(-1);
      highlightStationCard(-1);
    }
  });
}

// Authentic Web Audio Static Noise Synthesizer
function initStaticNoise() {
  if (staticAudioCtx) return;
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    staticAudioCtx = new AudioCtx();

    // 2-second white/pink noise buffer
    const bufferSize = staticAudioCtx.sampleRate * 2;
    const noiseBuffer = staticAudioCtx.createBuffer(1, bufferSize, staticAudioCtx.sampleRate);
    const output = noiseBuffer.getChannelData(0);

    let b0 = 0, b1 = 0, b2 = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      let pink = b0 + b1 + b2 + white * 0.5362;
      if (Math.random() < 0.003) {
        pink += (Math.random() * 2 - 1) * 0.9;
      }
      output[i] = pink * 0.16;
    }

    staticNoiseSource = staticAudioCtx.createBufferSource();
    staticNoiseSource.buffer = noiseBuffer;
    staticNoiseSource.loop = true;

    // Bandpass filter to sound like an authentic transistor FM receiver
    staticFilterNode = staticAudioCtx.createBiquadFilter();
    staticFilterNode.type = "bandpass";
    staticFilterNode.frequency.value = 1900;
    staticFilterNode.Q.value = 0.7;

    staticGainNode = staticAudioCtx.createGain();
    staticGainNode.gain.value = 0; // starts silent

    staticNoiseSource.connect(staticFilterNode);
    staticFilterNode.connect(staticGainNode);
    staticGainNode.connect(staticAudioCtx.destination);

    staticNoiseSource.start(0);
  } catch (err) {
    console.warn("Static noise synthesizer init error:", err);
  }
}

function setStaticNoiseVolume(volume) {
  initStaticNoise();
  if (staticAudioCtx && staticGainNode) {
    if (staticAudioCtx.state === "suspended") {
      staticAudioCtx.resume();
    }
    const userVol = volSlider.value / 100;
    const target = audio.muted ? 0 : volume * userVol;
    staticGainNode.gain.setTargetAtTime(target, staticAudioCtx.currentTime, 0.05);
    isStaticPlaying = target > 0.01;
  }
}

// Session Timer
function startSessionTimer() {
  if (sessionInterval) clearInterval(sessionInterval);
  sessionInterval = setInterval(() => {
    sessionSeconds++;
    const hrs = String(Math.floor(sessionSeconds / 3600)).padStart(2, "0");
    const mins = String(Math.floor((sessionSeconds % 3600) / 60)).padStart(2, "0");
    const secs = String(sessionSeconds % 60).padStart(2, "0");
    sessionTimer.textContent = `${hrs}:${mins}:${secs}`;
  }, 1000);
}

function stopSessionTimer() {
  if (sessionInterval) {
    clearInterval(sessionInterval);
    sessionInterval = null;
  }
}

// Category filter tabs
function setupCategoryFilters() {
  const tabs = document.querySelectorAll(".filter-tab");
  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      tabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");
      const category = tab.dataset.filter;

      document.querySelectorAll(".station-card").forEach(card => {
        if (category === "all" || card.dataset.category === category) {
          card.style.display = "flex";
        } else {
          card.style.display = "none";
        }
      });
    });
  });
}

// Update UI to reflect selected station
function updateStationUI(index) {
  currentStationIndex = index;
  currentStreamIndex = 0;
  const s = STATIONS[index];

  isTunedToStation = true;
  setStaticNoiseVolume(0); // Silence static when station is selected
  audio.volume = volSlider.value / 100;

  stationName.textContent = `${s.flag} ${s.name}`;
  stationTagline.textContent = s.tagline;
  formatBadge.textContent = s.format;
  qualityBadge.textContent = s.quality;
  chipStationText.textContent = `${s.flag} ${s.name} (${s.freq} MHz)`;
  const delaySec = Math.round((s.repeatDelay || 1000) / 1000);
  altStreamText.textContent = s.isClip ? `Audio Clip • ${delaySec}s Repeat Loop` : `Server 1 of ${s.streams.length}`;
  stereoTag.style.opacity = "1";

  // Pixel-perfect needle positioning: exact mathematical percentage
  const f = parseFloat(s.freq);
  const pct = freqToPercent(f);
  dialNeedle.style.transition = "left 0.4s cubic-bezier(0.2, 0.8, 0.2, 1)";
  dialNeedle.style.left = `${pct}%`;
  needleTooltip.textContent = `${s.freq} MHz`;
  freqNumber.textContent = s.freq;

  needleTooltip.style.background = s.color || "#ef233c";

  updateSignalBars(5);
  updateStationPinsHighlight(index);
  highlightStationCard(index);
}

function updateSignalBars(count) {
  const bars = document.querySelectorAll("#signalBars .bar");
  bars.forEach((bar, idx) => {
    if (idx < count) {
      bar.classList.add("active");
    } else {
      bar.classList.remove("active");
    }
  });
}

function updateStationPinsHighlight(activeIdx) {
  document.querySelectorAll(".station-pin").forEach(pin => {
    if (parseInt(pin.dataset.station, 10) === activeIdx) {
      pin.classList.add("active");
    } else {
      pin.classList.remove("active");
    }
  });
}

function highlightStationCard(activeIdx) {
  const cards = document.querySelectorAll(".station-card");
  if (!cards.length) return;
  cards.forEach(card => {
    const cardIdx = parseInt(card.dataset.index, 10);
    const badgeText = card.querySelector(".badge-text");
    if (cardIdx === activeIdx) {
      card.classList.add("active");
      if (badgeText) badgeText.textContent = isPlaying ? "PLAYING LIVE" : "TUNED";
    } else {
      card.classList.remove("active");
      if (badgeText) {
        badgeText.textContent = card.dataset.category === "intl" ? "GLOBAL" : "READY";
      }
    }
  });
}

// Load and play a station
function loadAndPlayStation(stationIdx, streamIdx = 0) {
  currentBackendCarrierFreq = null;
  if (clipRepeatTimeout) {
    clearTimeout(clipRepeatTimeout);
    clipRepeatTimeout = null;
  }

  const stationChanged = (lastTunedStationIndex !== stationIdx);
  lastTunedStationIndex = stationIdx;
  currentStationIndex = stationIdx;
  currentStreamIndex = streamIdx;
  const station = STATIONS[stationIdx];
  const streamUrl = station.streams[streamIdx];

  updateStationUI(stationIdx);
  const delaySec = Math.round((station.repeatDelay || 1000) / 1000);
  altStreamText.textContent = station.isClip ? `Audio Clip • ${delaySec}s Repeat Loop` : `Server ${streamIdx + 1} of ${station.streams.length}`;

  setLoadingState(true, `Connecting to ${station.name}...`);

  // Stop previous HLS if any
  if (hlsInstance) {
    hlsInstance.destroy();
    hlsInstance = null;
  }

  const isHls = streamUrl.includes(".m3u8") || streamUrl.includes("/hls-proxy") || station.type === "hls";

  if (isHls && window.Hls && Hls.isSupported()) {
    hlsInstance = new Hls({
      enableWorker: true,
      lowLatencyMode: true,
      backBufferLength: 30,
      liveSyncDurationCount: 3,
      liveMaxLatencyDurationCount: 5
    });

    hlsInstance.loadSource(streamUrl);
    hlsInstance.attachMedia(audio);

    hlsInstance.on(Hls.Events.MANIFEST_PARSED, () => {
      audio.play().catch(handlePlayError);
    });

    hlsInstance.on(Hls.Events.ERROR, (event, data) => {
      console.warn("HLS Event Error:", data);
      if (data.fatal) {
        switch (data.type) {
          case Hls.ErrorTypes.NETWORK_ERROR:
            tryAlternateStream();
            break;
          case Hls.ErrorTypes.MEDIA_ERROR:
            hlsInstance.recoverMediaError();
            break;
          default:
            tryAlternateStream();
            break;
        }
      }
    });
  } else {
    // If returning to station or station changed or it's a clip, replay from start (0:00)
    if (stationChanged || station.isClip) {
      audio.currentTime = 0;
    }
    audio.src = streamUrl;
    audio.load();
    audio.play().catch(handlePlayError);
  }
}

// Alternate Stream Failover
function tryAlternateStream() {
  const station = STATIONS[currentStationIndex];
  const nextStreamIdx = (currentStreamIndex + 1) % station.streams.length;

  if (nextStreamIdx !== currentStreamIndex) {
    setStatusMessage(`Buffering alternate server (${nextStreamIdx + 1}/${station.streams.length})...`, "buffering");
    loadAndPlayStation(currentStationIndex, nextStreamIdx);
  } else {
    setLoadingState(false);
    setStatusMessage("Stream temporarily offline. Try another station.", "error");
  }
}

function handlePlayError(err) {
  console.warn("Audio Play Error:", err);
  setLoadingState(false);
  setStatusMessage("Click Play to start audio", "ready");
}

function setLoadingState(loading, statusText = "") {
  isLoading = loading;
  if (loading) {
    playIconSvg.style.display = "none";
    pauseIconSvg.style.display = "none";
    spinnerSvg.style.display = "block";
    setStatusMessage(statusText, "buffering");
  } else {
    spinnerSvg.style.display = "none";
    if (isPlaying) {
      playIconSvg.style.display = "none";
      pauseIconSvg.style.display = "block";
      playBtn.classList.add("playing");
    } else {
      playIconSvg.style.display = "block";
      pauseIconSvg.style.display = "none";
      playBtn.classList.remove("playing");
    }
  }
}

function setStatusMessage(msg, type = "normal") {
  streamStatus.textContent = msg;
  streamStatus.className = `stream-status ${type}`;
}

// Toggle Play/Pause
function togglePlayPause() {
  if (isPlaying) {
    if (clipRepeatTimeout) {
      clearTimeout(clipRepeatTimeout);
      clipRepeatTimeout = null;
    }
    audio.pause();
    isPlaying = false;
    if (hlsInstance) {
      hlsInstance.stopLoad();
    }
    setStaticNoiseVolume(0);
    setStatusMessage("PAUSED • Click Play to resume live output", "normal");
    setLoadingState(false);
    livePill.classList.remove("active");
    liveText.textContent = "PAUSED";
    stopSessionTimer();
    highlightStationCard(currentStationIndex);
  } else {
    if (!isTunedToStation) {
      // Resume static noise
      setStaticNoiseVolume(0.26);
      isPlaying = true;
      setLoadingState(false);
      livePill.classList.remove("active");
      liveText.textContent = "STATIC NOISE";
      startSessionTimer();
    } else {
      if (audio.ended) {
        audio.currentTime = 0;
      }
      loadAndPlayStation(currentStationIndex, currentStreamIndex);
    }
  }
}

// Switch Station By Offset (+1 or -1)
function changeStation(offset) {
  let nextIdx = (currentStationIndex + offset + STATIONS.length) % STATIONS.length;
  loadAndPlayStation(nextIdx, 0);
}

// Event Bindings
function bindEvents() {
  playBtn.addEventListener("click", () => {
    initWebAudio();
    initStaticNoise();
    togglePlayPause();
  });

  prevBtn.addEventListener("click", () => {
    initWebAudio();
    changeStation(-1);
  });
  nextBtn.addEventListener("click", () => {
    initWebAudio();
    changeStation(1);
  });

  retryStreamBtn.addEventListener("click", () => {
    tryAlternateStream();
  });

  // Station Cards click
  document.querySelectorAll(".station-card").forEach((card) => {
    card.addEventListener("click", () => {
      initWebAudio();
      const idx = parseInt(card.dataset.index, 10);
      loadAndPlayStation(idx, 0);
    });
  });

  // Volume slider
  volSlider.addEventListener("input", (e) => {
    const val = e.target.value;
    audio.volume = val / 100;
    volPercent.textContent = `${val}%`;
    audio.muted = false;
    updateVolIcon(val);

    if (isStaticPlaying) {
      setStaticNoiseVolume(0.26);
    }
  });

  // Mute button
  muteBtn.addEventListener("click", () => {
    audio.muted = !audio.muted;
    if (audio.muted) {
      volIconHigh.style.display = "none";
      volIconMuted.style.display = "block";
      volPercent.textContent = "0%";
      setStaticNoiseVolume(0);
    } else {
      updateVolIcon(volSlider.value);
      volPercent.textContent = `${volSlider.value}%`;
      if (!isTunedToStation) {
        setStaticNoiseVolume(0.26);
      }
    }
  });

  // HTML5 Audio element native events
  audio.addEventListener("playing", () => {
    isPlaying = true;
    setLoadingState(false);
    const s = STATIONS[currentStationIndex];
    setStatusMessage(`LIVE ON AIR • ${s.broadcaster.toUpperCase()}`, "playing");
    livePill.classList.add("active");
    liveText.textContent = "LIVE ON AIR";
    startSessionTimer();
    highlightStationCard(currentStationIndex);
  });

  audio.addEventListener("ended", () => {
    // If an encrypted backend carrier audio stream ended, auto-repeat with specified delay
    if (currentBackendCarrierFreq !== null) {
      if (clipRepeatTimeout) clearTimeout(clipRepeatTimeout);
      const delayMs = activeBackendRepeatDelay || 1000;
      const delaySec = Math.round(delayMs / 1000);
      setStatusMessage(`AUDIO COMPLETED • REPEATING IN ${delaySec} SEC...`, "buffering");
      liveText.textContent = `WAITING ${delaySec}S`;
      const lockedFreq = currentBackendCarrierFreq;
      clipRepeatTimeout = setTimeout(() => {
        // As long as still tuned to this carrier frequency, replay from 0:00
        if (currentBackendCarrierFreq === lockedFreq && isTunedToStation && !isDraggingNeedle) {
          audio.currentTime = 0;
          audio.play().then(() => {
            isPlaying = true;
            setLoadingState(false);
            liveText.textContent = "LIVE CARRIER";
            livePill.classList.add("active");
          }).catch(handlePlayError);
        }
      }, delayMs);
      return;
    }

    const s = STATIONS[currentStationIndex];
    if (s && s.isClip) {
      if (clipRepeatTimeout) clearTimeout(clipRepeatTimeout);
      const delayMs = s.repeatDelay || 1000;
      const delaySec = Math.round(delayMs / 1000);
      setStatusMessage(`AUDIO COMPLETED • REPEATING IN ${delaySec} SEC...`, "buffering");
      liveText.textContent = `WAITING ${delaySec}S`;
      clipRepeatTimeout = setTimeout(() => {
        // As long as still tuned to this station, replay from 0:00
        if (isTunedToStation && currentStationIndex === lastTunedStationIndex) {
          audio.currentTime = 0;
          audio.play().then(() => {
            isPlaying = true;
            setLoadingState(false);
            liveText.textContent = "LIVE ON AIR";
            livePill.classList.add("active");
          }).catch(handlePlayError);
        }
      }, delayMs);
    }
  });

  audio.addEventListener("waiting", () => {
    if (isTunedToStation) {
      setLoadingState(true, "Buffering live stream...");
    }
  });

  audio.addEventListener("pause", () => {
    // If the audio track reached the end, ignore this native pause event so it repeats automatically
    if (audio.ended && (currentBackendCarrierFreq !== null || STATIONS[currentStationIndex]?.isClip)) {
      return;
    }
    if (isTunedToStation) {
      isPlaying = false;
      setLoadingState(false);
      setStatusMessage("PAUSED • Click Play to resume live output", "normal");
      livePill.classList.remove("active");
      liveText.textContent = "PAUSED";
      stopSessionTimer();
      highlightStationCard(currentStationIndex);
    }
  });

  audio.addEventListener("error", (e) => {
    console.warn("Audio element error:", e);
    if (isTunedToStation) {
      tryAlternateStream();
    }
  });

  // Keyboard navigation
  window.addEventListener("keydown", (e) => {
    if (e.code === "Space" && e.target.tagName !== "INPUT") {
      e.preventDefault();
      initWebAudio();
      initStaticNoise();
      togglePlayPause();
    }
    if (e.code === "ArrowLeft") {
      e.preventDefault();
      initWebAudio();
      changeStation(-1);
    }
    if (e.code === "ArrowRight") {
      e.preventDefault();
      initWebAudio();
      changeStation(1);
    }
    if (e.code === "ArrowUp") {
      e.preventDefault();
      let v = Math.min(100, parseInt(volSlider.value, 10) + 5);
      volSlider.value = v;
      audio.volume = v / 100;
      volPercent.textContent = `${v}%`;
      updateVolIcon(v);
      if (isStaticPlaying) setStaticNoiseVolume(0.26);
    }
    if (e.code === "ArrowDown") {
      e.preventDefault();
      let v = Math.max(0, parseInt(volSlider.value, 10) - 5);
      volSlider.value = v;
      audio.volume = v / 100;
      volPercent.textContent = `${v}%`;
      updateVolIcon(v);
      if (isStaticPlaying) setStaticNoiseVolume(0.26);
    }
    if (e.code === "KeyM") {
      muteBtn.click();
    }
    if (e.key >= "1" && e.key <= "9") {
      const idx = parseInt(e.key, 10) - 1;
      if (idx < STATIONS.length) {
        initWebAudio();
        loadAndPlayStation(idx, 0);
      }
    }
  });
}

function updateVolIcon(val) {
  if (val == 0 || audio.muted) {
    volIconHigh.style.display = "none";
    volIconMuted.style.display = "block";
  } else {
    volIconHigh.style.display = "block";
    volIconMuted.style.display = "none";
  }
}

// Web Audio API & Visualizer Setup
function initWebAudio() {
  if (audioContext) return;
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    audioContext = new AudioContext();
    analyser = audioContext.createAnalyser();
    analyser.fftSize = 64;

    audio.crossOrigin = "anonymous";
    audioSourceNode = audioContext.createMediaElementSource(audio);
    audioSourceNode.connect(analyser);
    analyser.connect(audioContext.destination);
  } catch (err) {
    console.info("Using procedural visualizer.");
  }
}

// Canvas Visualizer Render Loop
function setupAudioVisualizer() {
  function resizeCanvas() {
    canvas.width = canvas.parentElement.clientWidth * window.devicePixelRatio;
    canvas.height = canvas.parentElement.clientHeight * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
  }
  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);

  const numBars = 48;
  const barWidth = 6;
  const simulatedLevels = new Array(numBars).fill(10);

  function draw() {
    visualizerAnimationId = requestAnimationFrame(draw);

    const width = canvas.parentElement.clientWidth;
    const height = canvas.parentElement.clientHeight;

    ctx.clearRect(0, 0, width, height);

    let dataArray = null;
    if (analyser && isPlaying && isTunedToStation) {
      try {
        const bufferLength = analyser.frequencyBinCount;
        dataArray = new Uint8Array(bufferLength);
        analyser.getByteFrequencyData(dataArray);
      } catch (e) {
        dataArray = null;
      }
    }

    const currentStation = STATIONS[currentStationIndex];
    const baseColor = isStaticPlaying ? "#06b6d4" : (currentStation ? currentStation.color : "#ef233c");

    const totalBarsWidth = numBars * (barWidth + 4);
    const startX = Math.max(8, (width - totalBarsWidth) / 2);

    for (let i = 0; i < numBars; i++) {
      let barHeight = 4;

      if (isStaticPlaying) {
        // Chaotic dynamic FM static noise spikes
        const fuzz = Math.sin(Date.now() * 0.04 + i * 2.1) * 8 +
                     Math.cos(Date.now() * 0.07 + i * 1.3) * 6 +
                     (Math.random() * (height * 0.55));
        barHeight = Math.max(3, Math.min(height - 4, fuzz));
      } else if (isPlaying && isTunedToStation) {
        if (dataArray && dataArray.length > 0) {
          const val = dataArray[i % dataArray.length];
          barHeight = (val / 255) * (height - 12) + 4;
        } else {
          const target = Math.sin(Date.now() * 0.006 + i * 0.4) * 16 +
                         Math.cos(Date.now() * 0.009 + i * 0.2) * 12 +
                         (height * 0.35);
          simulatedLevels[i] += (target - simulatedLevels[i]) * 0.25;
          barHeight = Math.max(4, Math.min(height - 8, simulatedLevels[i]));
        }
      } else {
        simulatedLevels[i] += (4 - simulatedLevels[i]) * 0.1;
        barHeight = simulatedLevels[i];
      }

      const x = startX + i * (barWidth + 4);
      const y = height - barHeight;

      const grad = ctx.createLinearGradient(0, height, 0, 0);
      grad.addColorStop(0, "rgba(255, 255, 255, 0.1)");
      grad.addColorStop(0.6, baseColor);
      grad.addColorStop(1, "#ffffff");

      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.roundRect(x, y, barWidth, barHeight, [2, 2, 0, 0]);
      ctx.fill();
    }
  }

  draw();
}

})();

