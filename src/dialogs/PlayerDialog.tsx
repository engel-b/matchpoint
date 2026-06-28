import { useState } from "react";
import type { PlayerId, PlayerProfile } from "../types/game";

type Props = {
  playerId: PlayerId;
  profiles: PlayerProfile[];
  currentProfileId: string;
  onSelectProfile: (playerId: PlayerId, profile: PlayerProfile) => void;
  onCreateProfile: (playerId: PlayerId, name: string) => void;
  onClose: () => void;
};

export function PlayerDialog({
  playerId,
  profiles,
  currentProfileId,
  onSelectProfile,
  onCreateProfile,
  onClose,
}: Props) {
  const [newPlayerName, setNewPlayerName] = useState("");

  function handleCreateProfile() {
    const name = newPlayerName.trim();

    if (!name) {
      return;
    }

    onCreateProfile(playerId, name);
    setNewPlayerName("");
  }

  return (
    <div className="dialogBackdrop" onClick={onClose}>
      <div className="dialog" onClick={(event) => event.stopPropagation()}>
        <h2>Spieler auswählen</h2>

        <div className="profileList">
          {profiles.map((profile) => (
            <button
              key={profile.id}
              className={`profileButton ${
                profile.id === currentProfileId ? "profileButton--active" : ""
              }`}
              onClick={() => onSelectProfile(playerId, profile)}
            >
              {profile.name}
            </button>
          ))}
        </div>

        <div className="newPlayerBox">
          <label htmlFor="new-player-name">Neuer Spieler</label>

          <input
            id="new-player-name"
            value={newPlayerName}
            onChange={(event) => setNewPlayerName(event.target.value)}
            placeholder="Name eingeben"
            autoFocus
          />

          <button className="closeButton" onClick={handleCreateProfile}>
            Hinzufügen
          </button>
        </div>

        <button className="secondaryButton" onClick={onClose}>
          Schließen
        </button>
      </div>
    </div>
  );
}