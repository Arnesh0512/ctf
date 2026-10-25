# 📻 Dilli FM Live - Delhi Capital & Global Radio Player

A live online FM radio player web application featuring popular broadcasters from **Delhi NCR** plus top **International Channels** (Chinese, Japanese, Pakistani, British, American, and World).

## ✨ Stations Lineup (13 Channels)

### 🇮🇳 Delhi NCR Broadcasters
1. **92.7 MHz** — **92.7 Big FM Delhi** ("Dhun Badal Ke Toh Dekho" • Bollywood Retro & 90s Hits)
2. **93.5 MHz** — **Superhits 93.5 Red FM Delhi** ("Bajaate Raho!" • Bollywood Superhits)
3. **98.3 MHz** — **Radio Mirchi 98.3 FM Delhi** ("Mirchi Sunnewaale Always Khush!")
4. **100.1 MHz** — **AIR FM Gold Delhi** (Akashvani Delhi National • Classics & News)
5. **102.6 MHz** — **AIR FM Rainbow Delhi** (Akashvani Delhi • Youth Hits & RJ Shows)
6. **102.8 MHz** — **Vividh Bharati 102.8 FM** (All India Radio Golden Nostalgia)
7. **104.8 MHz** — **Ishq 104.8 FM Delhi** ("Do Dil Ek Dhadkan" • Romantic Melodies)

### 🌍 International Channels
8. **93.3 MHz** — 🇨🇳 **YES 933 Chinese Radio** (Top Mandarin & Chinese Hits / 华语经典)
9. **93.9 MHz** — 🇺🇸 **WNYC 93.9 FM New York (American)** (Live NYC News & Culture)
10. **95.8 MHz** — 🇬🇧 **Capital FM 95.8 London (Britain)** (The UK's No. 1 Hit Music Station)
11. **100.0 MHz** — 🇵🇰 **FM 100 Pakistan (Pakistani)** (Urdu Hits • Islamabad / Lahore)
12. **105.5 MHz** — 🇯🇵 **J-Pop Powerplay Tokyo (Japanese)** (Tokyo J-Pop & Anime Hits)
13. **106.7 MHz** — 🌏 **Red FM 106.7 World (International)** (East Asian & Chinese Pop - RTM Global)

---

## ⚡ Features
- **In-Website Streaming**: Instant playback with zero browser extensions.
- **Support for Both Audio Formats**:
  - Direct Icecast/Shoutcast MP3 & AAC.
  - Apple HTTP Live Streaming (HLS `.m3u8`) with transparent local proxy.
- **Interactive Tuner & Visualizer**:
  - Real-time animated audio wave / spectrum canvas visualizer.
  - Interactive analog frequency dial needle responding to all 13 stations.
  - Category filter tabs (Delhi NCR vs International vs All).
  - Signal strength meter, stereo indicator, and live IST (Delhi) clock.
- **Keyboard Shortcuts**:
  - `Space`: Play / Pause
  - `←` / `→`: Previous / Next Station
  - `↑` / `↓`: Volume Up / Down
  - `M`: Mute / Unmute
  - `1` – `9`: Direct Station Jump

---

## 🚀 How to Run

### Python Server (Default: Port 8080)
```powershell
python server.py
# Or specify custom port:
python server.py 3000
```

### Node.js Server
```powershell
node server.js
```

Open your browser to [http://localhost:8080](http://localhost:8080).
