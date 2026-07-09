import { useTranslation } from "react-i18next";

import { formatDifference } from "../statistics/helpers";

import type { PlayerStatistics } from "../statistics/PlayerStatistics";

type Props = {
  player: PlayerStatistics;
  onClose: () => void;
};

export function PlayerStatisticsDialog({ player, onClose }: Props) {
  const { t, i18n } = useTranslation();

  const percentFormatter = new Intl.NumberFormat(i18n.language, {
    style: "percent",
    maximumFractionDigits: 0,
  });

  const dateFormatter = new Intl.DateTimeFormat(i18n.language, {
    dateStyle: "medium",
  });

  return (
    <div className="dialogBackdrop" onClick={onClose}>
      <div className="dialog playerStatisticsDialog" onClick={(event) => event.stopPropagation()}>
        <h2>{player.name}</h2>

        <div className="dialogContent">
          <div className="statisticsSections">
            <section className="statisticsSection">
              <h3>{t("statistics.overview")}</h3>
              <div className="statisticsGrid">
                <span>{t("statistics.matches")}</span>
                <strong>{player.matches}</strong>

                <span>{t("statistics.wins")}</span>
                <strong>{player.wins}</strong>

                <span>{t("statistics.losses")}</span>
                <strong>{player.losses}</strong>

                <span>{t("statistics.winRate")}</span>
                <strong>{percentFormatter.format(player.winRate)}</strong>

                <span>{t("statistics.currentStreak")}</span>
                <strong>{formatStreak(player.currentStreak, t)}</strong>

                <span>{t("statistics.longestWinningStreak")}</span>
                <strong>{player.longestWinningStreak}</strong>
              </div>
            </section>
            <section className="statisticsSection">
              <h3>{t("statistics.setsAndPoints")}</h3>
              <div className="statisticsGrid">
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
            </section>
            <section className="statisticsSection">
              <h3>{t("statistics.opponents")}</h3>
              <div className="statisticsGrid">
                <span>{t("statistics.mostPlayedOpponent")}</span>
                <strong>{player.mostPlayedOpponent?.opponentName ?? "-"}</strong>

                <span>{t("statistics.bestOpponent")}</span>
                <strong>{player.bestOpponent?.opponentName ?? "-"}</strong>
              </div>
            </section>
          </div>

          <section className="headToHeadList">
            <h3>{t("statistics.headToHead")}</h3>

            {player.headToHead.length === 0 && (
              <p className="emptyText">{t("statistics.noHeadToHead")}</p>
            )}

            {player.headToHead.map((entry) => (
              <article className="headToHeadEntry" key={entry.opponentId}>
                <strong>{entry.opponentName}</strong>

                <span>
                  {entry.wins}:{entry.losses}
                </span>
              </article>
            ))}
          </section>

          <section className="recentMatchesList">
            <h3>{t("statistics.recentMatches")}</h3>

            {player.recentMatches.map((match) => {
              const isPlayer1 = match.player1Id === player.id;
              const won = match.winnerId === player.id;
              const opponentName = isPlayer1 ? match.player2Name : match.player1Name;
              const result = isPlayer1
                ? `${match.player1Sets}:${match.player2Sets}`
                : `${match.player2Sets}:${match.player1Sets}`;

              return (
                <article className="recentMatchEntry" key={match.id}>
                  <div>
                    <strong>
                      {won ? "✓" : "✗"} {opponentName}
                    </strong>
                    <time>{dateFormatter.format(new Date(match.finishedAt))}</time>
                  </div>

                  <span>{result}</span>
                </article>
              );
            })}
          </section>
        </div>

        <button className="closeButton" onClick={onClose}>
          {t("common.close")}
        </button>
      </div>
    </div>
  );
}

function formatStreak(
  streak: { type: "win" | "loss" | "none"; count: number },
  t: (key: string, options?: Record<string, unknown>) => string
): string {
  if (streak.type === "none") return "-";

  if (streak.type === "win") {
    return t("statistics.winStreak", { count: streak.count });
  }

  return t("statistics.lossStreak", { count: streak.count });
}
