# 📻 High Altitude Radio - Chushul Signal Tuner

A high-altitude live online FM radio receiver web application inspired by the Chushul sector of eastern Ladakh (~16,000 ft), featuring Indian national/regional broadcasters alongside international relays.

## ✨ Stations Lineup (13 Channels in Sequential Dial Order)

1. **88.9 MHz** — 🇺🇸 **WNYC 88.9 FM New York** (American Live News & Conversations)
2. **90.7 MHz** — 🇨🇳 **YES 90.7 Chinese Radio** (Trans-Himalayan Mandarin Relay / 华语经典)
3. **92.7 MHz** — 🇮🇳 **92.7 Big FM India** ("Dhun Badal Ke Toh Dekho" • Bollywood Retro & 90s Hits)
4. **93.5 MHz** — 🇮🇳 **Superhits 93.5 Red FM** ("Bajaate Raho!" • High-Altitude Bollywood Stream)
5. **95.8 MHz** — 🇬🇧 **Capital FM 95.8 London** (The UK's No. 1 Hit Music Station)
6. **97.0 MHz** — 🇮🇳 **Vividh Bharati 97.0 FM** (All India Radio National Golden Nostalgia)
7. **98.3 MHz** — 🇮🇳 **Radio Mirchi 98.3 FM** ("Mirchi Sunnewaale Always Khush!")
8. **100.1 MHz** — 🇮🇳 **Akashvani Leh 100.1 FM** (All India Radio Ladakh • Regional Classics & High-Altitude Broadcasts)
9. **100.8 MHz** — 🇵🇰 **FM 100.8 Pakistan** (Trans-Border Urdu Hits • Islamabad / Lahore)
10. **102.6 MHz** — 🇮🇳 **AIR Ladakh Rainbow 102.6** (All India Radio Ladakh • Youth Hits & RJ Shows)
11. **104.8 MHz** — 🇮🇳 **Ishq 104.8 FM India** ("Do Dil Ek Dhadkan" • Romantic Melodies)
12. **105.5 MHz** — 🇯🇵 **J-Pop Powerplay Tokyo** (Tokyo J-Pop & Modern Top 40)
13. **106.7 MHz** — 🌏 **Red FM 106.7 International** (East Asian & Global Pop Hits)

---

## ⚡ Features
- **In-Website Streaming**: Instant playback with zero browser extensions.
- **Audio Formats**:
  - Direct Icecast/Shoutcast MP3 & AAC.
  - Apple HTTP Live Streaming (HLS `.m3u8`) with transparent proxy.
- **Interactive High-Altitude Tuner & Visualizer**:
  - Real-time animated audio wave / spectrum canvas visualizer.
  - Interactive analog frequency dial needle with discrete single-value snapping.
  - Live Indian vs International region indicators.
  - Signal strength meter, stereo indicator, and live IST (Ladakh) clock.
- **Keyboard Shortcuts**:
  - `Space`: Play / Pause
  - `←` / `→`: Previous / Next Station (sequential frequency order along dial)
  - `↑` / `↓`: Volume Up / Down
  - `M`: Mute / Unmute
  - `1` – `9`: Direct Station Jump

---

## 🚀 How to Run

### Local Server (frontend and API on the same port)
```powershell
npm start
# Or run directly:
node local-server.js
# Or with Python:
python server.py
```

Open your browser to [http://localhost:8080](http://localhost:8080).
The radio API is available at `/api/tune` on that same origin; no separate port 3001 is needed.
