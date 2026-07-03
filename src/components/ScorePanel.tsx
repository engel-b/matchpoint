import type { PlayerState } from "../types/game";

type Props = {
  player: PlayerState;
  setsToWin: number;
  hasService: boolean;
  color: "red" | "blue";
  onPoint: () => void;
  onPlayerNameClick: () => void;
};

export function ScorePanel({
  player,
  setsToWin,
  hasService,
  color,
  onPoint,
  onPlayerNameClick,
}: Props) {
  return (
    <button className={`scorePanel scorePanel--${color}`} onClick={onPoint}>
      <button
        className="playerName"
        onClick={(event) => {
          event.stopPropagation();
          onPlayerNameClick();
        }}
      >
        {player.name}
      </button>

      <div className={`scoreValue ${hasService ? "scoreValue--service" : ""}`}>{player.score}</div>

      <div className="setDots" aria-label={`${player.sets} gewonnene Sätze`}>
        {Array.from({ length: setsToWin }).map((_, index) => (
          <span key={index} className={`setDot ${index < player.sets ? "setDot--active" : ""}`} />
        ))}
      </div>
    </button>
  );
}
