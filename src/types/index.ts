
export interface Game {
  id: string;
  name: string;
  packageName: string;
  icon: string;
  isOptimized: boolean;
  customSettings?: GameSettings;
}

export interface GameSettings {
  dndMode: boolean;
  performanceMode: boolean;
  ramBoost: boolean;
  networkOptimize: boolean;
}

export interface AppShortcut {
  id: string;
  name: string;
  packageName: string;
  icon: string;
}

export interface SystemStats {
  ramUsage: number;
  cpuTemp: number;
  fps: number;
  batteryLevel: number;
}
