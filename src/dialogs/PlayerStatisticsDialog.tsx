import { useTranslation } from "react-i18next";

import { formatDifference } from "../statistics/helpers";

import type { PlayerStatisticsDetails } from "../statistics/types";

type Props = {
  details: PlayerStatisticsDetails;
  onClose: () => void;
};

export function PlayerStatisticsDialog({ details, onClose }: Props) {
  const { t, i18n } = useTranslation();
  const { player, headToHead } = details;

  const percentFormatter = new Intl.NumberFormat(i18n.language, {
    style: "percent",
    maximumFractionDigits: 0,
  });

  return (
    <div className="dialogBackdrop" onClick={onClose}>
      <div className="dialog playerStatisticsDialog" onClick={(event) => event.stopPropagation()}>
        <h2>{player.playerName}</h2>

        <div className="dialogContent">
          <section className="statisticsCard">
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
          </section>

          <section className="headToHeadList">
            <h3>{t("statistics.headToHead")}</h3>

            {headToHead.length === 0 && <p className="emptyText">{t("statistics.noHeadToHead")}</p>}

            {headToHead.map((entry) => (
              <article className="headToHeadEntry" key={entry.opponentId}>
                <strong>{entry.opponentName}</strong>

                <span>
                  {entry.wins}:{entry.losses}
                </span>
              </article>
            ))}
          </section>
        </div>

        <button className="closeButton" onClick={onClose}>
          {t("common.close")}
        </button>
      </div>
    </div>
  );
}
