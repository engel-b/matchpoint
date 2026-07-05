# Entwicklungsumgebung

Diese Seite beschreibt, wie MatchPoint lokal eingerichtet und entwickelt werden kann.

## Voraussetzungen

Für die Entwicklung werden benötigt:

- Node.js 24 oder neuer
- npm
- Git
- ein moderner Editor, empfohlen wird Visual Studio Code

## Projekt klonen

```bash
git clone https://github.com/engel-b/matchpoint.git
cd matchpoint
```

## Abhängigkeiten installieren

```bash
npm install
```

## Entwicklungsserver starten

```bash
npm run dev
```

Die Anwendung ist anschließend lokal erreichbar unter:

```text
http://localhost:5173
```

## Produktions-Build erstellen

```bash
npm run build
```

Der fertige Build wird im Ordner `dist/` erzeugt.

## Build lokal prüfen

```bash
npm run preview
```

Damit wird der Produktions-Build lokal gestartet.

## Icons erzeugen

Die PWA-Icons werden aus `assets/logo.svg` generiert:

```bash
npm run icons
```

Beim normalen Build geschieht das automatisch über das `prebuild`-Script.

## Code formatieren

```bash
npm run format
```

## Formatierung prüfen

```bash
npm run format:check
```

## Linting

```bash
npm run lint
```

## Empfohlene VS-Code-Erweiterungen

- Prettier
- ESLint

Das Projekt enthält eine `.vscode/settings.json`, sodass Formatierung und einfache ESLint-Fixes automatisch beim Speichern ausgeführt werden können.

## Git Hooks

MatchPoint verwendet Husky und lint-staged.

Beim Commit werden geänderte Dateien automatisch formatiert und geprüft.

## Wichtige npm-Scripts

| Script                 | Beschreibung                                   |
| ---------------------- | ---------------------------------------------- |
| `npm run dev`          | startet den lokalen Entwicklungsserver         |
| `npm run build`        | erstellt den Produktions-Build                 |
| `npm run preview`      | startet eine lokale Vorschau des Builds        |
| `npm run icons`        | erzeugt die PWA-Icons                          |
| `npm run lint`         | führt ESLint aus                               |
| `npm run format`       | formatiert das Projekt mit Prettier            |
| `npm run format:check` | prüft die Formatierung                         |
| `npm run docs:dev`     | startet die VitePress-Dokumentation lokal      |
| `npm run docs:build`   | baut die Dokumentation                         |
| `npm run docs:preview` | startet eine lokale Vorschau der Dokumentation |
