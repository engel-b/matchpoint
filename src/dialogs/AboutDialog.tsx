import { appVersion, commitSha } from "../version";

type Props = {
  onClose: () => void;
};

const docsUrl = "https://engel-b.github.io/matchpoint/";

export function AboutDialog({ onClose }: Props) {
  return (
    <div className="dialogBackdrop">
      <div className="dialog">
        <h2>Über MatchPoint</h2>

        <div className="dialogContent">
          <div className="versionInfo">
            <strong>MatchPoint</strong>
            <span>Version: {appVersion}</span>
            <span>Build: {commitSha}</span>
          </div>

          <div className="versionInfo">
            <a className="secondaryButton" href={docsUrl} target="_blank" rel="noreferrer">
              Dokumentation öffnen
            </a>
          </div>
        </div>

        <button type="button" className="closeButton" onClick={onClose}>
          Schließen
        </button>
      </div>
    </div>
  );
}
