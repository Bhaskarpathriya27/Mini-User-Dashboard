/* eslint-disable react-refresh/only-export-components */
import React from "react";

const ThemeContext = React.createContext();

const THEME_KEY = "app-theme";

export function ThemeProvider({ children }) {
  const [theme, setTheme] = React.useState(() => {
    return localStorage.getItem(THEME_KEY) || "light";
  });

  React.useEffect(() => {
    const root = document.documentElement;
    root.setAttribute("data-theme", theme);

    localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((t) => (t === "dark" ? "light" : "dark"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return React.useContext(ThemeContext);
}
