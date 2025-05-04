
import React, { createContext, useState, useContext } from "react";
import { AppShortcut } from "@/types";
import { mockShortcuts } from "@/data/mockData";

interface FloatingToolboxContextType {
  isToolboxVisible: boolean;
  toolboxPosition: { x: number; y: number };
  shortcuts: AppShortcut[];
  showToolbox: () => void;
  hideToolbox: () => void;
  moveToolbox: (x: number, y: number) => void;
}

const FloatingToolboxContext = createContext<FloatingToolboxContextType | undefined>(undefined);

export const FloatingToolboxProvider = ({ children }: { children: React.ReactNode }) => {
  const [isToolboxVisible, setIsToolboxVisible] = useState(false);
  const [toolboxPosition, setToolboxPosition] = useState({ x: 20, y: 100 });
  const [shortcuts] = useState<AppShortcut[]>(mockShortcuts);

  const showToolbox = () => {
    setIsToolboxVisible(true);
  };

  const hideToolbox = () => {
    setIsToolboxVisible(false);
  };

  const moveToolbox = (x: number, y: number) => {
    setToolboxPosition({ x, y });
  };

  return (
    <FloatingToolboxContext.Provider
      value={{
        isToolboxVisible,
        toolboxPosition,
        shortcuts,
        showToolbox,
        hideToolbox,
        moveToolbox,
      }}
    >
      {children}
    </FloatingToolboxContext.Provider>
  );
};

export const useFloatingToolbox = () => {
  const context = useContext(FloatingToolboxContext);
  if (context === undefined) {
    throw new Error("useFloatingToolbox must be used within a FloatingToolboxProvider");
  }
  return context;
};
