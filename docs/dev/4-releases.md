# Releases

MatchPoint verwendet Semantic Versioning (SemVer) für die Versionierung.

Versionen werden als Git-Tags veröffentlicht und automatisch über GitHub Actions bereitgestellt.

---

## Versionierung

MatchPoint verwendet das Schema:

```text
MAJOR.MINOR.PATCH
```

Beispiele:

| Version | Bedeutung                          |
| ------- | ---------------------------------- |
| 1.0.0   | Erstes stabiles Release            |
| 1.1.0   | Neue Funktionen, abwärtskompatibel |
| 1.1.1   | Fehlerbehebungen                   |
| 2.0.0   | Inkompatible Änderungen            |

---

## Release erstellen

Vor einem Release sollten alle Änderungen in den `main`-Branch übernommen werden.

Anschließend wird ein neuer Git-Tag erstellt:

```bash
git tag -a v1.0.0 -m "Release v1.0.0"
git push origin v1.0.0
```

Der Tag dient als unveränderlicher Stand des Quellcodes.

---

## Release Notes

Jedes Release sollte eine kurze Zusammenfassung der Änderungen enthalten.

Empfohlen wird folgende Struktur:

### Neue Funktionen

- Unterstützung zusätzlicher Eingabegeräte
- Spielhistorie erweitert

### Verbesserungen

- Optimierte Tablet-Darstellung
- Schnellere Ladezeiten

### Fehlerbehebungen

- Anzeige des Aufschlags korrigiert
- Korrektur der Historie

---

## GitHub Releases

Zu jedem Git-Tag kann ein GitHub Release erstellt werden.

Das Release enthält:

- Versionsnummer
- Release Notes
- Verweis auf den Git-Tag

Optional können zusätzlich Build-Artefakte veröffentlicht werden.

---

## Deployment

Nach dem Push eines neuen Tags wird automatisch der Deployment-Workflow ausgeführt.

Dabei werden:

1. die Anwendung gebaut,
2. die PWA-Icons generiert,
3. der Build nach Amazon S3 hochgeladen,
4. der CloudFront-Cache invalidiert.

Die Dokumentation wird unabhängig davon über GitHub Pages veröffentlicht.

---

## Version in der Anwendung

Die aktuelle Versionsnummer und der Commit werden automatisch während des Builds eingebunden.

Sie können im Einstellungsdialog eingesehen werden.

Beispiel:

```text
Version: v1.2.0
Commit: a1b2c3d
```

---

## Entwicklungsstände

Während der Entwicklung wird üblicherweise direkt auf dem `main`-Branch gearbeitet.

Jeder Push auf `main` erzeugt automatisch eine neue Deployment-Version.

Stabile Stände werden zusätzlich als Git-Tag markiert.

---

## Rückwärtskompatibilität

Neue Funktionen sollten bestehende Spielstände und gespeicherte Einstellungen möglichst nicht beeinträchtigen.

Falls Änderungen an der Datenstruktur notwendig sind, sollten geeignete Migrationsmechanismen vorgesehen werden.

---

## Checkliste vor einem Release

Vor der Veröffentlichung sollte geprüft werden:

- [ ] Alle Tests erfolgreich
- [ ] `npm run format:check`
- [ ] `npm run lint`
- [ ] `npm run build`
- [ ] `npm run docs:build`
- [ ] Dokumentation aktualisiert
- [ ] Changelog erstellt
- [ ] Versionsnummer überprüft
- [ ] Git-Tag erstellt
