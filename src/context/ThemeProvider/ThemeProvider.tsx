import React, { ReactNode, useCallback, useEffect, useState } from "react";

export type Theme = "light" | "dark";

export type ThemeContextType = {
  theme: Theme;
  toggleTheme: () => void;
};

function getTheme() {
  const localTheme = localStorage.getItem("theme") as Theme;
  if (localTheme) return localTheme;
  return "light";
}

export const ThemeContext = React.createContext<ThemeContextType>({
  theme: getTheme(),
  toggleTheme: () => {},
});

type ThemeProviderProps = {
  children: ReactNode | ReactNode[];
};

export default function ThemeProvider(props: ThemeProviderProps) {
  const [themeState, setThemeState] = useState<ThemeContextType>({
    theme: getTheme(),
    toggleTheme: () => {},
  });

  function toggleTheme() {
    const { theme } = themeState;
    if (theme === "light") {
      document.body.style.backgroundColor = "#0D0D0D";
      setThemeState({ ...themeState, theme: "dark" });
      localStorage.setItem("theme", "dark");
    } else {
      document.body.style.backgroundColor = "#fafafa";
      setThemeState({ ...themeState, theme: "light" });
      localStorage.setItem("theme", "light");
    }
  }

  useEffect(() => {
    if (themeState.theme === "light") {
      document.body.style.backgroundColor = "#fafafa";
    } else {
      document.body.style.backgroundColor = "#0D0D0D";
    }
  }, []);

  useEffect(() => {
    setThemeState({ ...themeState, toggleTheme });
  }, [themeState.theme]);

  return (
    <ThemeContext.Provider value={themeState}>
      {props.children}
    </ThemeContext.Provider>
  );
}
