export function useTheme() {
  const setTheme = (theme: "dark" | "light" | "system") => {
    const root = window.document.documentElement;
    
    root.classList.remove("dark", "light");
    
    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";
      root.classList.add(systemTheme);
      return;
    }
    
    root.classList.add(theme);
  };
  
  // Get current theme
  const getTheme = (): "dark" | "light" | "system" => {
    const root = window.document.documentElement;
    if (root.classList.contains("dark")) return "dark";
    if (root.classList.contains("light")) return "light";
    return "system";
  };
  
  return { theme: getTheme(), setTheme };
}