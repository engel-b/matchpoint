import { History, Info, Menu, RotateCcw, Settings, Undo2 } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import { IconButton } from "./IconButton";

type Props = {
  onUndo: () => void;
  onOpenHistory: () => void;
  onOpenSettings: () => void;
  onNewGame: () => void;
  onOpenAbout: () => void;
};

export function AppMenu({ onUndo, onOpenHistory, onOpenSettings, onNewGame, onOpenAbout }: Props) {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  function runAction(action: () => void) {
    setIsOpen(false);
    action();
  }

  return (
    <div className="appMenu">
      <IconButton label={t("menu.title")} onClick={() => setIsOpen((open) => !open)}>
        <Menu />
      </IconButton>

      {isOpen && (
        <div className="appMenuPanel">
          <MenuButton icon={<Undo2 />} label={t("common.undo")} onClick={() => runAction(onUndo)} />
          <MenuButton
            icon={<History />}
            label={t("history.title")}
            onClick={() => runAction(onOpenHistory)}
          />
          <MenuButton
            icon={<Settings />}
            label={t("settings.title")}
            onClick={() => runAction(onOpenSettings)}
          />
          <MenuButton
            icon={<RotateCcw />}
            label={t("menu.newGame")}
            onClick={() => runAction(onNewGame)}
          />
          <MenuButton
            icon={<Info />}
            label={t("about.title")}
            onClick={() => runAction(onOpenAbout)}
          />
        </div>
      )}
    </div>
  );
}

function MenuButton({
  icon,
  label,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}) {
  return (
    <button type="button" className="appMenuButton" onClick={onClick}>
      {icon}
      <span>{label}</span>
    </button>
  );
}
