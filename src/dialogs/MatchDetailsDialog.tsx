import { useTranslation } from "react-i18next";

import type { MatchResult } from "../types/match";

type Props = {
  match: MatchResult;
  onClose: () => void;
};

export function MatchDetailsDialog({ match, onClose }: Props) {
  const { t, i18n } = useTranslation();

  const finishedAt = new Intl.DateTimeFormat(i18n.language, {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(match.finishedAt));

  return (
    <div className="dialogBackdrop" onClick={onClose}>
      <div className="dialog matchDetailsDialog" onClick={(event) => event.stopPropagation()}>
        <h2>{t("history.matchDetails")}</h2>

        <div className="dialogContent">
          <div className="matchDetailHeader">
            <strong>{match.player1Name}</strong>
            <span>
              {match.player1Sets}:{match.player2Sets}
            </span>
            <strong>{match.player2Name}</strong>
          </div>

          <time className="matchDate">{finishedAt}</time>

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

        <button className="closeButton" onClick={onClose}>
          {t("common.close")}
        </button>
      </div>
    </div>
  );
}
