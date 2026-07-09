import { useTranslation } from "react-i18next";

import { appVersion, commitSha } from "../version";

type Props = {
  onClose: () => void;
};

const docsUrl = "https://engel-b.github.io/matchpoint/";

export function AboutDialog({ onClose }: Props) {
  const { t } = useTranslation();
  return (
    <div className="dialogBackdrop">
      <div className="dialog">
        <header className="dialogHeader">
          <h2>{t("about.title")}</h2>
        </header>

        <div className="dialogContent">
          <div className="versionInfo">
            <strong>MatchPoint</strong>
            <span>Version: {appVersion}</span>
            <span>Build: {commitSha}</span>
          </div>

          <div className="versionInfo">
            <a className="secondaryButton" href={docsUrl} target="_blank" rel="noreferrer">
              {t("about.documentationLink")}
            </a>
          </div>
        </div>

        <footer className="dialogFooter">
          <button type="button" className="closeButton" onClick={onClose}>
            {t("common.close")}
          </button>
        </footer>
      </div>
    </div>
  );
}
