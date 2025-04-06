import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useTranslation } from "react-i18next";

import { setLocalStorage } from "@/utils/localStorage";

function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const handleSwitch = (lang) => {
    i18n.changeLanguage(lang);
    setLocalStorage("lang", lang);
  };

  return (
    <div className="flex items-center gap-2 bg-secondary dark:bg-gray-800 p-2 rounded-md">
      <Label className="text-sm font-medium">🇺🇸</Label>
      <Switch
        id="language-switcher"
        checked={i18n.language === "es"}
        onCheckedChange={(checked) => {
          handleSwitch(checked ? "es" : "en");
        }}
      />
      <Label className="text-sm font-medium ">🇪🇸</Label>
    </div>
  );
}

export default LanguageSwitcher;
