import { Button } from "@/components/ui/button";
import { useTheme } from "@/app/providers/theme-context";
import { ThemeMode } from "@/shared/theme/theme.types";

const modes = Object.values(ThemeMode);

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="inline-flex items-center gap-1">
      {modes.map((mode) => (
        <Button
          key={mode}
          variant={theme === mode ? "default" : "ghost"}
          size="sm"
          onClick={() => setTheme(mode)}
          className="capitalize"
        >
          {mode}
        </Button>
      ))}
    </div>
  );
}
