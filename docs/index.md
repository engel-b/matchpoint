---
layout: home
title: MatchPoint
---

# MatchPoint 🏓

**A modern table tennis scoreboard as a Progressive Web App.**

MatchPoint is an offline-first table tennis scoreboard designed for tablets, smartphones and Bluetooth HID remotes.

[Open App](https://DEINE-APP-URL/) · [View on GitHub](https://github.com/engel-b/matchpoint-pwa)

---

## Features

- Offline-first Progressive Web App
- Large, readable scoreboard
- Player profiles
- Match history
- Bluetooth HID remote support
- Dark and light theme
- German and English language support
- Local-only data storage with IndexedDB

---

## Why MatchPoint?

MatchPoint was created because many digital scoreboards are either too simple, require an internet connection, or are inconvenient to use during a match.

The goal is a focused, local-first scoreboard that works well on a tablet next to the table and can be controlled with simple Bluetooth buttons.

---

## Bluetooth Remote Support

MatchPoint supports Bluetooth HID devices.

Buttons can be configured directly inside the app:

1. Open settings
2. Select “Remote buttons”
3. Press “Learn”
4. Press the desired remote button

No account, cloud service or companion app is required.

---

## Installation

Open the app URL in your browser and select:

**Add to Home Screen**

The app can then be used like a native application.

---

## Development

```bash
npm install
npm run dev
```

### Build:

```bash
npm run build
```

### Generate icons:

```bash
npm run icons
```

## Deployment

The app is deployed automatically using GitHub Actions to AWS S3 and CloudFront.

## Roadmap

- Statistics
- Export / import
- Tournament mode
- Doubles mode
- Improved remote support
- Better small-screen layouts

## License

MIT
