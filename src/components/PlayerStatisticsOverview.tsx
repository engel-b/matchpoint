import { useTranslation } from "react-i18next";

import { formatDifference } from "../statistics/helpers";

import type { PlayerStatistics } from "../statistics/types";

type Props = {
  players: PlayerStatistics[];
  onPlayerClick?: (playerId: string) => void;
};

export function PlayerStatisticsOverview({ players, onPlayerClick }: Props) {
  const { t, i18n } = useTranslation();

  const percentFormatter = new Intl.NumberFormat(i18n.language, {
    style: "percent",
    maximumFractionDigits: 0,
  });

  return (
    <section className="statisticsOverview" aria-label={t("statistics.title")}>
      {players.map((player) => (
        <article
          className="statisticsCard"
          key={player.playerId}
          onClick={() => onPlayerClick?.(player.playerId)}
        >
          <strong>{player.playerName}</strong>

          <div className="statisticsGrid">
            <span>{t("statistics.matches")}</span>
            <strong>{player.matches}</strong>

            <span>{t("statistics.wins")}</span>
            <strong>{player.wins}</strong>

            <span>{t("statistics.losses")}</span>
            <strong>{player.losses}</strong>

            <span>{t("statistics.winRate")}</span>
            <strong>{percentFormatter.format(player.winRate)}</strong>

            <span>{t("statistics.sets")}</span>
            <strong>
              {player.setsWon}:{player.setsLost}
            </strong>

            <span>{t("statistics.setDifference")}</span>
            <strong>{formatDifference(player.setDifference)}</strong>

            <span>{t("statistics.points")}</span>
            <strong>
              {player.pointsWon}:{player.pointsLost}
            </strong>

            <span>{t("statistics.pointDifference")}</span>
            <strong>{formatDifference(player.pointDifference)}</strong>
          </div>
        </article>
      ))}
    </section>
  );
}
