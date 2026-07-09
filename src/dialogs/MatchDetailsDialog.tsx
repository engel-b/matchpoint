import { useTranslation } from "react-i18next";

import { MatchStatistics } from "../statistics/MatchStatistics";

import type { MatchResult } from "../types/match";

type Props = {
  match: MatchResult;
  matches: MatchResult[];
  onClose: () => void;
};

export function MatchDetailsDialog({ match, matches, onClose }: Props) {
  const { t, i18n } = useTranslation();
  const statistics = new MatchStatistics(matches);
  const headToHead = statistics
    .getHeadToHead(match.player1Id)
    .find((entry) => entry.opponentId === match.player2Id);

  const finishedAt = new Intl.DateTimeFormat(i18n.language, {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(match.finishedAt));

  return (
    <div className="dialogBackdrop" onClick={onClose}>
      <div className="dialog matchDetailsDialog" onClick={(event) => event.stopPropagation()}>
        <header className="dialogHeader">
          <h2>{t("history.matchDetails")}</h2>
        </header>

        <div className="dialogContent">
          <div className="matchDetailHeader">
            <strong>{match.player1Name}</strong>
            <span>
              {match.player1Sets}:{match.player2Sets}
            </span>
            <strong>{match.player2Name}</strong>
          </div>

          <time className="matchDate">{finishedAt}</time>

          {headToHead && (
            <section className="headToHeadCard">
              <h3>{t("statistics.headToHead")}</h3>

              <div className="statisticsGrid">
                <span>{t("statistics.wins")}</span>
                <strong>
                  {headToHead.wins}:{headToHead.losses}
                </strong>

                <span>{t("statistics.sets")}</span>
                <strong>
                  {headToHead.setsWon}:{headToHead.setsLost}
                </strong>

                <span>{t("statistics.points")}</span>
                <strong>
                  {headToHead.pointsWon}:{headToHead.pointsLost}
                </strong>
              </div>
            </section>
          )}

          <div className="matchDetailSets">
            {match.sets.map((set, index) => (
              <div className="matchDetailSet" key={index}>
                <span>{t("history.setNumber", { number: index + 1 })}</span>
                <strong>
                  {set.player1}:{set.player2}
                </strong>
              </div>
            ))}
          </div>
        </div>

        <footer className="dialogFooter">
          <button className="closeButton" onClick={onClose}>
            {t("common.close")}
          </button>
        </footer>
      </div>
    </div>
  );
}
