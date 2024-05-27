import { useEffect, useState } from "react";
import axios from "axios";

const SystemInfoCard = () => {
  const [systemInfo, setSystemInfo] = useState({
    os: "",
    osVersion: "",
    browser: "",
    ip: "",
    deviceType: ""
  });

  useEffect(() => {
    // Determinar sistema operacional, navegador e tipo de dispositivo
    const userAgent = navigator.userAgent;
    const platform = navigator.platform;
    
    let os = "Unknown OS";
    let osVersion = "Unknown Version";
    let deviceType = /Mobi|Android/i.test(userAgent) ? "Mobile" : "Desktop";
    
    if (platform.indexOf("Win") !== -1) {
      os = "Windows";
      if (userAgent.indexOf("Windows NT 10.0") !== -1) osVersion = "10";
      else if (userAgent.indexOf("Windows NT 11.0") !== -1) osVersion = "11";
    } else if (platform.indexOf("Mac") !== -1) {
      os = "MacOS";
      osVersion = /Mac OS X (\d+[._]\d+)/.exec(userAgent)?.[1].replace("_", ".") || "Unknown Version";
    } else if (platform.indexOf("Linux") !== -1) {
      if (userAgent.indexOf("Android") !== -1) {
        os = "Android";
        osVersion = /Android (\d+[.]\d+)/.exec(userAgent)?.[1] || "Unknown Version";
      } else {
        os = "Linux";
        if (userAgent.indexOf("Ubuntu") !== -1) osVersion = "Ubuntu";
        else osVersion = "Unknown Distro";
      }
    }
    
    const browser =
      userAgent.indexOf("Chrome") !== -1
        ? "Chrome"
        : userAgent.indexOf("Firefox") !== -1
        ? "Firefox"
        : userAgent.indexOf("Safari") !== -1
        ? "Safari"
        : userAgent.indexOf("Edge") !== -1
        ? "Edge"
        : "Unknown Browser";

    // Obter IP público
    const fetchIP = async () => {
      try {
        const response = await axios.get("https://api.ipify.org?format=json");
        setSystemInfo({
          os,
          osVersion,
          browser,
          ip: response.data.ip,
          deviceType
        });
      } catch (error) {
        console.error("Failed to fetch IP", error);
      }
    };

    fetchIP();
  }, []);

  return (
    <div className="max-w-sm mx-auto bg-white shadow-md rounded-lg overflow-hidden">
      <div className="px-6 py-4">
        <h2 className="text-xl font-bold mb-2">System Information</h2>
        <p>Operating System: {systemInfo.os} {systemInfo.osVersion}</p>
        <p>Browser: {systemInfo.browser}</p>
        <p>IP Address: {systemInfo.ip}</p>
        <p>Device Type: {systemInfo.deviceType}</p>
      </div>
    </div>
  );
};

export default SystemInfoCard;
