import type { PlayerId, PlayerProfile } from "../types/game";

type Props = {
  playerId: PlayerId;
  profiles: PlayerProfile[];
  currentProfileId: string;
  onSelectProfile: (playerId: PlayerId, profile: PlayerProfile) => void;
  onCreateProfile: (playerId: PlayerId, name: string) => void;
  onClose: () => void;
};

export function PlayerProfileDialog({
  playerId,
  profiles,
  currentProfileId,
  onSelectProfile,
  onCreateProfile,
  onClose,
}: Props) {
  function handleCreate() {
    const name = window.prompt("Name des Spielers?");

    if (!name?.trim()) {
      return;
    }

    onCreateProfile(playerId, name.trim());
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

        <button className="closeButton" onClick={handleCreate}>
          Neuer Spieler
        </button>

        <button className="secondaryButton" onClick={onClose}>
          Schließen
        </button>
      </div>
    </div>
  );
}