import { useEffect, useState } from "react";

const AccessCountCard = () => {
  const [counts, setCounts] = useState({
    windows: 0,
    macos: 0,
    linux: 0,
    chrome: 0,
    firefox: 0,
    safari: 0
  });

  useEffect(() => {
    // Determinar sistema operacional e navegador
    const userAgent = navigator.userAgent;
    const platform = navigator.platform;
    const os = platform.indexOf("Win") !== -1 ? "windows" :
               platform.indexOf("Mac") !== -1 ? "macos" :
               platform.indexOf("Linux") !== -1 ? "linux" : "unknown_os";
    const browser = userAgent.indexOf("Chrome") !== -1 ? "chrome" :
                    userAgent.indexOf("Firefox") !== -1 ? "firefox" :
                    userAgent.indexOf("Safari") !== -1 ? "safari" : "unknown_browser";

    // Incrementar contadores no localStorage
    const incrementCount = (key: string) => {
      const currentCount = parseInt(localStorage.getItem(key) || "0", 10);
      localStorage.setItem(key, (currentCount + 1).toString());
    };

    incrementCount(os);
    incrementCount(browser);

    // Atualizar estado local com os valores atualizados
    setCounts({
      windows: parseInt(localStorage.getItem("windows") || "0", 10),
      macos: parseInt(localStorage.getItem("macos") || "0", 10),
      linux: parseInt(localStorage.getItem("linux") || "0", 10),
      chrome: parseInt(localStorage.getItem("chrome") || "0", 10),
      firefox: parseInt(localStorage.getItem("firefox") || "0", 10),
      safari: parseInt(localStorage.getItem("safari") || "0", 10)
    });
  }, []);

  return (
    <div className="max-w-sm mx-auto bg-white shadow-md rounded-lg overflow-hidden">
      <div className="px-6 py-4">
        <h2 className="text-xl font-bold mb-2">Access Count</h2>
        <p>Windows: {counts.windows}</p>
        <p>MacOS: {counts.macos}</p>
        <p>Linux: {counts.linux}</p>
        <p>Chrome: {counts.chrome}</p>
        <p>Firefox: {counts.firefox}</p>
        <p>Safari: {counts.safari}</p>
      </div>
    </div>
  );
};

export default AccessCountCard;
