import { useTranslation } from "react-i18next";

import { useMatchHistory } from "../hooks/useMatchHistory";

import type { MatchResult } from "../types/match";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export function MatchHistoryDialog({ isOpen, onClose }: Props) {
  const { t, i18n } = useTranslation();
  const { matches, isLoading } = useMatchHistory(isOpen);

  if (!isOpen) return null;

  return (
    <div className="dialogBackdrop" onClick={onClose}>
      <div className="dialog historyDialog" onClick={(event) => event.stopPropagation()}>
        <h2>{t("history.title")}</h2>

        {isLoading && <p>{t("history.loading")}</p>}

        {!isLoading && matches.length === 0 && <p className="emptyText">{t("history.empty")}</p>}

        <div className="matchList">
          {matches.map((match) => (
            <MatchCard key={match.id} match={match} locale={i18n.language} />
          ))}
        </div>

        <button className="closeButton" onClick={onClose}>
          {t("common.close")}
        </button>
      </div>
    </div>
  );
}

function MatchCard({ match, locale }: { match: MatchResult; locale: string }) {
  const player1Sets = match.sets.filter((set) => set.winner === "player1").length;

  const player2Sets = match.sets.filter((set) => set.winner === "player2").length;

  const player1Won = player1Sets > player2Sets;

  const finishedAt = new Intl.DateTimeFormat(locale, {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(match.finishedAt));

  return (
    <article className="matchCard">
      <div className="matchPlayers">
        <strong className={player1Won ? "matchWinner" : ""}>{match.player1Name}</strong>

        <span className="matchScore">
          {player1Sets} : {player2Sets}
        </span>

        <strong className={!player1Won ? "matchWinner" : ""}>{match.player2Name}</strong>
      </div>

      <div className="matchSets">
        {match.sets.map((set, index) => (
          <span key={index} className="matchSet">
            {set.player1}:{set.player2}
          </span>
        ))}
      </div>

      <time className="matchDate">{finishedAt}</time>
    </article>
  );
}
