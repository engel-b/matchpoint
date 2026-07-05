# Eingabegeräte

Neben der Bedienung per Touchscreen unterstützt MatchPoint auch externe Eingabegeräte.

Alle Geräte, die Standard-Tastatureingaben senden, können zur Steuerung verwendet werden. Dadurch lassen sich Punkte bequem zählen, ohne das Display berühren zu müssen.

## Unterstützte Geräte

Unter anderem können folgende Geräte verwendet werden:

- ⌨️ USB-Tastaturen
- ⌨️ Bluetooth-Tastaturen
- 🎮 HID-Fernbedienungen
- 📖 Bluetooth-Page-Turner
- 🎛️ Programmierbare Keypads
- 🎤 Presenter mit Tastaturmodus

Entscheidend ist nicht die Art des Geräts, sondern dass es Standard-Tastaturevents an den Browser sendet.

---

## Tasten anlernen

Die Tastenbelegung kann individuell angepasst werden.

1. Öffne die **Einstellungen**.
2. Wechsle zum Bereich **Tastensteuerung**.
3. Wähle die gewünschte Aktion.
4. Tippe auf **Anlernen**.
5. Drücke die gewünschte Taste auf dem Eingabegerät.

Die Belegung wird automatisch gespeichert und steht beim nächsten Start wieder zur Verfügung.

---

## Verfügbare Aktionen

Derzeit können unter anderem folgende Aktionen belegt werden:

- Punkt für Spieler 1
- Punkt für Spieler 2
- Letzten Punkt zurücknehmen

Weitere Aktionen werden in zukünftigen Versionen ergänzt.

---

## Warum externe Eingabegeräte?

Während eines Spiels ist das Tablet häufig einige Meter vom Schiedsrichter oder Spieler entfernt.

Durch externe Eingabegeräte kann der Spielstand aktualisiert werden,

- ohne das Display zu berühren,
- mit Handschuhen,
- oder aus größerer Entfernung.

Dadurch eignet sich MatchPoint auch für Training, Vereinsabende und kleine Turniere.

---

## Hinweise

Je nach Gerät und Betriebssystem können unterschiedliche Tastencodes gesendet werden.

Die Lernfunktion erkennt automatisch die tatsächlich empfangene Taste. Dadurch ist MatchPoint mit einer Vielzahl unterschiedlicher Eingabegeräte kompatibel.

---

## Lautstärketasten

Einige HID-Fernbedienungen senden **Volume Up** oder **Volume Down** anstelle normaler Tastaturtasten.

Diese Tasten können grundsätzlich verwendet werden.

Je nach Betriebssystem kann dabei jedoch zusätzlich die Systemlautstärke verändert werden.

Falls dein Gerät mehrere Betriebsmodi unterstützt (z. B. Tastaturmodus oder Page-Turner-Modus), empfiehlt sich die Verwendung eines Modus, der normale Tastaturtasten wie **Page Up** oder **Page Down** sendet.

---

## Datenschutz

Die Tastenzuordnungen werden ausschließlich lokal auf deinem Gerät gespeichert.

Es werden keine Daten übertragen oder ausgewertet.

---

## Erprobte Eingabegeräte

Die folgenden Geräte wurden mit MatchPoint getestet. Da MatchPoint auf Standard-Tastatureingaben setzt, können grundsätzlich auch viele andere Geräte verwendet werden.

### Bluetooth Control für TikTok

Dieses Bluetooth-HID-Gerät verfügt über zwei Tasten und unterstützt drei Betriebsmodi:

- Audio lauter / leiser
- Seite hoch / runter
- Seite vor / zurück

**Erfahrungen**

✅ Sehr hochwertige Verarbeitung

✅ Einfache Bluetooth-Kopplung mit Tablet oder Notebook

⚠️ Der **Audio-Modus** funktioniert mit MatchPoint, da dabei Standard-Tastaturevents (`AudioVolumeUp` und `AudioVolumeDown`) gesendet werden. Allerdings verändert das Gerät gleichzeitig die Systemlautstärke.

⚠️ Die beiden Seitenwechsel-Modi senden auf den getesteten Geräten keine Standard-Tastaturevents und können deshalb von MatchPoint derzeit nicht verwendet werden.

### PCsensor 3-Tasten-Makro-Keyboard

Das PCsensor-Makro-Keyboard verfügt über drei mechanische Tasten und kann – abhängig von der Variante – mehrere Tastenbelegungen speichern.

Erhältlich ist das Gerät als

- USB-Version
- Bluetooth-Version
- 2,4-GHz-Version

In der Werkseinstellung senden die drei Tasten die Zeichen **A**, **B** und **C**. Über die Herstellersoftware können die Belegungen individuell angepasst werden.

**Erfahrungen**

✅ MatchPoint erkennt die gesendeten Tastaturevents problemlos.

✅ Durch frei belegbare Tasten eignet sich das Gerät hervorragend zur Bedienung der App.

⚠️ Die Bluetooth-Kopplung ist etwas umständlich, da die mitgelieferte Dokumentation nur die wichtigsten Schritte beschreibt.

💡 Die Verarbeitung ist insgesamt gut. Lediglich die Unterkante könnte sauberer entgratet sein – ein kurzer Einsatz mit feinem Schleifpapier sorgt hier für einen angenehmeren Eindruck.

### Weitere getestete Geräte

Du hast MatchPoint erfolgreich mit einem anderen Eingabegerät getestet?

Dann freuen wir uns über einen Pull Request oder ein Issue mit deinen Erfahrungen. So entsteht nach und nach eine möglichst umfassende Kompatibilitätsliste.
