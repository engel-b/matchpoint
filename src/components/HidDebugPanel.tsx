import { useEffect, useState } from "react";

export function HidDebugPanel() {
  const [lastEvent, setLastEvent] = useState<string>("Noch kein Tastendruck");

  useEffect(() => {
    function logKeyboardEvent(event: KeyboardEvent) {
      const text = `${event.type}: key="${event.key}" code="${event.code}" keyCode=${event.keyCode}`;
      console.log(text);
      setLastEvent(text);
    }

    window.addEventListener("keydown", logKeyboardEvent, true);
    window.addEventListener("keyup", logKeyboardEvent, true);
    window.addEventListener("keypress", logKeyboardEvent, true);

    return () => {
      window.removeEventListener("keydown", logKeyboardEvent, true);
      window.removeEventListener("keyup", logKeyboardEvent, true);
      window.removeEventListener("keypress", logKeyboardEvent, true);
    };
  }, []);

  return <div className="hidDebugPanel">{lastEvent}</div>;
}
