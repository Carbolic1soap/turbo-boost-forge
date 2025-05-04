
import React, { createContext, useState, useContext, useEffect } from "react";
import { SystemStats } from "@/types";
import { mockSystemStats } from "@/data/mockData";

interface StatsContextType {
  stats: SystemStats;
  refreshStats: () => void;
}

const StatsContext = createContext<StatsContextType | undefined>(undefined);

export const StatsProvider = ({ children }: { children: React.ReactNode }) => {
  const [stats, setStats] = useState<SystemStats>(mockSystemStats);

  const refreshStats = () => {
    // In a real app, we'd get real-time system stats
    // For demo, we'll just randomize the mock data a bit
    setStats({
      ramUsage: Math.min(100, Math.max(40, mockSystemStats.ramUsage + (Math.random() * 20) - 10)),
      cpuTemp: Math.min(70, Math.max(30, mockSystemStats.cpuTemp + (Math.random() * 8) - 4)),
      fps: Math.min(60, Math.max(30, Math.floor(mockSystemStats.fps + (Math.random() * 20) - 5))),
      batteryLevel: mockSystemStats.batteryLevel > 0 ? mockSystemStats.batteryLevel - (Math.random() * 2) : 0,
    });
  };

  // Update stats every 3 seconds
  useEffect(() => {
    const intervalId = setInterval(() => {
      refreshStats();
    }, 3000);
    
    return () => clearInterval(intervalId);
  }, []);

  return (
    <StatsContext.Provider value={{ stats, refreshStats }}>
      {children}
    </StatsContext.Provider>
  );
};

export const useStats = () => {
  const context = useContext(StatsContext);
  if (context === undefined) {
    throw new Error("useStats must be used within a StatsProvider");
  }
  return context;
};
