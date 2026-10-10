"use client";

import { Switch } from "@heroui/react";
import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

const ThemeSwitch = () => {
  const { theme, setTheme } = useTheme();

  // The stored theme is only known in the browser, so the server renders Gamma
  const isMounted = useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
  const isKarwei = isMounted && theme === "karwei";

  return (
    <Switch
      aria-label="Karwei-thema"
      isSelected={isKarwei}
      onChange={(isSelected) => setTheme(isSelected ? "karwei" : "gamma")}
    >
      <Switch.Content className="gap-2 text-sm font-bold text-accent-foreground">
        <span aria-hidden>Gamma</span>
        {/* Both options are brands, so the track looks the same in either state.
            transition-all also animates the corners when the theme changes. */}
        <Switch.Control className="bg-accent-foreground/30 transition-all duration-300 ease-out-fluid motion-reduce:transition-none">
          <Switch.Thumb className="transition-all duration-300 ease-out-fluid motion-reduce:transition-none" />
        </Switch.Control>
        <span aria-hidden>Karwei</span>
      </Switch.Content>
    </Switch>
  );
};

export default ThemeSwitch;
