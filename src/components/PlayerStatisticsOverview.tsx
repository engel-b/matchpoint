import { useTranslation } from "react-i18next";

import type { PlayerStatistics } from "../statistics/calculatePlayerStatistics";

type Props = {
  statistics: PlayerStatistics[];
};

export function PlayerStatisticsOverview({ statistics }: Props) {
  const { t, i18n } = useTranslation();

  const percentFormatter = new Intl.NumberFormat(i18n.language, {
    style: "percent",
    maximumFractionDigits: 0,
  });

  return (
    <section className="statisticsOverview" aria-label={t("statistics.title")}>
      {statistics.map((playerStatistics) => (
        <article className="statisticsCard" key={playerStatistics.playerId}>
          <strong>{playerStatistics.playerName}</strong>

          <div className="statisticsGrid">
            <span>{t("statistics.matches")}</span>
            <strong>{playerStatistics.matches}</strong>
            <span>{t("statistics.wins")}</span>
            <strong>{playerStatistics.wins}</strong>
            <span>{t("statistics.losses")}</span>
            <strong>{playerStatistics.losses}</strong>
            <span>{t("statistics.winRate")}</span>
            <strong>{percentFormatter.format(playerStatistics.winRate)}</strong>
            <span>{t("statistics.sets")}</span>
            <strong>
              {playerStatistics.setsWon}:{playerStatistics.setsLost}
            </strong>
            <span>{t("statistics.setDifference")}</span>
            <strong>
              {formatDifference(playerStatistics.setsWon - playerStatistics.setsLost)}
            </strong>
            <span>{t("statistics.points")}</span>
            <strong>
              {playerStatistics.pointsWon}:{playerStatistics.pointsLost}
            </strong>
            <span>{t("statistics.pointDifference")}</span>
            <strong>
              {formatDifference(playerStatistics.pointsWon - playerStatistics.pointsLost)}
            </strong>
          </div>
        </article>
      ))}
    </section>
  );
}

function formatDifference(value: number): string {
  if (value > 0) return `+${value}`;

  return value.toString();
}
