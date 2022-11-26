import { useState, useEffect, useCallback } from "react";
import { useTheme } from "next-themes";
import SunIcon from "../shared/icons/SunIcon";
import MoonIcon from "./icons/MoonIcon";

const ThemeToggle = (): JSX.Element => {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const handleChange = useCallback(() => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  }, [resolvedTheme, setTheme]);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <></>;

  return (
    <div className="flex flex-row">
      <SunIcon />
      <input
        onChange={handleChange}
        type="checkbox"
        id="themeSwitch"
        checked={resolvedTheme === "dark"}
        className="relative w-[3.25rem] h-7 bg-gray-100 checked:bg-none checked:bg-gray-200 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 ring-1 ring-transparent focus:border-gray-600 focus:ring-gray-600 ring-offset-white focus:outline-none appearance-none dark:bg-gray-700 dark:checked:bg-zinc-900 dark:focus:ring-offset-gray-800 before:inline-block before:w-6 before:h-6 before:bg-white checked:before:bg-blue-200 before:translate-x-0 checked:before:translate-x-full before:shadow before:rounded-full before:transform before:ring-0 before:transition before:ease-in-out before:duration-200 dark:before:bg-gray-400 dark:checked:before:bg-gray-200"
      />
      <label htmlFor="themeSwitch" className="sr-only">
        Toggle dark mode
      </label>
      <MoonIcon />
    </div>
  );
};

export default ThemeToggle;
