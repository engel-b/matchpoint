# MatchPoint 🏓

MatchPoint ist ein webbasiertes Tischtennis-Scoreboard als Progressive Web App (PWA).

Die Anwendung wurde speziell für den Einsatz auf einem Tablet am Tisch entwickelt und kann komplett offline betrieben werden. Neben der Bedienung über den Touchscreen werden externe Bluetooth-HID-Buttons unterstützt, sodass Punkte komfortabel während des Spiels gezählt werden können.

---

# Features

- 🏓 Punkt- und Satzzählung nach offiziellen Tischtennisregeln
- 👥 Spielerprofile
- 📊 Spielhistorie
- ↩️ Undo-Funktion
- 🌙 Hell- und Dunkelmodus
- 🌍 Mehrsprachigkeit (aktuell Deutsch / Englisch)
- 📱 Progressive Web App (offlinefähig)
- 🔄 Automatische Updates
- 🎮 Unterstützung externer Bluetooth-HID-Buttons
- 💾 Lokale Speicherung aller Daten mittels IndexedDB (Dexie)

---

# Motivation

Ziel dieses Projektes ist eine moderne, vollständig offlinefähige Anwendung, die sich insbesondere für Tablets eignet und sich mit externen Bluetooth-Tastern bedienen lässt.

Der Fokus liegt auf:

- einfacher Bedienung
- großer, gut lesbarer Anzeige
- schneller Punkteingabe
- keinerlei Cloud-Zwang
- Open Source

---

# Projektstruktur

```
src/
    components/
    dialogs/
    hooks/
    i18n/
    storage/
    types/

assets/
public/
scripts/

.github/workflows/
```

---

# Voraussetzungen

- Node.js 22 oder neuer
- npm

---

# Installation

```bash
npm install
```

---

# Entwicklungsmodus

```bash
npm run dev
```

Die Anwendung startet anschließend unter

```
http://localhost:5173
```

---

# Build

Vor jedem Build werden automatisch alle Icons erzeugt.

```bash
npm run build
```

Das Build befindet sich anschließend unter

```
dist/
```

---

# Icons generieren

Die PWA-Icons werden automatisch aus

```
assets/logo.svg
```

erzeugt.

Manuell:

```bash
npm run icons
```

Erzeugt werden unter anderem:

- icon-192.png
- icon-512.png
- maskable-icon-512.png
- apple-touch-icon.png

---

# Deployment

Das Deployment erfolgt vollständig automatisch über GitHub Actions.

Workflow:

```
Push auf main
        │
        ▼
Formatprüfung
        │
        ▼
ESLint
        │
        ▼
Icons erzeugen
        │
        ▼
Build
        │
        ▼
Deployment nach Amazon S3
        │
        ▼
CloudFront Cache Invalidierung
```

Für Releases genügt ein Git-Tag:

```bash
git tag v1.0.0
git push origin v1.0.0
```

Dadurch wird zusätzlich ein GitHub Release inklusive ZIP-Archiv erzeugt.

---

# Tastensteuerung

MatchPoint unterstützt die Tastatursteuerung durch freidefinierbare Tasten. Damit lassen sich auch Bluetooth-HID-Controller verwenden, sofern sie gültige Standard-Tastatus-Keys senden.

Standardmäßig funktionieren beispielsweise:

| Funktion  | Standard                |
| --------- | ----------------------- |
| Spieler 1 | Volume Down / Page Down |
| Spieler 2 | Volume Up / Page Up     |

Die tatsächlichen Tastencodes hängen von der verwendeten Tastatur/Controller ab.

---

## Tasten anlernen

Unter

```
Einstellungen
→ Remote-Tasten
```

kann jede Funktion individuell angelernt werden.

Ablauf:

1. "Lernen" auswählen
2. Gewünschte Taste drücken
3. Belegung wird dauerhaft gespeichert

Die Einstellungen werden lokal in IndexedDB gespeichert.

---

# Datenhaltung

Alle Daten verbleiben ausschließlich auf dem aufrufenden Gerät. Es werden keinerlei personenbezogene Daten an einen Server übertragen.

Gespeichert werden unter anderem:

- Theme
- Sprache
- Spielerprofile
- Spielhistorie
- Spieleinstellungen
- Tastenbelegung

---

# Codequalität

Das Projekt verwendet

- TypeScript
- ESLint
- Prettier
- Husky
- lint-staged

Vor jedem Commit werden geänderte Dateien automatisch formatiert und geprüft.

Manuell:

```bash
npm run format
npm run lint
```

---

# Technologie

- React
- TypeScript
- Vite
- Dexie
- IndexedDB
- react-i18next
- vite-plugin-pwa

---

# Contribution

Pull Requests sind herzlichst willkommen.

Vor dem Erstellen eines Pull Requests bitte sicherstellen, dass

```bash
npm run format
npm run lint
npm run build
```

ohne Fehler durchlaufen.

Bitte möglichst kleine, thematisch abgeschlossene Änderungen einreichen.

---

# Roadmap

Geplante Features:

- Statistiken
- Matchexport
- Import / Backup
- Turniermodus
- Doppelmodus
- Tablet-Layout-Optimierung
- Smartphone-Layout-Optimierung

---

# Lizenz

MIT License
